import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { axios } from "../../config/const";
import Image from "next/image";

import { RiArrowGoBackFill } from "react-icons/ri";
import Link from "next/link";
import { FaGithub, FaLaptop } from "react-icons/fa";
import Head from "next/head";
import { AiOutlineLoading } from "react-icons/ai";

interface ProjectProps {
  id: string;
  description: string;
  name: string;
  preview: string;
  skillsId: string[];
  urlImage: string;
  github: string;
  live: string;
}

interface SkillProps {
  id: string;
  description: string;
  name: string;
  urlLogo: string;
  display: boolean;
}

const ProjectDetails = () => {
  const router = useRouter();

  const [project, setProject] = useState<ProjectProps>();
  const [skills, setSkills] = useState<SkillProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (router.query.slug) awaitGetProjects();
  }, [router.query.slug]);

  const awaitGetProjects = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/projects/${router.query.slug}`
    );
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/skills`);
    setProject(data);

    if (response.data) {
      const newArray: any[] = [];
      data.skillsId.forEach((el: any) => {
        const find = response.data.find((p: SkillProps) => p.id === el);
        if (find) newArray.push(find);
      });
      setSkills(newArray);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex">
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
        <meta property="og:title" content="Benoit Garcia - Compétences" />
        <meta
          property="og:description"
          content="Benoit Garcia, Développeur fullstack javascript sur Montpellier"
        />
        <meta property="og:image" content="" />

        <title>Benoit Garcia - {project?.name}</title>
      </Head>
      <NavBar />
      {loading ? (
        <div className="w-full flex items-center justify-center text-white">
          <AiOutlineLoading className="animate-spin text-6xl text-rose-500" />
        </div>
      ) : (
        <div className="text-white p-4 w-full flex flex-col items-center">
          <h1 className="font-bold text-4xl text-indigo-400 uppercase">
            Mes réalisations
          </h1>
          <span className="text-xs p-1">
            Quelques projets pour apercevoir mes connaissances.
          </span>
          <div className="mt-10 flex flex-col w-full justify-center items-center space-y-4 lg:flex-row lg:space-x-4 lg:justify-around">
            <div className="flex flex-col w-full space-y-4 md:w-2/3 lg:w-1/2">
              <h2 className="text-center font-bold text-indigo-400 text-2xl">
                {project?.name}
              </h2>
              <div className="flex space-x-6 justify-center">
                {project?.github && (
                  <Link href={project.github}>
                    <a
                      target="_blank"
                      className="bg-stone-500 hover:bg-stone-600 p-2 text-sm w-max rounded-lg flex items-center space-x-2"
                    >
                      <FaGithub />
                      <span>GitHub</span>
                    </a>
                  </Link>
                )}
                {project?.live && (
                  <Link href={project.live}>
                    <a
                      target="_blank"
                      className="bg-cyan-500 hover:bg-cyan-600 p-2 text-sm w-max rounded-lg flex items-center space-x-2"
                    >
                      <FaLaptop />
                      <span>Live</span>
                    </a>
                  </Link>
                )}
              </div>
              <p className="first-letter:font-bold first-letter:text-indigo-400 italic">
                {project?.description}
              </p>
              <span className="font-medium text-sm text-indigo-400">
                Technologies :
              </span>
              <div className="w-full flex flex-wrap space-x-2">
                {skills.length > 0 &&
                  skills.map((el: SkillProps) => (
                    <span
                      key={el.id}
                      className="mt-1 bg-indigo-400 hover:bg-indigo-500 p-2 text-sm rounded-full"
                    >
                      {el.name}
                    </span>
                  ))}
              </div>
              <div className="mt-6 w-[300px] h-auto ml-auto mr-auto">
                {project && project.urlImage !== "" && (
                  <Image
                    src={project?.urlImage}
                    alt="Image aperçu du projet"
                    width={300}
                    height={300}
                    layout="responsive"
                    objectFit="cover"
                    quality={100}
                  />
                )}
              </div>
              <Link href="/projects">
                <a className="transition-all absolute bottom-5 right-5 bg-gray-50 p-2 border border-slate-800 text-slate-800 rounded-full hover:bg-red-500 hover:text-white">
                  <RiArrowGoBackFill />
                </a>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
