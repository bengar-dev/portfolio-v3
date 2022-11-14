import axios, { AxiosResponse } from "axios";
import { HistoricData } from "../components/admin/form/HistoricForm";
import { ProjectData } from "../components/admin/form/ProjectForm";
import { SkillData } from "../components/admin/form/SkillForm";

export const aboutMeValues = async (token: string): Promise<AxiosResponse> => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/about`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const aboutMeEdit = async (
  data: any,
  token: string | null
): Promise<AxiosResponse> => {
  const payload = {
    content: data.text,
    urlPic: data.urlPicture,
  };
  try {
    if (!token) throw new Error("Token not found");
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/about`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (err: any) {
    if (err.response?.data?.error) return err.response.data.error;
    return err.message;
  }
};

export const editHistoric = async (
  id: string | string[],
  data: HistoricData,
  token: string
) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API}/about/historic/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (err: any) {
    if (err.response?.data?.error) return err.response.data.error;
    return err.message;
  }
};

export const postHistoric = async (data: HistoricData, token: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/about/historic`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (err: any) {
    if (err.response?.data?.error) return err.response.data.error;
    return err.message;
  }
};

export const editSkill = async (
  id: string | string[],
  data: SkillData,
  token: string
) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API}/skills/update/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (err: any) {
    if (err.response?.data?.error) return err.response.data.error;
    return err.message;
  }
};

export const postSkill = async (data: SkillData, token: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/skills`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (err: any) {
    if (err.response?.data?.error) return err.response.data.error;
    return err.message;
  }
};

export const postProject = async (data: ProjectData, token: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/projects`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (err: any) {
    if (err.response?.data?.error) return err.response.data.error;
    return err.message;
  }
};
