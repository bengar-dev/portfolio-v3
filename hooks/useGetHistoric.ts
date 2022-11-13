import axios from "axios";
import { useEffect, useState } from "react";

export const useGetHistoric = () => {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    if (data.length === 0) getHistoricFromApi();
  }, [data]);

  const getHistoricFromApi = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/about/historic`
    );
    setData(response.data);
  };

  return data;
};
