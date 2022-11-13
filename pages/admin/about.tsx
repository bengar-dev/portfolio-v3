import { yupResolver } from "@hookform/resolvers/yup";
import { NextPage } from "next";
import { useContext, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AppContext } from "../../context/AppContext";

import { AboutSchema } from "../../schema/admin";
import { aboutMeEdit } from "../../services/admin";
import { AboutMeProps, useGetAboutInfo } from "../../hooks/useGetAboutInfo";

import { AlertMessage } from "../../components/admin/AlertMessage";
import { Content } from "../../components/admin/Content";
import { NavSide } from "../../components/admin/NavSide";
import { TitleContent } from "../../components/admin/TitleContent";
import { ButtonForm } from "../../components/form/ButtonForm";
import { InputValue } from "../../components/form/InputValue";
import { TextArea } from "../../components/form/TextArea";
import { AlertNotif } from "../../components/ui/AlertNotif";

import { ImSpinner } from "react-icons/im";

const About: NextPage = () => {
  const { alert, handleToggle } = useContext(AppContext);
  const [loading, setLoading] = useState<boolean>(false);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const data = useGetAboutInfo();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return data;
    }, [data]),
    resolver: yupResolver(AboutSchema),
  });

  useEffect(() => {
    reset(data);
  }, [data, reset]);

  const onSubmit = async (data: AboutMeProps) => {
    setLoading(true);
    const response = await aboutMeEdit(data, token);
    if (typeof response === "string") {
      handleToggle({
        title: "Error",
        message: response,
        toggle: true,
        style: "danger",
      });
    } else {
      handleToggle({
        title: "Success",
        message: "About me has been edited",
        toggle: true,
        style: "success",
      });
    }
    setLoading(false);
  };

  return (
    <div className="flex w-full">
      <div className="w-2/12">
        <NavSide />
      </div>
      <Content>
        {alert && alert.toggle && (
          <AlertNotif
            toggle={alert.toggle}
            title={alert.title}
            message={alert.message}
            style={alert.style}
          />
        )}
        <TitleContent title="About-me" />
        <AlertMessage text="An update About-me is be planned to handle Content back return and CV url download." />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="text"
            control={control}
            render={({ field }) => (
              <TextArea
                id="text-content"
                label="Content"
                field={field}
                errors={errors?.text}
              />
            )}
          />
          <Controller
            name="urlPicture"
            control={control}
            render={({ field }) => (
              <InputValue
                id="url-picture"
                type="text"
                label="Picture"
                field={field}
                errors={errors?.urlPicture}
              />
            )}
          />
          <div className="mt-2 flex justify-end">
            <ButtonForm
              style="submit"
              type="submit"
              value={
                loading ? (
                  <ImSpinner className="text-white text-xl animate-spin" />
                ) : (
                  "Submit"
                )
              }
            />
          </div>
        </form>
      </Content>
    </div>
  );
};

export default About;
