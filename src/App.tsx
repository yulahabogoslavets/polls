import './App.css';
import { Poll } from './components/Poll';

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
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
        <h1 className="text-3xl font-bold">My Poll</h1>

        <div className="flex flex-wrap gap-4 items-center justify-center my-8">
          <Poll dataArray={dataArray} color="#05def3" />
        </div>
      </main>
    </>
  );
}

export default App;
