import React, { useEffect, useState } from "react";

import { GoDashboard } from "react-icons/go";
import { FiSettings } from "react-icons/fi";
import { ButtonNav } from "./ButtonNav";
import { FaHistory, FaReact, FaUserAstronaut, FaUsers } from "react-icons/fa";
import { AiOutlinePicture } from "react-icons/ai";
import { useRouter } from "next/router";
import { getUserInfo } from "../../services/users";
import { UserInfoProps } from "../../types/user";

export const NavSide = () => {
  const router = useRouter();

  const [user, setUser] = useState<UserInfoProps>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) checkTokenUser(token);
    if (!token) router.push("/admin");
  }, []);

  const checkTokenUser = async (token: string) => {
    const { data: userInfo } = await getUserInfo(token);
    if (userInfo) setUser(userInfo);
  };

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      router.push("/admin");
    }
  };

  return (
    <div className="flex h-screen flex-col justify-between border-r bg-white">
      <div className="px-4 py-6">
        <h1 className="bg-violet-500 text-gray-50 rounded-lg text-center font-medium p-2">
          dashboard <span className="text-xs text-violet-300">1.0</span>
        </h1>
        <hr />
        <nav aria-label="Main Nav" className="mt-6 flex flex-col space-y-1">
          <ButtonNav value="Dashboard" target="/admin" icon={<GoDashboard />} />
          <ButtonNav
            value="About-Me"
            target="/admin/about"
            icon={<FaUserAstronaut />}
          />
          <ButtonNav
            value="Historic"
            target="/admin/history"
            icon={<FaHistory />}
          />
          <ButtonNav value="Skills" target="/admin/skills" icon={<FaReact />} />
          <ButtonNav
            value="Projects"
            target="/admin/projects"
            icon={<AiOutlinePicture />}
          />
          <ButtonNav value="Users" target="/admin/users" icon={<FaUsers />} />
          <ButtonNav
            value="Settings"
            target="/admin/settings"
            icon={<FiSettings />}
          />
        </nav>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex w-full shrink-0 items-center bg-white p-4 hover:bg-violet-100"
        >
          <span className="w-10 h-10 rounded-full bg-violet-400"></span>
          <div className="ml-5 mr-auto">
            <p className="text-xs flex flex-col items-end">
              <strong className="font-medium">{user?.userName}</strong>
              <span>{user?.email}</span>
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};
