import { createContext, useState, useEffect, useContext } from 'react'
import {
    PollData,
    PollContextType,
    PollContextProviderProps,
} from '../lib/interfaces'
import { LoaderContext } from './Loader.context'

export const PollContext = createContext<PollContextType | undefined>(undefined)

export const PollContextProvider = ({ children }: PollContextProviderProps) => {
    const [polls, setPolls] = useState<PollData[]>([])
    const loaderContext = useContext(LoaderContext)

    if (!loaderContext) {
        throw new Error('LoaderContext is not provided')
    }

    const { setLoading } = loaderContext

    useEffect(() => {
        setLoading(true)
        const storedData = localStorage.getItem('dataArray')
            ? JSON.parse(localStorage.getItem('dataArray') as string)
            : null
        if (!storedData) {
            setTimeout(() => {
                setLoading(false)
            }, 2000)
            return
        }

        setTimeout(() => {
            setPolls(storedData)
            setLoading(false)
        }, 2000)

        return () => {}
    }, [])

    return (
        <PollContext.Provider value={{ polls, setPolls }}>
            {children}
        </PollContext.Provider>
    )
}
