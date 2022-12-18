import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { axios } from "../config/const";

import Head from "next/head";
import { AiOutlineLoading } from "react-icons/ai";
import { SkillCard } from "../components/ui/SkillCard";

export interface SkillsProps {
  description: string;
  id: string;
  name: string;
  urlLogo: string;
  display: boolean;
  projectId?: string;
}

const Skills = () => {
  const [skills, setSkills] = useState<SkillsProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    awaitGetSkills();
  }, []);

  const awaitGetSkills = async () => {
    setLoading(true);
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/skills`);
    setSkills(response.data);
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
        <meta property="og:title" content="Benoit Garcia - Compétences" />
        <meta
          property="og:description"
          content="Benoit Garcia, Développeur fullstack javascript sur Montpellier"
        />
        <meta property="og:image" content="" />

        <title>Benoit Garcia - Mes compétences</title>
      </Head>
      <NavBar />
      {loading ? (
        <div className="w-full flex items-center justify-center text-white">
          <AiOutlineLoading className="animate-spin text-6xl text-rose-500" />
        </div>
      ) : (
        <div className="text-white p-4 w-full flex flex-col items-center">
          <h1 className="font-bold text-4xl text-indigo-400 uppercase">
            My skills
          </h1>
          <span className=" p-1">
            Which technologies i&apos;m using the most ?
          </span>
          <div className="mt-10 flex flex-col w-full justify-center items-center space-y-4">
            <div className="w-full md:w-1/2 bg-[#060614] p-2 rounded">
              <div id="test" className="font-quick text-justify">
                I love to work with <span className="highlight">React</span> and{" "}
                <span className="highlight">TypeScript</span> when i&apos;m
                doing front-end developpment. But i&apos;m working also on{" "}
                <span className="highlight">Vue.js</span> during my work-study
                contract with <span className="highlight">Kaliop</span>.<br />
                On back-end side, i like to create{" "}
                <span className="highlight">GraphQL</span> api with{" "}
                <span className="highlight">express.js</span> and{" "}
                <span className="highlight">TypeScript</span>. I also run all my
                app on <span className="highlight">Docker</span>.
              </div>
            </div>
            <div className="flex flex-row flex-wrap w-full md:w-1/2 justify-center items-center space-y-4">
              {skills.length > 0 &&
                skills.map((el, index) => (
                  <>
                    {el.display && (
                      <SkillCard
                        key={el.id}
                        description={el.description}
                        display={el.display}
                        id={el.id}
                        name={el.name}
                        urlLogo={el.urlLogo}
                        projectId={el.projectId}
                      />
                    )}
                  </>
                ))}
            </div>
          </div>
          <div className="mt-10 w-full md:w-2/3">
            <h2 className="text-center font-medium text-indigo-500">
              All my random skills
            </h2>
            <div className="p-4 w-full flex flex-wrap justify-center space-x-2 text-sm text-slate-900 font-medium">
              {skills
                .sort((a, b) => 0.5 - Math.random())
                .map((el, index) => (
                  <span
                    key={el.id}
                    className="p-1 bg-slate-300 rounded-lg mt-2 hover:bg-indigo-400"
                    data-aos="zoom-in"
                    data-aos-delay={`${index}50`}
                    data-aos-duration="500"
                  >
                    {el.name}
                  </span>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Skills;
