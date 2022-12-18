import axios from "axios";
import { useEffect, useState } from "react";

export const useGetMessages = () => {
  const [data, setData] = useState<any>(false);

  useEffect(() => {
    if (!data) getMessagesFromApi();
  }, [data]);

  const getMessagesFromApi = async () => {
    const token = localStorage.getItem("token") || "";
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/messages`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setData(response.data);
  };

  return data;
};
