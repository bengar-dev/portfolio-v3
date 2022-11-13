import { useEffect, useState } from "react";

export interface AlertNotifProps {
  toggle: boolean;
  style: "danger" | "success" | "warning" | "info";
  title: string;
  message: string;
  icon?: React.ReactNode;
}

export const AlertNotif = (props: AlertNotifProps) => {
  const { style, toggle, title, message, icon } = props;

  return (
    <div
      role="alert"
      className={`absolute z-30 w-full md:w-1/2 lg:w-1/3 top-10 rounded border-l-4 p-4 ${handleStyleAlert(
        props
      )}`}
    >
      <div className="flex items-center gap-2 ">
        {icon && icon}
        <strong className="block font-medium">{title}</strong>
      </div>
      <p className="mt-2 text-sm">{message}</p>
    </div>
  );
};

function handleStyleAlert({ style }: AlertNotifProps): string {
  switch (style) {
    case "danger":
      return "text-red-700 bg-red-50 border-red-500";
    case "success":
      return "text-emerald-700 bg-emerald-50 border-emerald-500";
    default:
      return "";
  }
}
