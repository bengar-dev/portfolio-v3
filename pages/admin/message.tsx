import { NextPage } from "next";
import { useContext } from "react";
import { Content } from "../../components/admin/Content";
import { ProjectForm } from "../../components/admin/form/ProjectForm";
import { ModalForm } from "../../components/admin/ModalForm";
import { NavSide } from "../../components/admin/NavSide";
import { TableData } from "../../components/admin/TableData";
import { TitleContent } from "../../components/admin/TitleContent";
import { MessageView } from "../../components/admin/view/MessageView";
import { AlertNotif } from "../../components/ui/AlertNotif";
import { AppContext } from "../../context/AppContext";
import { useGetMessages } from "../../hooks/useGetMessages";

const Messages: NextPage = () => {
  const { alert, toggle } = useContext(AppContext);
  const data = useGetMessages();

  return (
    <div className="flex w-full">
      {toggle && (
        <ModalForm>
          <MessageView />
        </ModalForm>
      )}
      <div className="w-2/12">
        <NavSide />
      </div>
      <Content>
        {alert && alert.toggle && (
          <AlertNotif
            toggle={alert.toggle}
            title={alert.title}
            message={alert.message}
            style={alert.style}
          />
        )}
        <TitleContent title="Messages" />
        <div className="">
          <div className="flex justify-end space-x-2 p-2"></div>
          <TableData
            headers={["id", "title", "email"]}
            data={data}
            target="message"
            viewEnable
            deleteEnable
          />
        </div>
      </Content>
    </div>
  );
};

export default Messages;
