import Link from "next/link";
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { axios } from "../../config/const";

interface ProjectProps {
  id: string;
  description: string;
  name: string;
  preview: string;
  skillsId: string[];
  urlImage: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<ProjectProps[]>([]);

  useEffect(() => {
    awaitGetProjects();
  }, []);

  const awaitGetProjects = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/projects`);
    setProjects(data);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex">
      <NavBar />
      <div className="text-white p-4 w-full flex flex-col items-center">
        <h1 className="font-bold text-4xl text-indigo-400 uppercase">
          Mes réalisations
        </h1>
        <span className="text-xs p-1">
          Quelques projets pour apercevoir mes connaissances.
        </span>
        <div className="mt-10 flex flex-col w-full justify-center items-center space-y-4 lg:flex-row lg:space-x-4 lg:justify-around">
          <div className="flex flex-col items-center w-full space-y-4">
            {projects.length > 0 &&
              projects.map((el) => (
                <div key={el.id} className="w-full md:w-3/4 lg:w-2/3 xl:w-1/3">
                  <Link href={`/projects/${el.id}`}>
                    <div className="cursor-pointer border border-indigo-400 hover:border-cyan-400 p-4 w-full rounded-lg flex flex-col hover:bg-slate-800 space-y-2">
                      <h2 className="font-bold text-indigo-400">{el.name}</h2>
                      <p className="text-sm italic">{el.preview}</p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
