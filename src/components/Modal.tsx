import { useState, useContext, useRef, useEffect, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { InputChangeEvent } from '../lib/interfaces'
import { PollContext } from '../context/Poll.context'
import { LoaderContext } from '../context/Loader.context'
import { InputField } from './InputField'
import { trapFocus } from '../lib/trapFocus'

export function Modal() {
    const pollContext = useContext(PollContext)
    if (!pollContext) {
        throw new Error('PollContext must be used within a PollContextProvider')
    }
    const loaderContext = useContext(LoaderContext)
    if (!loaderContext) {
        throw new Error(
            'LoaderContext must be used within a LoaderContextProvider'
        )
    }
    const { polls, setPolls } = pollContext
    const { loading } = loaderContext

    const [modal, setModal] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        option1: '',
        option2: '',
        option3: '',
    })
    const [error, setError] = useState<string | null>(null)
    const [fieldErrors, setFieldErrors] = useState({
        title: false,
        option1: false,
        option2: false,
        option3: false,
    })

    const modalRef = useRef<HTMLDivElement>(null)

    const onTriggerModal = useCallback(() => {
        setModal((prevModal) => !prevModal)
        setError(null)
        setFieldErrors({
            title: false,
            option1: false,
            option2: false,
            option3: false,
        })
    }, [])

    useEffect(() => {
        if (modal) {
            const cleanup = trapFocus(
                modalRef as React.RefObject<HTMLDivElement>,
                onTriggerModal
            )
            return cleanup
        }
    }, [modal, onTriggerModal])

    const onInputChange = (event: InputChangeEvent) => {
        const stateProp = event.target.name
        const stateValue = event.target.value

        setFormData({ ...formData, [stateProp]: stateValue })
        setFieldErrors({ ...fieldErrors, [stateProp]: false })

        // Check if all fields are filled and clear the error message
        const updatedFormData = { ...formData, [stateProp]: stateValue }
        const { title, option1, option2, option3 } = updatedFormData

        if (title && option1 && option2 && option3) {
            setError(null) // Clear the error message if all fields are filled
        }
        setFieldErrors({ ...fieldErrors, [stateProp]: false }) // Clear field error on input
    }

    const validateForm = () => {
        const newFieldErrors: {
            title: boolean
            option1: boolean
            option2: boolean
            option3: boolean
        } = {
            title: false,
            option1: false,
            option2: false,
            option3: false,
        }
        const errorMessages: string[] = []
        const scriptTagRegex = /<script.*?>.*?<\/script>/i

        // Validation rules for each field
        const validationRules = {
            title: [
                {
                    test: (value: string) => value.trim() !== '',
                    message: 'The question is required.',
                },
                {
                    test: (value: string) => value.length >= 3,
                    message: 'The question must have at least 3 characters.',
                },
                {
                    test: (value: string) => !scriptTagRegex.test(value),
                    message: 'Script tags are not allowed in the question.',
                },
            ],
            option1: [
                {
                    test: (value: string) => value.trim() !== '',
                    message: 'Option 1 is required.',
                },
                {
                    test: (value: string) => !scriptTagRegex.test(value),
                    message: 'Script tags are not allowed in Option 1.',
                },
            ],
            option2: [
                {
                    test: (value: string) => value.trim() !== '',
                    message: 'Option 2 is required.',
                },
                {
                    test: (value: string) => !scriptTagRegex.test(value),
                    message: 'Script tags are not allowed in Option 2.',
                },
            ],
            option3: [
                {
                    test: (value: string) => value.trim() !== '',
                    message: 'Option 3 is required.',
                },
                {
                    test: (value: string) => !scriptTagRegex.test(value),
                    message: 'Script tags are not allowed in Option 3.',
                },
            ],
        }

        // Validate each field
        Object.entries(validationRules).forEach(([field, rules]) => {
            const value = formData[field as keyof typeof formData]
            rules.forEach((rule) => {
                if (!rule.test(value)) {
                    newFieldErrors[field as keyof typeof newFieldErrors] = true
                    if (!errorMessages.includes(rule.message)) {
                        errorMessages.push(rule.message)
                    }
                }
            })
        })

        setFieldErrors(newFieldErrors)

        if (errorMessages.length > 0) {
            setError(errorMessages.join(' '))
            return false
        }

        setError(null)
        return true
    }

    const onCreatePoll = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (!validateForm()) {
            return
        }

        const options = [
            {
                name: formData.option1,
                value: 0,
            },
            {
                name: formData.option2,
                value: 0,
            },
            {
                name: formData.option3,
                value: 0,
            },
        ]

        const newDataArray = [
            ...polls,
            {
                title: formData.title,
                options: options,
                id: uuidv4(),
                status: 0,
                color: '#FFFFFF',
            },
        ]

        setPolls(newDataArray)

        localStorage.setItem('dataArray', JSON.stringify(newDataArray))
        setModal(false)
    }

    return (
        <>
            {!loading && (
                <button
                    onClick={onTriggerModal}
                    className="hocus:animate-pulse hocus:brightness-110 hocus:cursor-pointer my-4 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 px-4 py-1 font-bold text-white md:my-8 md:px-6 md:py-3"
                >
                    Create Poll
                </button>
            )}
            {modal && (
                <div
                    ref={modalRef}
                    tabIndex={-1}
                    className="absolute top-1/2 left-1/2 z-10 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-gray-300 p-12 shadow-lg"
                >
                    <button
                        onClick={onTriggerModal}
                        title="Close Modal"
                        aria-label="Close Modal"
                        className="hocus:bg-gray-500 group hocus:cursor-pointer absolute top-4 right-4 rounded bg-gray-400 px-4 py-2 font-bold"
                    >
                        <span
                            aria-hidden="true"
                            className="text-gray-800 group-hover:text-white group-focus:text-white"
                        >
                            X
                        </span>
                    </button>
                    <h1 className="text-center text-2xl text-black italic">
                        Create Poll
                    </h1>
                    <form
                        className="mt-4 flex flex-col items-center justify-center"
                        onSubmit={onCreatePoll}
                    >
                        {error && (
                            <p className="mb-4 text-sm text-red-500">{error}</p>
                        )}

                        <InputField
                            id="question"
                            name="title"
                            placeholder=" "
                            value={formData.title}
                            onChange={onInputChange}
                            error={fieldErrors.title}
                            label="Question"
                        />

                        <InputField
                            id="option1"
                            name="option1"
                            placeholder=" "
                            value={formData.option1}
                            onChange={onInputChange}
                            error={fieldErrors.option1}
                            label="Option 1"
                        />

                        <InputField
                            id="option2"
                            name="option2"
                            placeholder=" "
                            value={formData.option2}
                            onChange={onInputChange}
                            error={fieldErrors.option2}
                            label="Option 2"
                        />

                        <InputField
                            id="option3"
                            name="option3"
                            placeholder=" "
                            value={formData.option3}
                            onChange={onInputChange}
                            error={fieldErrors.option3}
                            label="Option 3"
                        />
                        <button
                            type="submit"
                            className="hocus:animate-pulse hocus:brightness-110 hocus:cursor-pointer my-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-6 py-3 font-bold text-white"
                        >
                            Create
                        </button>
                    </form>
                </div>
            )}
        </>
    )
}
