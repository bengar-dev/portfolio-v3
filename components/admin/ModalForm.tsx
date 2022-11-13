import React, { useContext } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { AppContext } from "../../context/AppContext";

interface ModalFormProps {
  children: JSX.Element[] | JSX.Element;
}

export const ModalForm = (props: ModalFormProps) => {
  const { children } = props;
  const { toggleModal } = useContext(AppContext);

  return (
    <div
      className="py-12 h-auto bg-gray-400/50 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
      id="modal"
    >
      <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          {children}
          <button
            className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
            aria-label="close modal"
            role="button"
            onClick={() => toggleModal(false)}
          >
            <AiFillCloseCircle className="transition-all duration-200 text-xl hover:text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
};
