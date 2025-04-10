import { useState, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { InputChangeEvent } from '../lib/interfaces'
import { PollContext } from '../context/Poll.context'
import { LoaderContext } from '../context/Loader.context'

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

    const onTriggerModal = () => {
        setModal(!modal)
        setError(null)
        setFieldErrors({
            title: false,
            option1: false,
            option2: false,
            option3: false,
        })
    }

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
            {modal && (
                <div className="absolute top-1/2 left-1/2 z-10 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-white p-12 shadow-lg">
                    <h3 className="text-center">Create Poll</h3>
                    <form
                        className="mt-4 flex flex-col items-center justify-center"
                        onSubmit={onCreatePoll}
                    >
                        {error && (
                            <p className="mb-4 text-sm text-red-500">{error}</p>
                        )}
                        <input
                            type="text"
                            name="title"
                            placeholder="Question"
                            className={`mb-4 w-full rounded border-2 p-2 ${
                                fieldErrors.title
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                            }`}
                            onChange={onInputChange}
                        />
                        <input
                            type="text"
                            name="option1"
                            placeholder="Option 1"
                            className={`mb-4 w-full rounded border-2 p-2 ${
                                fieldErrors.option1
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                            }`}
                            onChange={onInputChange}
                        />
                        <input
                            type="text"
                            name="option2"
                            placeholder="Option 2"
                            className={`mb-4 w-full rounded border-2 p-2 ${
                                fieldErrors.option2
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                            }`}
                            onChange={onInputChange}
                        />
                        <input
                            type="text"
                            name="option3"
                            placeholder="Option 3"
                            className={`mb-4 w-full rounded border-2 p-2 ${
                                fieldErrors.option3
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                            }`}
                            onChange={onInputChange}
                        />
                        <button
                            type="submit"
                            className="rounded bg-blue-500 p-2 text-white"
                        >
                            Create
                        </button>
                    </form>
                    <button
                        onClick={onTriggerModal}
                        className="absolute top-4 right-8 inline-flex rounded bg-gray-300 px-4 py-2 font-bold text-gray-800 hover:cursor-pointer hover:bg-gray-200"
                    >
                        X
                    </button>
                </div>
            )}

            {!loading && (
                <button
                    onClick={onTriggerModal}
                    className="absolute top-24 right-24 inline-flex rounded bg-gray-300 px-4 py-2 font-bold text-gray-800 hover:cursor-pointer hover:bg-gray-200"
                >
                    Create Poll
                </button>
            )}
        </>
    )
}
