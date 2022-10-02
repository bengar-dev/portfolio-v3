import type { NextPage } from "next";
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
  }, []);

  async function getAllSocials() {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/medias`);
    setSocials(data[0]);
  }

  return (
    <div className="min-h-screen bg-slate-900 flex">
      <NavBar />
      <div className="text-white p-4 w-full flex flex-col items-center justify-center">
        <div className="transition-all duration-200 rounded-full border-2 border-slate-900 hover:border-indigo-500 w-44 h-44">
          <Image
            src={HomeImage}
            alt="Image Home Keyboard and coffee"
            className="transition-all duration-200 rounded-full grayscale hover:grayscale-0 "
          />
        </div>
        <div className="mt-4 flex flex-col items-center">
          <h1 className="font-bold text-indigo-400 text-4xl">Benoit Garcia</h1>
          <p className="font-mono text-sm">Développeur fullstack javascript</p>
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
