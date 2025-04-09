import { useState, useEffect } from 'react';
import './App.css';
import { Poll } from './components/Poll';

function App() {
  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('dataArray'));
    setDataArray(storedData);
  }, []);

  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
        <h1 className="text-3xl font-bold">My Poll</h1>

        <div className="flex flex-wrap gap-4 items-center justify-center my-8">
          {dataArray.length
            ? dataArray.map((item, index) => {
                return <Poll key={index} dataArray={item} />;
              })
            : 'No Polls Available, create one!'}
        </div>
      </main>
    </>
  );
}

export default App;
