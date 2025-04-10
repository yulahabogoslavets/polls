import { useContext } from 'react'
import './App.css'
import { Poll } from './components/Poll'
import { Modal } from './components/Modal'
import { PollContext } from './context/Poll.context'
import { Loader } from './components/Loader'
import { LoaderContext } from './context/Loader.context'

function App() {
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

    const { polls } = pollContext
    const { loading } = loaderContext

    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
                <h1 className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-3xl font-extrabold text-transparent md:text-5xl">
                    My Poll
                </h1>

                <Modal />

                <div className="mt-2 flex flex-wrap items-center justify-center gap-4 md:mt-4">
                    {polls.length ? (
                        polls.map((item, index) => {
                            return <Poll key={index} dataObj={item} />
                        })
                    ) : loading ? (
                        <Loader />
                    ) : (
                        'No Polls Available, create one!'
                    )}
                </div>
            </main>
        </>
    )
}

export default App
