import Image from "next/image";
import Link from "next/link";
import { ProjectProps } from "../../pages/projects";
import { Button } from "./Button";
import { useRouter } from "next/router";

export const ProjectCard = (props: ProjectProps) => {
  const { id, name, preview, urlImage } = props;
  const router = useRouter();
  return (
    <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg w-full">
      <div className="relative h-56 w-full">
        <Link href={`/projects/${id}`}>
          <Image
            alt="Office"
            src={urlImage}
            className="transition-all duration-200 h-56 w-full object-cover hover:scale-150 cursor-pointer"
            layout="fill"
          />
        </Link>
      </div>

      <div className="bg-[#060614] p-4 sm:p-6">
        <a href="#">
          <h3 className="mt-0.5 text-lg text-indigo-400 font-bold">{name}</h3>
        </a>

        <p className="mt-2 text-sm leading-relaxed text-gray-50 line-clamp-3">
          {preview}
        </p>
        <div className="p-2 flex justify-end">
          <Button
            func={() => router.push(`/projects/${id}`)}
            value="More infos"
          />
        </div>
      </div>
    </article>
  );
};
