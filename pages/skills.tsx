import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { axios } from "../config/const";

import { SiMongodb, SiNestjs, SiPrisma, SiTailwindcss } from "react-icons/si";
import { FaReact } from "react-icons/fa";

interface SkillsProps {
  description: string;
  id: string;
  name: string;
  urlLogo: string;
  display: boolean;
  projectId?: string;
}

const Skills = () => {
  const [skills, setSkills] = useState<SkillsProps[]>([]);

  useEffect(() => {
    awaitGetSkills();
  }, []);

  const awaitGetSkills = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/skills`);
    setSkills(response.data);
  };

  const handleIconsForSkills = (value: string) => {
    switch (value) {
      case "prisma":
        return <SiPrisma className="text-emerald-400" />;
      case "react":
        return <FaReact className="text-sky-400" />;
      case "nestjs":
        return <SiNestjs className="text-red-400" />;
      case "tailwind":
        return <SiTailwindcss className="text-cyan-400" />;
      case "mongo":
        return <SiMongodb className="text-green-400" />;
    }
  };

  const dataSkills = [
    "JavaScript",
    "React",
    "Next.js",
    "TypeScript",
    "tailwind.css",
    "GraphQL",
    "Node js",
    "NestJS",
    "Express",
    "fastify",
    "Sequelize",
    "Prisma",
    "SQL",
    "MongoDB",
    "Git",
  ];

  return (
    <div className="min-h-screen bg-slate-900 flex">
      <NavBar />
      <div className="text-white p-4 w-full flex flex-col items-center">
        <h1 className="font-bold text-4xl text-indigo-400 uppercase">
          Mes compétences
        </h1>
        <span className="text-xs p-1">
          Quelles sont les technologies que j&apos;utilise le plus ?
        </span>
        <div className="mt-10 flex flex-col w-full justify-center items-center space-y-4 lg:flex-row lg:space-x-4 lg:justify-around">
          <div className="flex flex-col w-full justify-center items-center space-y-4">
            {skills.length > 0 &&
              skills.map((el) => (
                <>
                  {el.display && (
                    <div
                      key={el.id}
                      className="transition-all w-1/2 p-4 bg-slate-800 hover:bg-slate-700 flex justify-around space-x-2 items-center rounded-lg"
                    >
                      <span className="text-5xl">
                        {handleIconsForSkills(el.urlLogo)}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-center font-bold">{el.name}</span>
                        <p className="hidden md:flex p-2 text-xs first-letter:font-bold">
                          {el.description}
                        </p>
                      </div>
                    </div>
                  )}
                </>
              ))}
          </div>
        </div>
        <div className="mt-10 w-full md:w-2/3">
          <h2 className="text-center font-medium text-indigo-500">
            Mes compétences en vracs
          </h2>
          <div className="p-4 w-full flex flex-wrap justify-center space-x-2 text-sm text-slate-900 font-medium">
            {skills
              .sort((a, b) => 0.5 - Math.random())
              .map((el) => (
                <span
                  key={el.id}
                  className="p-1 bg-slate-300 rounded-lg mt-2 hover:bg-indigo-400"
                >
                  {el.name}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
