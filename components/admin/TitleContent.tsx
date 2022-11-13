interface TitleContentProps {
  title: string;
}

export const TitleContent = (props: TitleContentProps) => {
  const { title } = props;
  return (
    <h1 className="text-2xl font-bold first-letter:text-violet-500">{title}</h1>
  );
};
