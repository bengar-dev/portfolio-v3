import {
  SiDocker,
  SiGraphql,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPrisma,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { FaGit, FaReact } from "react-icons/fa";
import { SkillsProps } from "../../pages/skills";

export const SkillCard = (props: SkillsProps) => {
  const { description, display, id, name, urlLogo, projectId } = props;

  const handleIconsForSkills = (value: string) => {
    switch (value) {
      case "prisma":
        return <SiPrisma />;
      case "react":
        return <FaReact />;
      case "nestjs":
        return <SiNestjs />;
      case "tailwind":
        return <SiTailwindcss />;
      case "mongo":
        return <SiMongodb />;
      case "graphql":
        return <SiGraphql />;
      case "typescript":
        return <SiTypescript />;
      case "sql":
        return <SiMysql />;
      case "nodejs":
        return <SiNodedotjs />;
      case "docker":
        return <SiDocker />;
      case "git":
        return <FaGit />;
      case "nextjs":
        return <SiNextdotjs />;
    }
  };

  return (
    <div className="w-40 h-40 text-6xl flex items-center justify-center text-white">
      {handleIconsForSkills(urlLogo)}
    </div>
  );
};
