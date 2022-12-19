import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { contactSchema } from "../schema/contact";

import { InputValue } from "../components/form/InputValue";
import NavBar from "../components/NavBar";

import { AiOutlineLoading } from "react-icons/ai";
import { Button } from "../components/ui/Button";
import { axios } from "../config/const";

const Contact: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<string>("");
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { email: "", title: "", text: "" },
    resolver: yupResolver(contactSchema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/message`,
      data
    );
    setLoading(false);
    if (response.status === 201) {
      setSubmitMessage("Message has been sent");
      setTimeout(() => {
        setSubmitMessage("");
        reset();
      }, 2500);
    }
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

        <title>Benoit Garcia - Contact me</title>
      </Head>
      <NavBar />
      {loading ? (
        <div className="w-full flex items-center justify-center text-white">
          <AiOutlineLoading className="animate-spin text-6xl text-rose-500" />
        </div>
      ) : (
        <div className="text-white p-4 w-full flex flex-col items-center">
          <h1 className="font-bold text-4xl text-indigo-400 uppercase">
            Contact me
          </h1>
          <span className="p-1">
            Contact me, I will answer as soon as possible
          </span>
          {submitMessage !== "" && (
            <span className="font-bold text-emerald-400 p-2">
              {submitMessage}
            </span>
          )}
          <div className="mt-10 flex flex-col w-full items-center space-y-4 lg:flex-row lg:space-x-4 lg:justify-around">
            <form
              className="w-full md:w-1/2 lg:w-1/3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <InputValue
                    id="email"
                    type="email"
                    label="Your email"
                    field={field}
                    errors={errors?.email}
                  />
                )}
              />
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <InputValue
                    id="title"
                    type="text"
                    label="Subject"
                    field={field}
                    errors={errors?.title}
                  />
                )}
              />
              <Controller
                name="text"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col">
                    <label htmlFor="text" className="p-1 text-sm font-medium">
                      Message content
                    </label>
                    <textarea
                      className={`p-2 h-40 rounded-md outline-none border border-slate-200 text-sm text-slate-800 ${
                        errors?.text && "border-red-500"
                      }`}
                      {...field}
                    ></textarea>
                  </div>
                )}
              />
              <div className="mt-2 flex justify-end">
                <Button value="Submit" />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
