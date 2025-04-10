import { createContext, useState, ReactNode } from 'react'
import { LoadingContextType } from '../lib/interfaces'

export const LoaderContext = createContext<LoadingContextType | undefined>(
    undefined
)

interface PollContextProviderProps {
    children: ReactNode
}

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
