import React, { useContext, useEffect, useMemo } from "react";

import { AppContext } from "../../../context/AppContext";
import { useGetMessage } from "../../../hooks/useGetMessage";

export const MessageView = () => {
  const { toggleModal, handleToggle } = useContext(AppContext);
  const message = useGetMessage();
  return (
    <>
      {message && (
        <div>
          <h1 className="font-medium mb-6">{message.title}</h1>
          <p className="p-2 text-sm mb-2">{message.text}</p>
          <hr />
          <span className="text-xs text-right">{message.email}</span>
        </div>
      )}
    </>
  );
};
