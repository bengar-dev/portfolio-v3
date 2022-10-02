import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { FaReact, FaUserAstronaut } from "react-icons/fa";
import { IoMdImages } from "react-icons/io";
import { BsMailbox } from "react-icons/bs";
import { BiCopyright } from "react-icons/bi";
import { useRouter } from "next/router";

const NavBar = () => {
  const router = useRouter();

  const handleStyleActiveLink = (target: string) => {
    if (target === router.route.split("/")[1])
      return "group relative flex justify-center rounded px-2 py-1.5 text-gray-500 bg-slate-800 text-indigo-500";
    else
      return "group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-slate-800 hover:text-indigo-500";
  };

  return (
    <div className="flex min-h-screen w-16 flex-col justify-between border-r border-indigo-500 bg-slate-900">
      <div>
        <div className="">
          <nav className="flex flex-col p-2">
            <ul className="space-y-6 pt-4">
              <li>
                <Link href="/">
                  <a className={handleStyleActiveLink("")}>
                    <AiFillHome />
                    <span className="absolute left-full top-1/2 ml-4 -translate-y-1/2 rounded bg-indigo-500 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                      Accueil
                    </span>
                  </a>
                </Link>
              </li>

              <li>
                <Link href="/about">
                  <a className={handleStyleActiveLink("about")}>
                    <FaUserAstronaut />
                    <span className="absolute left-full top-1/2 ml-4 w-max -translate-y-1/2 rounded bg-indigo-500 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                      A-propos
                    </span>
                  </a>
                </Link>
              </li>

              <li>
                <Link href="/skills">
                  <a className={handleStyleActiveLink("skills")}>
                    <FaReact />
                    <span className="absolute left-full top-1/2 ml-4 -translate-y-1/2 rounded bg-indigo-500 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                      Compétences
                    </span>
                  </a>
                </Link>
              </li>

              <li>
                <Link href="/projects">
                  <a className={handleStyleActiveLink("projects")}>
                    <IoMdImages />
                    <span className="absolute left-full top-1/2 ml-4 -translate-y-1/2 rounded bg-indigo-500 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                      Réalisations
                    </span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-slate-800 hover:text-indigo-500">
                    <BsMailbox />
                    <span className="absolute left-full w-max top-1/2 ml-4 -translate-y-1/2 rounded bg-indigo-500 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                      Me contacter
                    </span>
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-indigo-500 bg-slate-900 p-2 h-40 text-white text-xs flex items-center justify-center">
        <div className="-rotate-90 text-indigo-500 font-mono text-center flex items-center">
          <BiCopyright className="text-xl text-indigo-300" />{" "}
          <span>copyright 2022</span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
