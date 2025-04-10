import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { PollContextProvider } from './context/Poll.context'
import { LoaderContextProvider } from './context/Loader.context'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <LoaderContextProvider>
            <PollContextProvider>
                <App />
            </PollContextProvider>
        </LoaderContextProvider>
    </StrictMode>
)
