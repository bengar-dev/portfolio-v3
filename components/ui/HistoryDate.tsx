import { format } from "date-fns";
import { AiFillSafetyCertificate, AiOutlineTrophy } from "react-icons/ai";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { FaLaptopCode, FaSchool, FaUserGraduate } from "react-icons/fa";

interface HistoryDateProps {
  date: string;
  category: string;
  text: string;
}

export const HistoryDate = (props: HistoryDateProps) => {
  const { date, category, text } = props;

  /**
   * ! This function is not use anymore, but we'll keep it in case backup.
   * @param category
   * @returns string
   */
  const handleStyleColorCategory = (category: string) => {
    switch (category) {
      case "work":
        return "rounded-full w-28 flex justify-center items-center bg-cyan-400 text-cyan-800 font-medium p-1";
      case "school":
        return "rounded-full w-28 flex justify-center items-center bg-orange-600 text-orange-50 font-medium p-1";
      case "graduate":
        return "rounded-full w-28 flex justify-center items-center bg-rose-400 text-rose-800 font-medium p-1";
      case "certif":
        return "rounded-full w-28 flex justify-center items-center bg-purple-400 text-purple-800 font-medium p-1";
      case "trophee":
        return "rounded-full w-28 flex justify-center items-center bg-yellow-400 text-yellow-800 font-medium p-1";
      case "computer":
        return "rounded-full w-28 flex justify-center items-center bg-emerald-400 text-emerald-800 font-medium p-1";
    }
  };

  const handleIconForCategory = (category: string) => {
    switch (category) {
      case "work":
        return "💼";
      case "school":
        return "🏫";
      case "graduate":
        return "🎓";
      case "certif":
        return "✅";
      case "trophee":
        return "🏆";
      case "computer":
        return "💻";
    }
  };

  return (
    <div className="w-full flex space-x-1 p-1 hover:bg-[#060614] rounded-full">
      <div className="rounded-full w-28 flex justify-center items-center bg-slate-900 text-slate-50 font-medium p-1">
        {format(new Date(date), "MM - yyyy")}
      </div>
      <div className="pl-1 flex space-x-2 items-center w-full ">
        <span className="text-lg">{handleIconForCategory(category)}</span>
        <span className="">{text}</span>
      </div>
    </div>
  );
};
