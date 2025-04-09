import { Bar, BarChart, XAxis } from 'recharts';
import { useState } from 'react';

interface PollProps {
  dataArray: Array<{ name: string; value: number }>;
  color: string;
}

export function Poll({ dataArray, color }: PollProps) {
  const [data, setData] = useState(dataArray);
  const [pollStatus, setPollStatus] = useState(0);

  const onPollChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const objName = (event.target as HTMLButtonElement).innerText;
    const newData = data.filter((item) => {
      if (item.name !== objName) {
        return item;
      }
      return { ...item, value: item.value++ };
    });

    setData(newData);
    setPollStatus(1);
  };
  return (
    <>
      <div className="bg-gray-400 p-8 border-gray-800 rounded-lg width-full h-[400px] flex flex-col items-center justify-center gap-4">
        <h2 className="mb-4">What Movie do you want to see?</h2>
        {
          {
            1: (
              <BarChart
                data={data}
                margin={{ bottom: 60 }}
                width={300}
                height={300}
              >
                <Bar dataKey="value" fill={color} />
                <XAxis dataKey={'name'} interval={0} angle={-10} dy={32} />
              </BarChart>
            ),
            0: (
              <div className="flex items-center justify-center gap-4 flex-wrap">
                {data.map((item, index) => {
                  return (
                    <button
                      key={index}
                      onClick={onPollChange}
                      className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex hover:bg-gray-200 hover:cursor-pointer"
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>
            ),
          }[pollStatus]
        }
      </div>
    </>
  );
}
