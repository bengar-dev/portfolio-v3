import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

import { AppContext } from "../../../context/AppContext";
import { editHistoric, postHistoric } from "../../../services/admin";
import { useGetOneHistoric } from "../../../hooks/useGetOneHistoric";

import { historySchema } from "../../../schema/history";
import { ButtonForm } from "../../form/ButtonForm";
import { InputDate } from "../../form/InputDate";
import { InputValue } from "../../form/InputValue";
import { TextArea } from "../../form/TextArea";

export interface HistoricData {
  category: string;
  description: string;
  date: string;
}

export const HistoricForm = () => {
  const router = useRouter();

  const { toggleModal, handleToggle } = useContext(AppContext);
  const historic = useGetOneHistoric();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: useMemo(() => {
      return {
        category: historic?.category ?? "",
        date: historic?.date ?? new Date(),
        description: historic?.description ?? "",
      };
    }, [historic]),
    resolver: yupResolver(historySchema),
  });

  useEffect(() => {
    reset(historic);
  }, [historic, reset]);

  const onSubmit = async (data: HistoricData) => {
    const token = localStorage.getItem("token") || "";
    if (router.query.id) {
      await editHistoric(router.query.id, data, token);
      handleToggle({
        title: "Success",
        message: "Historic has been edited",
        toggle: true,
        style: "success",
      });
      toggleModal(false);
    } else {
      await postHistoric(data, token);
      handleToggle({
        title: "Success",
        message: "Historic has been added",
        toggle: true,
        style: "success",
      });
      toggleModal(false);
    }
    window.location.reload();
  };

  return (
    <>
      <h1 className="font-medium mb-6">Historic form</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-2"
      >
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <InputValue
              id="cat-historic"
              label="Category"
              type="text"
              field={field}
              errors={errors?.category}
            />
          )}
        />
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <InputDate
              id="date-historic"
              type="date"
              label="Date"
              field={field}
              errors={errors?.date}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextArea
              id="desc-historic"
              label="Description"
              errors={errors?.description}
              field={field}
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
