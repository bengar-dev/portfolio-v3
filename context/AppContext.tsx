import { useRouter } from "next/router";
import { createContext, useState } from "react";
import { AlertNotifProps } from "../components/ui/AlertNotif";

export const AppContext = createContext<any>({});

const AppContextProvider = (props: any) => {
  const router = useRouter();

  const [alert, setAlert] = useState<AlertNotifProps>({
    title: "",
    message: "",
    toggle: false,
    style: "success",
  });
  const [toggle, setToggle] = useState<boolean>(false);

  const toggleModal = (value: boolean) => {
    setToggle(value);
    if (!value && router.query.id) {
      const origin = router.pathname.split("/")[2];
      router.push({
        pathname: `/admin/${origin}`,
      });
    }
  };

  const handleToggle = (
    alert: AlertNotifProps,
    target: string | null = null
  ) => {
    setAlert({
      ...alert,
    });
    setTimeout(() => {
      setAlert({
        ...alert,
        toggle: false,
      });
      if (target) router.push(target);
    }, 2000);
  };

  return (
    <AppContext.Provider value={{ alert, handleToggle, toggle, toggleModal }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
