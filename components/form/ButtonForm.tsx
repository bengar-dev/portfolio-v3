import React from "react";

interface ButtonFormProps {
  value: string | React.ReactNode;
  type: "button" | "reset" | "submit";
  style: "classic" | "submit" | "edit" | "delete";
  func?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export const ButtonForm = (props: ButtonFormProps) => {
  const { value, type, style, func, disabled = false } = props;
  return (
    <button
      type={type}
      onClick={(e) => {
        if (func && !disabled) func(e);
      }}
      className={
        !disabled
          ? handleStyleButton(props)
          : "transition-all duration-200 p-2 text-sm font-medium bg-gray-200 text-gray-500 rounded-md cursor-default"
      }
    >
      {value}
    </button>
  );
};

function handleStyleButton({ style }: ButtonFormProps): string {
  switch (style) {
    case "classic":
      return "transition-all duration-200 p-2 text-sm font-medium bg-cyan-500 hover:bg-cyan-500/80 rounded-md";
    case "submit":
      return "transition-all duration-200 p-2 text-sm font-medium bg-emerald-400 hover:bg-emerald-500/80 rounded-md";
    case "edit":
      return "transition-all duration-200 p-2 text-sm font-medium bg-orange-400 hover:bg-orange-600/80 rounded-md";
    case "delete":
      return "transition-all duration-200 p-2 text-sm font-medium bg-red-500 hover:bg-red-500/80 rounded-md";
  }
}
