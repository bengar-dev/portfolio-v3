import { AiFillAlert } from "react-icons/ai";

interface AlertMessageProps {
  text: string;
}

export const AlertMessage = (props: AlertMessageProps) => {
  const { text } = props;
  return (
    <p className="p-5 text-xs font-medium text-rose-400 flex items-center">
      <AiFillAlert className="text-xl mr-2 text-red-500 animate-bounce" />
      {text}
    </p>
  );
};
