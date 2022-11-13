import { NextPage } from "next";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

import { Content } from "../../components/admin/Content";
import { NavSide } from "../../components/admin/NavSide";
import { AlertNotif } from "../../components/ui/AlertNotif";
import { TitleContent } from "../../components/admin/TitleContent";
import { ButtonForm } from "../../components/form/ButtonForm";
import { TableData } from "../../components/admin/TableData";
import { useGetSkills } from "../../hooks/useGetSkills";
import { ModalForm } from "../../components/admin/ModalForm";
import { SkillForm } from "../../components/admin/form/SkillForm";
import { AlertMessage } from "../../components/admin/AlertMessage";

const Skills: NextPage = () => {
  const { alert, toggle, toggleModal } = useContext(AppContext);

  const data = useGetSkills();

  return (
    <div className="flex w-full">
      {toggle && (
        <ModalForm>
          <SkillForm />
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
        <TitleContent title="Skills" />
        <AlertMessage text="Edit skill doesn't work yet, update has been planned." />
        <div className="">
          <div className="flex justify-end space-x-2 p-2">
            <ButtonForm
              value="Add new skill"
              type="button"
              style="submit"
              func={() => toggleModal(true)}
            />
          </div>
          <TableData
            headers={["id", "name", "description", "urlLogo", "display"]}
            data={data}
            target="skills"
            editEnable
            deleteEnable
          />
        </div>
      </Content>
    </div>
  );
};

export default Skills;
