interface InputFieldProps {
    id: string
    name: string
    placeholder: string
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    error?: boolean
    label: string
}

export function InputField({
    id,
    name,
    placeholder,
    value,
    onChange,
    error = false,
    label,
}: InputFieldProps) {
    return (
        <>
            <div className="relative my-2 w-full">
                <input
                    id={id}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={`peer w-full rounded border-2 p-2 pt-4 text-black placeholder-transparent shadow-sm focus:border-blue-500 focus:outline-none ${
                        error ? 'border-red-500' : 'border-gray-100'
                    }`}
                    type="text"
                />
                <label
                    htmlFor={id}
                    className="absolute top-0 left-2 text-sm text-gray-600 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-500"
                >
                    {label}
                </label>
            </div>
        </>
    )
}
