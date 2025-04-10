import { useContext } from 'react';
import './App.css';
import { Poll } from './components/Poll';
import { Modal } from './components/Modal';
import { PollContext } from './context/Poll.context';

function App() {
  const pollContext = useContext(PollContext);

  if (!pollContext) {
    throw new Error('PollContext must be used within a PollContextProvider');
  }

  const { polls } = pollContext;

  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
        <h1 className="text-3xl font-bold mb-4">My Poll</h1>

        <Modal />

        <div className="flex flex-wrap gap-4 items-center justify-center mt-8">
          {polls.length
            ? polls.map((item, index) => {
                return (
                  <Poll
                    key={index}
                    dataObj={item}
                  />
                );
              })
            : 'No Polls Available, create one!'}
        </div>
      </main>
    </>
  );
}

export default App;
