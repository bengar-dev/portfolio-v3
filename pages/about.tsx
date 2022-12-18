import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";

import NavBar from "../components/NavBar";
import { axios } from "../config/const";
import Head from "next/head";
import { HistoryDate } from "../components/ui/HistoryDate";
import { AiOutlineLoading } from "react-icons/ai";

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
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (about.content === "") awaitGetAboutInfo();
    else {
      const targetContentElement = document.querySelector("#about-content-id");
      if (targetContentElement) targetContentElement.innerHTML = about.content;
    }
  }, [about]);

  const awaitGetAboutInfo = async () => {
    setLoading(true);
    const about = await axios.get(`${process.env.NEXT_PUBLIC_API}/about`);
    const historic = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/about/historic`
    );
    setHistoric(historic.data);
    setAbout(about.data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#000007] flex overflow-hidden font-quick">
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
        <meta property="og:title" content="Benoit Garcia - A-propos de moi" />
        <meta
          property="og:description"
          content="Benoit Garcia, Développeur fullstack javascript sur Montpellier"
        />
        <meta property="og:image" content="" />

        <title>Benoit Garcia - A-propos de moi</title>
      </Head>
      <NavBar />
      {loading ? (
        <div className="w-full flex items-center justify-center text-white">
          <AiOutlineLoading className="animate-spin text-6xl text-rose-500" />
        </div>
      ) : (
        <div className="text-white p-4 w-full flex flex-col items-center">
          <h1 className="font-bold text-4xl text-indigo-400">ABOUT ME</h1>
          <span className=" p-1">Who am i ? My history in a few dates.</span>
          <div className="mt-10 flex flex-col w-full items-center space-y-4 lg:flex-row lg:space-x-4 lg:justify-around">
            <div
              className="flex flex-col lg:flex-row items-center space-y-4 lg:space-x-4 lg:w-6/12"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <div className="w-32 h-32 rounded-full border-2 border-indigo-500 lg:border-0">
                <Image
                  src={about.urlPic}
                  alt="Benoit Garcia Photo de profil"
                  className="transition-all rounded-full grayscale hover:grayscale-0 lg:w-32 lg:h-32"
                  width={350}
                  height={350}
                  layout="responsive"
                  objectFit="cover"
                />
              </div>
              <div className="w-full bg-[#060614] p-2 rounded">
                <div
                  id="about-content-id"
                  className="font-quick text-justify"
                ></div>
              </div>
            </div>
            <div
              className="flex flex-col space-y-4 lg:w-5/12"
              data-aos="flip-up"
              data-aos-duration="1000"
              data-aos-delay="500"
            >
              <h2 className="text-lg text-center text-indigo-400 font-medium">
                My history
              </h2>
              <div className="w-full flex flex-col space-y-2">
                {Array.isArray(historic) &&
                  historic.map((el) => (
                    <HistoryDate
                      key={el.id}
                      date={el.date}
                      category={el.category}
                      text={el.description}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default About;
