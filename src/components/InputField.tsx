import React from 'react'

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    error?: boolean
    inputRef?: React.RefObject<HTMLInputElement>
}

export function InputField({
    label,
    error,
    inputRef,
    ...props
}: InputFieldProps) {
    return (
        <>
            <div className="relative my-2 w-full">
                <input
                    ref={inputRef}
                    {...props}
                    className={`peer w-full rounded border-2 p-2 pt-4 text-black placeholder-transparent shadow-sm focus:border-blue-500 focus:outline-none ${
                        error ? 'border-red-500' : 'border-gray-100'
                    }`}
                    type="text"
                />
                <label
                    htmlFor={props.id}
                    className="absolute top-0 left-2 text-sm text-gray-600 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500"
                >
                    {label}
                </label>
            </div>
        </>
    )
}
