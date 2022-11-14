import axios from "axios";
import { useEffect, useState } from "react";

export const useGetProjects = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    if (data.length === 0) getProjectsFromApi();
  }, [data]);

  const getProjectsFromApi = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/projects`);
    setData(response.data);
  };

  return data;
};
