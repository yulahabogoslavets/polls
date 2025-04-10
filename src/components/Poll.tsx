import { Bar, BarChart, XAxis } from 'recharts';
import { useState } from 'react';

interface Option {
  name: string;
  value: number;
}

interface DataItem {
  title: string;
  color: string;
  options: Option[];
}
interface PollProps {
  dataObj: DataItem[];
  dataArray: { id: string; status: number }[];
}

export function Poll({ dataObj, dataArray }: PollProps) {
  const [data, setData] = useState(dataObj);
  const [pollStatus, setPollStatus] = useState(0);

  const onPollChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    const objName = (event.target as HTMLButtonElement).innerText;
    const newData = data.options.filter((item) => {
      if (item.name !== objName) {
        return item;
      }
      return { ...item, value: item.value++ };
    });

    const newLocalStorageArray = dataArray.filter((item) => {
      if (item.id !== dataObj.id) {
        return item;
      }
      item.status = 1;
      return item;
    });

    localStorage.setItem('dataArray', JSON.stringify(newLocalStorageArray));

    setData({ ...data, options: newData });
    setPollStatus(1);
  };
  return (
    <>
      <div className="bg-gray-400 p-8 border-gray-800 rounded-lg width-full h-[400px] flex flex-col items-center justify-center gap-4">
        <h2 className="mb-4">{data.title}</h2>
        {
          {
            1: (
              <BarChart
                data={data.options}
                margin={{ bottom: 60 }}
                width={300}
                height={300}
              >
                <Bar dataKey="value" fill={data.color} />
                <XAxis dataKey={'name'} interval={0} angle={-10} dy={32} />
              </BarChart>
            ),
            0: (
              <div className="flex items-center justify-center gap-4 flex-wrap">
                {data.options.map((item, index) => {
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
          }[(pollStatus, dataObj.status)]
        }
      </div>
    </>
  );
}
