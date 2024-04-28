import { ReactNode } from "react";

type QuestionWrapperProps = {
  title?: string;
  children: ReactNode;
};

const QuestionWrapper = ({ title, children }: QuestionWrapperProps) => {
  return (
    <>
      <h3 className="text-white text-center lg:-my-5">
        <b>{title}</b>
      </h3>
      {children}
    </>
  );
};

export default QuestionWrapper;
