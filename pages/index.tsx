import { NextPage } from "next";
import Head from "next/head";
import React from "react";

const Home: NextPage = () => {
  return (
    <div className="bg-[#000007] flex flex-col items-center justify-center min-h-screen text-indigo-50">
      <Head>
        <title>Benoit Garcia - Developper web fullstack js</title>
      </Head>
      <h1 className="text-3xl font-bold">🚧 Portfolio is under construction</h1>
      <span className="p-2">
        You can contact me on{" "}
        <a
          href="https://twitter.com/PressyDev"
          target="_blank"
          className="text-sky-500 hover:font-bold"
          rel="noreferrer"
        >
          twitter
        </a>
        {" - "}
        <a
          href="https://www.linkedin.com/in/benoit-gar/"
          target="_blank"
          className="text-blue-500 hover:font-bold"
          rel="noreferrer"
        >
          linkedin
        </a>
      </span>
    </div>
  );
};

export default Home;
