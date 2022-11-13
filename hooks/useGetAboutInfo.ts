import { useEffect, useState } from "react";
import axios from "axios";

export interface AboutMeProps {
  text: string;
  urlPicture: string;
}

export const useGetAboutInfo = () => {
  const [data, setData] = useState<AboutMeProps>({
    text: "",
    urlPicture: "",
  });

  useEffect(() => {
    if (data.text === "") getUserInfo();
  }, [data]);

  const getUserInfo = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/about`);
    setData({
      text: response.data.content,
      urlPicture: response.data.urlPic,
    });
  };

  return data;
};
