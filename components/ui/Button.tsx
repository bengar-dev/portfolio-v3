interface ButtonProps {
  value: string;
  func: (event: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: React.ReactNode;
}

export const Button = (props: ButtonProps) => {
  const { value, func, icon } = props;
  return (
    <button
      className="font-quick flex space-x-2 items-center font-bold uppercase transition-all text-xs text-[#060614] bg-gray-100 border border-gray-100 hover:border-indigo-600 hover:bg-indigo-700 hover:text-white p-2 rounded"
      onClick={(event) => func(event)}
    >
      {icon && icon}
      <span>{value}</span>
    </button>
  );
};
