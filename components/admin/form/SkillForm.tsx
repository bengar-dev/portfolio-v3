import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

import { AppContext } from "../../../context/AppContext";
import { useGetSkill } from "../../../hooks/useGetSkill";
import { skillsSchema } from "../../../schema/skills";
import { editSkill, postSkill } from "../../../services/admin";
import { ButtonForm } from "../../form/ButtonForm";

import { InputValue } from "../../form/InputValue";
import { TextArea } from "../../form/TextArea";

export interface SkillData {
  name: string;
  description: string;
  urlLogo: string;
  id?: string;
}

export const SkillForm = () => {
  const router = useRouter();
  const skill = useGetSkill();
  const { toggleModal, handleToggle } = useContext(AppContext);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return {
        name: skill?.name ?? "",
        description: skill?.description ?? "",
        urlLogo: skill?.urlLogo ?? "",
      };
    }, [skill]),
    resolver: yupResolver(skillsSchema),
  });

  useEffect(() => {
    reset(skill);
  }, [skill, reset]);

  const onSubmit = async (data: SkillData) => {
    const token = localStorage.getItem("token") || "";
    if (router.query.id) {
      await editSkill(router.query.id, data, token);
      handleToggle({
        title: "Success",
        message: "Skill has been edited",
        toggle: true,
        style: "success",
      });
      toggleModal(false);
    } else {
      await postSkill(data, token);
      handleToggle({
        title: "Success",
        message: "Skill has been added",
        toggle: true,
        style: "success",
      });
      toggleModal(false);
    }
    window.location.reload();
  };

  return (
    <>
      <h1 className="font-medium mb-6">Skills form</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-2"
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <InputValue
              id="name-skills"
              type="text"
              label="Name"
              field={field}
              errors={errors?.name}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextArea
              id="desc-skills"
              label="Description"
              field={field}
              errors={errors?.description}
            />
          )}
        />
        <Controller
          name="urlLogo"
          control={control}
          render={({ field }) => (
            <InputValue
              id="urlLogo-skills"
              type="text"
              label="Url logo"
              field={field}
              errors={errors?.urlLogo}
            />
          )}
        />
        <div className="flex space-x-2 justify-end">
          <ButtonForm
            style="delete"
            type="button"
            value="Cancel"
            func={() => toggleModal(false)}
          />
          <ButtonForm style="submit" type="submit" value="Submit" />
        </div>
      </form>
    </>
  );
};
