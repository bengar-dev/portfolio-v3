import axios from "axios";
import { useEffect, useState } from "react";

export const useGetSkills = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    if (data.length === 0) getSkillsFromApi();
  }, [data]);

  const getSkillsFromApi = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/skills`);
    setData(response.data);
  };

  return data;
};
