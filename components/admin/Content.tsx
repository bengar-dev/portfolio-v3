interface ContentProps {
  children: JSX.Element[] | JSX.Element;
}

export const Content = (props: ContentProps) => {
  return (
    <div className="w-10/12 p-4 pt-10 flex flex-col">{props.children}</div>
  );
};
