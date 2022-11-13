import axios, { AxiosResponse } from "axios";

interface SignInProps {
  email: string;
  password: string;
}

export const signInUser = async (data: SignInProps): Promise<AxiosResponse> => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API}/users/signin`,
    data
  );
  return response;
};

export const getUserInfo = async (token: string): Promise<AxiosResponse> => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API}/users/info`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
