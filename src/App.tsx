import './App.css';
import { BarChart, Bar, ResponsiveContainer, XAxis } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
];

function App() {
  return (
    <>
      <h1 className="text-red-500">hello</h1>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data}>
          <Bar dataKey="uv" fill="#8884d8" />
          <XAxis dataKey={'name'} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

export default App;
