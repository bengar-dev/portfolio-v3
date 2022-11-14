import { yupResolver } from "@hookform/resolvers/yup";
import { cpSync } from "fs";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

import { AppContext } from "../../../context/AppContext";
import { useGetProject } from "../../../hooks/useGetProject";
import { useGetSkills } from "../../../hooks/useGetSkills";
import { projectSchema } from "../../../schema/projects";
import { postProject } from "../../../services/admin";
import { ButtonForm } from "../../form/ButtonForm";

import { InputValue } from "../../form/InputValue";
import { TextArea } from "../../form/TextArea";

import { SkillData } from "./SkillForm";

export interface ProjectData {
  name: string;
  description: string;
  preview: string;
}

export const ProjectForm = () => {
  const router = useRouter();
  const project = useGetProject();
  const skills = useGetSkills();
  const { toggleModal, handleToggle } = useContext(AppContext);
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return {
        name: project?.name ?? "",
        description: project?.description ?? "",
        skillsId: project?.skillsId ?? [],
        urlImage: project?.urlImage ?? "",
        preview: project?.preview ?? "",
        github: project?.github ?? "",
        live: project?.live ?? "",
      };
    }, [project]),
    resolver: yupResolver(projectSchema),
  });

  useEffect(() => {
    reset(project);
  }, [project, reset]);

  const onSubmit = async (data: ProjectData) => {
    const token = localStorage.getItem("token") || "";
    if (router.query.id) {
      /* await editSkill(router.query.id, data, token); */
      handleToggle({
        title: "Success",
        message: "Skill has been edited",
        toggle: true,
        style: "success",
      });
      toggleModal(false);
    } else {
      await postProject(data, token);
      handleToggle({
        title: "Success",
        message: "Project has been added",
        toggle: true,
        style: "success",
      });
      toggleModal(false);
    }
    window.location.reload();
  };

  const handleSkillsIdArray = (event: any) => {
    const newArray = [...getValues("skillsId")];
    const finInArrayNewSkillId = newArray.findIndex(
      (skill) => skill === event.target.value
    );
    if (finInArrayNewSkillId === -1) {
      newArray.push(event.target.value);
      setValue("skillsId", newArray);
    }
  };

  const deleteSkillId = (id: string) => {
    const newArray = [...getValues("skillsId")];
    const findInArrayNewSkillId = newArray.findIndex((skill) => skill === id);
    if (findInArrayNewSkillId !== -1) {
      newArray.splice(findInArrayNewSkillId, 1);
      setValue("skillsId", newArray);
    }
  };

  return (
    <>
      <h1 className="font-medium mb-6">Project form</h1>
      <form
        onSubmit={handleSubmit(onSubmit, console.log)}
        className="flex flex-col space-y-2"
      >
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <InputValue
              id="name-project"
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
              id="desc-project"
              label="Description"
              field={field}
              errors={errors?.description}
            />
          )}
        />
        <Controller
          name="preview"
          control={control}
          render={({ field }) => (
            <InputValue
              id="preview-project"
              type="text"
              label="Preview"
              field={field}
              errors={errors?.preview}
            />
          )}
        />
        <Controller
          name="skillsId"
          control={control}
          render={({ field }) => (
            <>
              <label htmlFor="skillsId-id" className="p-1 text-sm font-medium">
                Technologies
              </label>
              <select
                className="p-2 rounded-md outline-none border border-slate-200 text-sm text-slate-800"
                onChange={(e) => handleSkillsIdArray(e)}
              >
                {skills.map((skill: SkillData) => (
                  <option key={skill?.id} value={skill?.id}>
                    {skill?.name}
                  </option>
                ))}
              </select>
            </>
          )}
        />
        <div className="flex space-x-2">
          {filterSkillsWithData(skills, watch("skillsId")).map((skill) => (
            <span
              key={skill.id}
              className="relative text-xs font-medium p-1 rounded-full bg-gray-100"
            >
              {skill.name}
              <button
                onClick={() => {
                  if (skill.id) deleteSkillId(skill.id);
                }}
                className="absolute bg-red-500 -top-2 -right-2 flex justify-center items-center w-4 h-4 rounded-full text-white"
              >
                x
              </button>
            </span>
          ))}
        </div>
        <Controller
          name="urlImage"
          control={control}
          render={({ field }) => (
            <InputValue
              id="imageUrl-project"
              type="text"
              label="Image preview Url"
              field={field}
              errors={errors?.urlImage}
            />
          )}
        />
        <Controller
          name="github"
          control={control}
          render={({ field }) => (
            <InputValue
              id="github-project"
              type="text"
              label="GitHub"
              field={field}
              errors={errors?.github}
            />
          )}
        />
        <Controller
          name="live"
          control={control}
          render={({ field }) => (
            <InputValue
              id="live-project"
              type="text"
              label="Live"
              field={field}
              errors={errors?.live}
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

function filterSkillsWithData(
  skills: SkillData[],
  selectSkills: string[]
): SkillData[] {
  const newArray = [];
  for (const skill of selectSkills) {
    const findSkill = skills.find((el) => el.id === skill);
    if (findSkill) newArray.push(findSkill);
  }
  return newArray;
}
