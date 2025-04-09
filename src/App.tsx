import './App.css';
import { BarChart, Bar, ResponsiveContainer, XAxis } from 'recharts';
import { useState } from 'react';

const dataArray = [
  {
    name: 'Page A',
    value: 1,
  },
  {
    name: 'Page B',
    value: 1,
  },
  {
    name: 'Page C',
    value: 1,
  },
];

function App() {
  const [data, setData] = useState(dataArray);

  const onPollChange = (event) => {
    const objName = event?.target.innerText;
    const newData = data.filter((item) => {
      if (item.name !== objName) {
        return item;
      }
      return { ...item, value: item.value++ };
    });

    setData(newData);
  };
  return (
    <>
      <h1 className="text-red-500">hello</h1>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data} margin={{ bottom: 120 }}>
          <Bar dataKey="value" fill="#8884d8" />
          <XAxis dataKey={'name'} interval={0} angle={-10} dy={32} />
        </BarChart>
      </ResponsiveContainer>

      {data.map((item, index) => {
        return (
          <button key={index} onClick={onPollChange}>
            {item.name}
          </button>
        );
      })}
    </>
  );
}

export default App;
