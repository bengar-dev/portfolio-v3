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

  const handleStyleColorCategory = (category: string) => {
    switch (category) {
      case "work":
        return "rounded-full w-28 flex justify-center items-center bg-cyan-400 text-cyan-800 font-medium p-1";
      case "school":
        return "rounded-full w-28 flex justify-center items-center bg-orange-400 text-orange-800 font-medium p-1";
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
        return <BsFillBriefcaseFill className="text-cyan-300" />;
      case "school":
        return <FaSchool className="text-orange-300" />;
      case "graduate":
        return <FaUserGraduate className="text-rose-300" />;
      case "certif":
        return <AiFillSafetyCertificate className="text-violet-300" />;
      case "trophee":
        return <AiOutlineTrophy className="text-yellow-300" />;
      case "computer":
        return <FaLaptopCode className="text-emerald-300" />;
    }
  };

  return (
    <div className="w-full flex space-x-1 p-1 hover:bg-[#060614] rounded-full">
      <div className={handleStyleColorCategory(category)}>
        {format(new Date(date), "MM - yyyy")}
      </div>
      <div className="pl-1 flex space-x-2 items-center w-full ">
        <span className="text-xl">{handleIconForCategory(category)}</span>
        <span className="">{text}</span>
      </div>
    </div>
  );
};
