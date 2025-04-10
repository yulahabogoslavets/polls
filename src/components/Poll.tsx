import { Bar, BarChart, XAxis } from 'recharts';
import { useState, useMemo } from 'react';
import { PollProps } from '../lib/interfaces';
import { getRandomColor } from '../lib/colorGen.tool';

export function Poll({ dataObj, dataArray, setDataArray }: PollProps) {
  const [pollStatus, setPollStatus] = useState<0 | 1>(dataObj.status as 0 | 1);
  const { options, id, title } = dataObj;

  const onPollChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    options.filter((item) => {
      if (item.name !== (event.target as HTMLButtonElement).innerText) {
        return item;
      }
      return { ...item, value: item.value++ };
    });

    const newLocalStorageArray = dataArray.filter((item) => {
      if (item.id !== id) {
        return item;
      }
      return (item.status = 1);
    });

    localStorage.setItem('dataArray', JSON.stringify(newLocalStorageArray));
    setPollStatus(1);
  };

  const randomColor = useMemo(() => {
    return getRandomColor();
  }, []);

  const onPollDelete = () => {
    const newDataArray = dataArray.filter((item) => {
      if (id !== item.id) {
        return item;
      }
    });
    setDataArray(newDataArray);
    localStorage.setItem('dataArray', JSON.stringify(newDataArray));
  };

  return (
    <>
      <div className="bg-gray-400 p-8 border-gray-800 rounded-lg width-full min-h-[400px] h-full flex flex-col items-center justify-center gap-4">
        <h2 className="mb-4">{title}</h2>
        {
          {
            1: (
              <BarChart
                data={options}
                margin={{ bottom: 60 }}
                width={300}
                height={300}
              >
                <Bar dataKey="value" fill={randomColor} />
                <XAxis dataKey={'name'} interval={0} angle={-10} dy={32} />
              </BarChart>
            ),
            0: (
              <div className="flex items-center justify-center gap-4 flex-wrap">
                {options.map((item, index) => {
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
        <button
          onClick={onPollDelete}
          className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex hover:bg-gray-200 hover:cursor-pointer"
        >
          Delete
        </button>
      </div>
    </>
  );
}
