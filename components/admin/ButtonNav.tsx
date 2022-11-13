import { useRouter } from "next/router";

interface ButtonNavProps {
  icon: React.ReactNode;
  value: string;
  target: string;
}

export const ButtonNav = (props: ButtonNavProps) => {
  const { icon, value, target } = props;
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(target)}
      className="transition-all duration-200 font-bold text-lg hover:bg-violet-500 hover:text-violet-50 flex items-center space-x-2 h-12 ml-auto mr-auto w-full p-2 pr-6 pl-6 rounded-md"
    >
      {icon}
      <span className="text-base">{value}</span>
    </button>
  );
};
