import { createContext, useState } from 'react'
import { LoadingContextType, PollContextProviderProps } from '../lib/interfaces'

export const LoaderContext = createContext<LoadingContextType | undefined>(
    undefined
)

export const LoaderContextProvider = ({
    children,
}: PollContextProviderProps) => {
    const [loading, setLoading] = useState(false)

    return (
        <LoaderContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoaderContext.Provider>
    )
}
