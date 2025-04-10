import { createContext, useState, useEffect } from 'react';
import {
  PollData,
  PollContextType,
  PollContextProviderProps,
} from '../lib/interfaces';

export const PollContext = createContext<PollContextType | undefined>(
  undefined
);

export const PollContextProvider = ({ children }: PollContextProviderProps) => {
  const [polls, setPolls] = useState<PollData[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem('dataArray')
      ? JSON.parse(localStorage.getItem('dataArray') as string)
      : null;
    if (!storedData) {
      return;
    }
    setPolls(
      storedData.map((item: Partial<PollData>) => ({
        ...item,
        color: item.color || '#FFFFFF',
      }))
    );
    return () => {};
  }, []);

  return (
    <PollContext.Provider value={{ polls, setPolls }}>
      {children}
    </PollContext.Provider>
  );
};
