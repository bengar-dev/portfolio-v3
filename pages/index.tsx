import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaTwitch, FaTwitter } from "react-icons/fa";

import NavBar from "../components/NavBar";
import { axios } from "../config/const";

import HomeImage from "../public/assets/home_image.jpg";

const Home: NextPage = () => {
  const [socials, setSocials] = useState<any>({
    twitch: "",
    github: "",
    linkedin: "",
    twitter: "",
  });

  useEffect(() => {
    if (socials.twitch === "") getAllSocials();
  }, [socials]);

  async function getAllSocials() {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/medias`);
    setSocials(data[0]);
  }
  return (
    <div className="min-h-screen bg-[#000007] flex">
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
        <meta
          property="og:title"
          content="Benoit Garcia - Développeur fullstack js"
        />
        <meta
          property="og:description"
          content="Benoit Garcia, Développeur fullstack javascript sur Montpellier"
        />
        <meta property="og:image" content="" />

        <title>Benoit Garcia - Fullstack js Developper</title>
      </Head>
      <NavBar />
      <div className="text-white p-4 w-full flex flex-col items-center justify-center font-quick">
        <div className="transition-all duration-200 rounded-full border-2 border-indigo-500 hover:border-indigo-500 w-44 h-44">
          <Image
            src={HomeImage}
            alt="Clavier et café image"
            className="transition-all duration-200 rounded-full grayscale hover:grayscale-0 "
          />
        </div>
        <div className="mt-4 flex flex-col items-center">
          <h1 className="font-bold text-indigo-400 text-4xl">Benoit Garcia</h1>
          <p className="text-sm">Fullstack javascript Developper</p>
          <div className="mt-6 flex items-center space-x-4 text-2xl">
            <Link href={`https://twitter.com/${socials.twitter}`}>
              <a target="_blank">
                <FaTwitter className="transition-all hover:text-sky-500" />
              </a>
            </Link>
            <Link href={`https://github.com/${socials.github}`}>
              <a target="_blank">
                <FaGithub className="transition-all hover:text-stone-500" />
              </a>
            </Link>
            <Link href={`https://linkedin.com/in/${socials.linkedin}`}>
              <a target="_blank">
                <FaLinkedin className="transition-all hover:text-cyan-500" />
              </a>
            </Link>
            <Link href={`https://twitch.tv/${socials.twitch}`}>
              <a target="_blank">
                <FaTwitch className="transition-all hover:text-purple-500" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
