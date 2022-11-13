import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useGetSkill = () => {
  const router = useRouter();
  const [data, setData] = useState<any>();

  useEffect(() => {
    if (!data && router.query?.id) getSkillFromApi();
  }, [data, router]);

  const getSkillFromApi = async () => {
    const id = router.query?.id;
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/skills/${id}`
    );
    setData(response.data);
  };

  return data;
};
