import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useGetOneHistoric = () => {
  const [data, setData] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    if (!data && router.query?.id) {
      getOneHistoricFromApi();
    }
  }, [data, router]);

  const getOneHistoricFromApi = async () => {
    const id = router.query?.id;
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/about/historic/${id}`
    );
    setData(response.data);
  };

  return data;
};
