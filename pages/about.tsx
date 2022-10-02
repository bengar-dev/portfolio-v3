import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { format } from "date-fns";

import NavBar from "../components/NavBar";
import { axios } from "../config/const";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { FaLaptopCode, FaSchool, FaUserGraduate } from "react-icons/fa";
import { AiFillSafetyCertificate, AiOutlineTrophy } from "react-icons/ai";

interface historicProps {
  id: string;
  date: string;
  description: string;
  category: string;
}

const About: NextPage = () => {
  const [about, setAbout] = useState({
    content: "",
    urlPic: "",
  });
  const [historic, setHistoric] = useState<historicProps[]>([]);

  useEffect(() => {
    awaitGetAboutInfo();
  }, []);

  const awaitGetAboutInfo = async () => {
    const about = await axios.get(`${process.env.NEXT_PUBLIC_API}/about`);
    const historic = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/about/historic`
    );
    setHistoric(historic.data);
    setAbout(about.data);
  };

  const handleStyleColorCategory = (category: string) => {
    switch (category) {
      case "work":
        return "w-22 text-center bg-cyan-400 text-cyan-800 font-medium p-2";
      case "school":
        return "w-22 text-center bg-orange-400 text-orange-800 font-medium p-2";
      case "graduate":
        return "w-22 text-center bg-rose-400 text-rose-800 font-medium p-2";
      case "certif":
        return "w-22 text-center bg-purple-400 text-purple-800 font-medium p-2";
      case "trophee":
        return "w-22 text-center bg-yellow-400 text-yellow-800 font-medium p-2";
      case "computer":
        return "w-22 text-center bg-emerald-400 text-emerald-800 font-medium p-2";
    }
  };

  const handleIconForCategory = (category: string) => {
    switch (category) {
      case "work":
        return <BsFillBriefcaseFill />;
      case "school":
        return <FaSchool />;
      case "graduate":
        return <FaUserGraduate />;
      case "certif":
        return <AiFillSafetyCertificate />;
      case "trophee":
        return <AiOutlineTrophy />;
      case "computer":
        return <FaLaptopCode />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex">
      <NavBar />
      <div className="text-white p-4 w-full flex flex-col items-center">
        <h1 className="font-bold text-4xl text-indigo-400">À PROPOS</h1>
        <span className="text-xs p-1">
          Qui suis-je ? Mon parcours en quelques mots & dates.
        </span>
        <div className="mt-10 flex flex-col w-full items-center space-y-4 lg:flex-row lg:space-x-4 lg:justify-around">
          <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-x-4 lg:w-6/12">
            <div className="w-32 h-32 rounded-full border-2 border-indigo-500 lg:border-0">
              <Image
                src={about.urlPic}
                alt="avatar"
                className="transition-all rounded-full grayscale hover:grayscale-0 lg:w-32 lg:h-32"
                width={350}
                height={350}
                layout="responsive"
                objectFit="cover"
              />
            </div>
            <div className="w-full bg-slate-700 p-2 rounded text-sm">
              <p className="font-mono first-letter:text-4xl first-letter:font-bold first-letter:float-left first-letter:mr-4 first-letter:text-indigo-400 text-justify">
                {about.content}
              </p>
            </div>
          </div>
          <div className="flex flex-col space-y-4 lg:w-5/12">
            <h2 className="text-lg text-center text-indigo-400 font-medium">
              Mon histoire en quelques dates
            </h2>
            <table className="w-full">
              <tbody className="flex flex-col space-y-2">
                {historic.length > 0 &&
                  historic.map((el) => (
                    <tr
                      key={el.id}
                      className="transition-all text-sm flex items-center hover:bg-slate-800"
                    >
                      <td className={handleStyleColorCategory(el.category)}>
                        {format(new Date(el.date), "MM/yyyy")}
                      </td>
                      <td className="w-1/12 flex justify-center">
                        {handleIconForCategory(el.category)}
                      </td>
                      <td className="w-8/12 text-center">{el.description}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
