import { NextPage } from "next";
import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { useGetHistoric } from "../../hooks/useGetHistoric";

import { Content } from "../../components/admin/Content";
import { NavSide } from "../../components/admin/NavSide";
import { AlertNotif } from "../../components/ui/AlertNotif";
import { TitleContent } from "../../components/admin/TitleContent";
import { TableData } from "../../components/admin/TableData";
import { ButtonForm } from "../../components/form/ButtonForm";
import { ModalForm } from "../../components/admin/ModalForm";
import { HistoricForm } from "../../components/admin/form/HistoricForm";

const History: NextPage = () => {
  const { alert, toggle, toggleModal } = useContext(AppContext);
  const data = useGetHistoric();

  return (
    <div className="flex w-full">
      {toggle && (
        <ModalForm>
          <HistoricForm />
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
        <TitleContent title="Historic" />
        <div className="mt-10">
          <div className="flex justify-end space-x-2 p-2">
            <ButtonForm
              style="classic"
              value="Add category"
              type="button"
              disabled
            />
            <ButtonForm
              style="submit"
              value="Add new historic date"
              type="button"
              func={() => toggleModal(true)}
            />
          </div>
          <TableData
            headers={["id", "date", "category", "description"]}
            data={data}
            target="history"
            editEnable
            deleteEnable
          />
        </div>
      </Content>
    </div>
  );
};

export default History;
