import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useGetProject = () => {
  const router = useRouter();
  const [data, setData] = useState<any>();

  useEffect(() => {
    if (!data && router.query?.id) getProjectFromApi();
  }, [data, router]);

  const getProjectFromApi = async () => {
    const id = router.query?.id;
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/projects/${id}`
    );
    setData(response.data);
  };

  return data;
};
