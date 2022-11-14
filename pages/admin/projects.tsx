import { NextPage } from "next";
import { useContext } from "react";
import { AlertMessage } from "../../components/admin/AlertMessage";
import { Content } from "../../components/admin/Content";
import { ProjectForm } from "../../components/admin/form/ProjectForm";
import { ModalForm } from "../../components/admin/ModalForm";
import { NavSide } from "../../components/admin/NavSide";
import { TableData } from "../../components/admin/TableData";
import { TitleContent } from "../../components/admin/TitleContent";
import { ButtonForm } from "../../components/form/ButtonForm";
import { AlertNotif } from "../../components/ui/AlertNotif";
import { AppContext } from "../../context/AppContext";
import { useGetProjects } from "../../hooks/useGetProjects";

const Projects: NextPage = () => {
  const { alert, toggle, toggleModal } = useContext(AppContext);

  const data = useGetProjects();

  return (
    <div className="flex w-full">
      {toggle && (
        <ModalForm>
          <ProjectForm />
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
        <TitleContent title="Projects" />
        <AlertMessage text="Edit project doesn't work yet, update has been planned." />
        <div className="">
          <div className="flex justify-end space-x-2 p-2">
            <ButtonForm
              value="Add new project"
              type="button"
              style="submit"
              func={() => toggleModal(true)}
            />
          </div>
          <TableData
            headers={["id", "name", "description", "preview"]}
            data={data}
            target="projects"
            editEnable
            deleteEnable
          />
        </div>
      </Content>
    </div>
  );
};

export default Projects;
