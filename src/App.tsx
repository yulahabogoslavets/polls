import { useState, useEffect } from 'react';
import './App.css';
import { Poll } from './components/Poll';
import { Modal } from './components/Modal';
import { PollData } from './lib/interfaces';

function App() {
  const [dataArray, setDataArray] = useState<Array<PollData>>([]);

  useEffect(() => {
    const storedData = localStorage.getItem('dataArray')
      ? JSON.parse(localStorage.getItem('dataArray') as string)
      : null;
    if (!storedData) {
      return;
    }
    setDataArray(
      storedData.map((item: Partial<PollData>) => ({
        ...item,
        color: item.color || '#FFFFFF',
      }))
    );
    return () => {};
  }, []);

  useEffect(() => {}, [dataArray]);

  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
        <h1 className="text-3xl font-bold mb-4">My Poll</h1>

        <Modal dataArray={dataArray} setDataArray={setDataArray} />

        <div className="flex flex-wrap gap-4 items-center justify-center mt-8">
          {dataArray.length
            ? dataArray.map((item, index) => {
                return (
                  <Poll key={index} dataObj={item} dataArray={dataArray} setDataArray={setDataArray}/>
                );
              })
            : 'No Polls Available, create one!'}
        </div>
      </main>
    </>
  );
}

export default App;
