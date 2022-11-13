import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { Content } from "../../components/admin/Content";
import { NavSide } from "../../components/admin/NavSide";
import { TitleContent } from "../../components/admin/TitleContent";

const Dashboard: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/admin/login");
  }, [router]);

  return (
    <div className="flex w-full">
      <div className="w-2/12">
        <NavSide />
      </div>
      <Content>
        <TitleContent title="Dashboard" />
      </Content>
    </div>
  );
};

export default Dashboard;
