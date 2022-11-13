import { useContext, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { signInSchema } from "../../schema/signin";

import { AppContext } from "../../context/AppContext";

import { getUserInfo, signInUser } from "../../services/users";

import { ButtonForm } from "../../components/form/ButtonForm";
import { InputValue } from "../../components/form/InputValue";
import { AlertNotif } from "../../components/ui/AlertNotif";

const Login: NextPage = () => {
  const router = useRouter();
  const { alert, handleToggle } = useContext(AppContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) checkTokenUser(token);
  }, []);

  const checkTokenUser = async (token: string) => {
    const response = await getUserInfo(token);
    if (response) router.push("/admin");
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const { data: token } = await signInUser(data);
      localStorage.setItem("token", token);
      handleToggle(
        {
          title: "Success",
          message: "You are going to be redirected",
          style: "success",
          toggle: true,
        },
        "/admin"
      );
    } catch (err: any) {
      handleToggle({
        title: "Error",
        message: err.response.data.error,
        style: "danger",
        toggle: true,
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      {alert && alert.toggle && (
        <AlertNotif
          toggle={alert.toggle}
          title={alert.title}
          message={alert.message}
          style={alert.style}
        />
      )}
      <div className="relative bg-white w-full md:w-1/2 lg:w-1/3 rounded-lg p-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputValue
                id="email-admin"
                label="Email"
                type="email"
                field={field}
                errors={errors?.email}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <InputValue
                id="password-admin"
                label="Password"
                type="password"
                field={field}
                errors={errors?.password}
              />
            )}
          />
          <div className="mt-2 flex justify-end">
            <ButtonForm value="Sign-in" type="submit" style="classic" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
