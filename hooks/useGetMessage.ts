import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useGetMessage = () => {
  const [data, setData] = useState<any>(false);
  const router = useRouter();

  useEffect(() => {
    if (!data && router.query?.id) getMessageFromApi();
  }, [data, router]);

  const getMessageFromApi = async () => {
    const id = router.query?.id;
    const token = localStorage.getItem("token") || "";
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/messages/${id}`,
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
