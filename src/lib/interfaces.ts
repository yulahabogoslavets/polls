// Represents a single poll option
export interface PollOption {
  name: string;
  value: number;
}

// Represents the structure of a poll
export interface PollData {
  title: string;
  color: string;
  options: PollOption[];
  id: string;
  status: number;
}

// Props for the Poll component
export interface PollProps {
  dataObj: PollData;
  dataArray: PollData[];
}

// Props for the Modal component
export interface ModalProps {
  dataArray: PollData[];
  setDataArray: React.Dispatch<React.SetStateAction<PollData[]>>;
}

export interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & { name: keyof FormDataType; value: string };
}
