import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import AxiosService from "../../Routes/AxiosService";
import ApiRoutes from "../../Routes/ApiRoutes";
import { toast } from "react-toastify";
import MyVerticallyCenteredModal from "../../utils/modal.jsx";

function Projects() {
  let navigate = useNavigate();
  let [projects, setProjects] = useState([]);
  let [modalShow, setModalShow] = useState(false);
  let [project_id, setId] = useState([]);

  const handleShowModal = (id) => {
    setId(id);
    setModalShow(true);
  };
  let modalData = {
    heading: "Are you sure want to delete ?",
    button: ["Yes", "No"],
    handleConfirm: async (value) => {
      handleCloseModal();
      if (value === "Yes") {
        let res = await AxiosService.delete(
          `${ApiRoutes.DELETE_PROJECT.path}/${project_id}`,
          {
            authenticate: ApiRoutes.DELETE_PROJECT.authenticate,
          }
        );
        if (res.status === 200) {
          toast.success(res.data.message);
          getAllProjects();
        }
      }
    },
  };
  const handleCloseModal = () => setModalShow(false);

  let getAllProjects = async () => {
    try {
      let res = await AxiosService.get(`${ApiRoutes.GET_ALL_PROJECT.path}`, {
        authenticate: ApiRoutes.GET_ALL_PROJECT.authenticate,
      });
      if (res.status === 200) {
        // toast.success(res.data.message);
        setProjects(res.data.projects);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getAllProjects();
  }, []);
  let handleEdit = (id) => {
    navigate(`/main/projects/edit/${id}`);
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center py-3">
        <h3>Ongoing Projects</h3>
        <Button onClick={() => navigate("create")}>
          Create &nbsp;
          <i className="fa-solid fa-plus"></i>
        </Button>
      </div>
      <div>
        <Table striped>
          <thead>
            <tr>
              <th>Sl.No</th>
              <th>Project Name</th>
              <th>Client Name</th>
              <th>Status</th>
              <th>Timeline</th>
              <th>Budget</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((e, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{e.projectName}</td>
                  <td>{e.clientName}</td>
                  <td>{e.projectStatus === 1 ? "Active" : "Inactive"}</td>
                  <td>{e.projectTimeline}</td>
                  <td>{e.projectBudget}</td>
                  <td>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        handleEdit(e._id);
                      }}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                    &nbsp;
                    <Button
                      variant="danger"
                      onClick={() => {
                        handleShowModal(e._id);
                      }}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <MyVerticallyCenteredModal
          show={modalShow}
          data={modalData}
          handleclose={() => handleCloseModal()}
        />
      </div>
    </>
  );
}

export default Projects;
