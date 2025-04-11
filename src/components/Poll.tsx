import { Bar, BarChart, XAxis } from 'recharts'
import { useState, useMemo, useContext } from 'react'
import { PollProps } from '../lib/interfaces'
import { getRandomColor } from '../lib/colorGen.tool'
import { PollContext } from '../context/Poll.context'

export function Poll({ dataObj }: PollProps) {
    const pollContext = useContext(PollContext)
    if (!pollContext) {
        throw new Error('PollContext must be used within a PollContextProvider')
    }
    const { polls, setPolls } = pollContext

    const [pollStatus, setPollStatus] = useState<0 | 1>(dataObj.status as 0 | 1)
    const { options, id, title } = dataObj

    const onPollChange = (event: React.MouseEvent<HTMLButtonElement>) => {
        options.filter((item) => {
            if (item.name !== (event.target as HTMLButtonElement).innerText) {
                return item
            }
            return { ...item, value: item.value++ }
        })

        const newLocalStorageArray = polls.filter((item) => {
            if (item.id !== id) {
                return item
            }
            return (item.status = 1)
        })

        localStorage.setItem('dataArray', JSON.stringify(newLocalStorageArray))
        setPollStatus(1)
    }

    const randomColor = useMemo(() => {
        return getRandomColor()
    }, [])

    const onPollDelete = () => {
        const newDataArray = polls.filter((item) => {
            if (id !== item.id) {
                return item
            }
        })
        setPolls(newDataArray)
        localStorage.setItem('dataArray', JSON.stringify(newDataArray))
    }

    return (
        <>
            <div className="width-full flex h-full min-h-[400px] flex-col items-center justify-center gap-4 overflow-y-auto rounded-lg bg-gray-950 p-4 md:p-8">
                <h2 className="mb-4 text-2xl text-white">{title}</h2>
                {
                    {
                        1: (
                            <BarChart
                                data={options}
                                margin={{ bottom: 60 }}
                                width={300}
                                height={300}
                            >
                                <Bar dataKey="value" fill={randomColor} />
                                <XAxis
                                    dataKey={'name'}
                                    interval={0}
                                    angle={-10}
                                    dy={32}
                                    tick={{ fill: '#ffffff' }}
                                />
                            </BarChart>
                        ),
                        0: (
                            <div className="flex flex-wrap items-center justify-center gap-4">
                                {options.map((item, index) => {
                                    return (
                                        <button
                                            key={index}
                                            onClick={onPollChange}
                                            className="inline-flex items-center justify-center rounded-md bg-gray-800 px-5 py-2 font-semibold text-white shadow-sm transition hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                                        >
                                            {item.name}
                                        </button>
                                    )
                                })}
                            </div>
                        ),
                    }[pollStatus]
                }
                <button
                    onClick={onPollDelete}
                    className="inline-flex items-center justify-center rounded-md bg-red-600 px-5 py-2 font-bold text-white shadow-sm transition hover:bg-red-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
                >
                    Delete
                </button>
            </div>
        </>
    )
}
