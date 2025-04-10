import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ModalProps, InputChangeEvent } from '../lib/interfaces';

export function Modal({ dataArray, setDataArray }: ModalProps) {
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    option1: '',
    option2: '',
    option3: '',
  });

  const onTriggerModal = () => {
    setModal(!modal);
  };

  const onInputChange = (event: InputChangeEvent) => {
    const stateProp = event.target.name;
    const stateValue = event.target.value;

    setFormData({ ...formData, [stateProp]: stateValue });
  };

  useEffect(() => {}, [formData]);

  const onCreatePoll = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const options = [
      {
        name: formData.option1,
        value: 0,
      },
      {
        name: formData.option2,
        value: 0,
      },
      {
        name: formData.option3,
        value: 0,
      },
    ];

    const newDataArray = [
      ...dataArray,
      {
        title: formData.title,
        options: options,
        id: uuidv4(),
        status: 0,
        color: '#FFFFFF', 
      },
    ];

    setDataArray(newDataArray);

    localStorage.setItem('dataArray', JSON.stringify(newDataArray));
    setModal(false);
  };

  return (
    <>
      {modal && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-12 rounded-md shadow-lg w-full max-w-md z-10">
          <h3 className="text-center">Create Poll</h3>
          <form className="flex flex-col items-center justify-center mt-4" onSubmit={onCreatePoll}>
            <input
              type="text"
              name="title"
              placeholder="Question"
              className="mb-4 p-2 rounded border-2 w-full"
              onChange={onInputChange}
            />
            <input
              type="text"
              name="option1"
              placeholder="Option 1"
              className="mb-4 p-2 rounded border-2 w-full"
              onChange={onInputChange}
            />
            <input
              type="text"
              name="option2"
              placeholder="Option 2"
              className="mb-4 p-2 rounded border-2 w-full"
              onChange={onInputChange}
            />
            <input
              type="text"
              name="option3"
              placeholder="Option 3"
              className="mb-4 p-2 rounded border-2 w-full"
              onChange={onInputChange}
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
      )}

      <button
        onClick={onTriggerModal}
        className="absolute top-24 right-24 bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex hover:bg-gray-200 hover:cursor-pointer"
      >
        Create Poll
      </button>
    </>
  );
}
