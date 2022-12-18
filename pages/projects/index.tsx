import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import NavBar from "../../components/NavBar";
import { ProjectCard } from "../../components/ui/ProjectCard";
import { axios } from "../../config/const";
import { useGetSkills } from "../../hooks/useGetSkills";

export interface ProjectProps {
  id: string;
  description: string;
  name: string;
  preview: string;
  skillsId: string[];
  urlImage: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    awaitGetProjects();
  }, []);

  const awaitGetProjects = async () => {
    setLoading(true);
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/projects`);
    setProjects(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#000007] flex font-quick">
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Benoit Garcia, Développeur fullstack javascript sur Montpellier"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.benoitgarcia.dev/" />
        <meta property="og:title" content="Benoit Garcia - Réalisations" />
        <meta
          property="og:description"
          content="Benoit Garcia, Développeur fullstack javascript sur Montpellier"
        />
        <meta property="og:image" content="" />

        <title>Benoit Garcia - My projects</title>
      </Head>
      <NavBar />
      {loading ? (
        <div className="w-full flex items-center justify-center text-white">
          <AiOutlineLoading className="animate-spin text-6xl text-rose-500" />
        </div>
      ) : (
        <div className="text-white p-4 w-full flex flex-col items-center">
          <h1 className="font-bold text-4xl text-indigo-400 uppercase">
            My projects
          </h1>
          <span className="p-1">Here few projects.</span>
          <div className="mt-10 flex flex-col w-full justify-center items-center space-y-4 lg:flex-row lg:space-x-4 lg:justify-around">
            <div className="flex flex-col items-center w-full md:w-2/3 lg:w-1/2 xl:w-1/3 space-y-4">
              {projects.length > 0 &&
                projects.map((el, index) => (
                  <ProjectCard
                    key={index}
                    name={el.name}
                    description={el.description}
                    id={el.id}
                    preview={el.preview}
                    skillsId={el.skillsId}
                    urlImage={el.urlImage}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
