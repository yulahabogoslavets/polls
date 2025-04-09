import { useState } from 'react';

export function Modal() {
  const [modal, setModal] = useState(false);

  const onTriggerModal = () => {
    setModal(!modal);
  };
  return (
    <>
      {
        {
          true: (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-12 rounded-md shadow-lg w-full max-w-md">
              <h3 className="text-center">Create Poll</h3>
              <form className="flex flex-col items-center justify-center mt-4">
                <input
                  type="text"
                  placeholder="Question"
                  className="mb-4 p-2 rounded border-2 w-full"
                />
                <input
                  type="text"
                  placeholder="Option 1"
                  className="mb-4 p-2 rounded border-2 w-full"
                />
                <input
                  type="text"
                  placeholder="Option 2"
                  className="mb-4 p-2 rounded border-2 w-full"
                />
                <input
                  type="text"
                  placeholder="Option 3"
                  className="mb-4 p-2 rounded border-2 w-full"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Create
                </button>
              </form>
              <button
                onClick={onTriggerModal}
                className="absolute top-4 right-8 bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex hover:bg-gray-200 hover:cursor-pointer"
              >
                X
              </button>
            </div>
          ),
        }[modal]
      }

      <button className="absolute top-24 right-24 bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex hover:bg-gray-200 hover:cursor-pointer">
        Create Poll
      </button>
    </>
  );
}
