import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import ApiRoutes from "../../Routes/ApiRoutes";
import { toast } from "react-toastify";
import AxiosService from "../../Routes/AxiosService";
import MyVerticallyCenteredModal from "../../utils/modal.jsx";
function Materials() {
  let navigate = useNavigate();
  let [materials, setMaterials] = useState([]);
  let [material_id, setId] = useState([]);
  let [modalShow, setModalShow] = useState(false);
  let modalData = {
    heading: "Are you sure want to delete the selected material ?",
    button: ["Yes", "No"],
    handleConfirm: async (value) => {
      setModalShow(false);
      if (value === "Yes") {
        let res = await AxiosService.delete(
          `${ApiRoutes.DELETE_MATERIAL.path}/${material_id}`,
          {
            authenticate: ApiRoutes.DELETE_MATERIAL.authenticate,
          }
        );
        if (res.status === 200) {
          toast.success(res.data.message);
          getAllMaterials();
        }
      }
    },
  };

  useEffect(() => {
    getAllMaterials();
  }, []);
  const getAllMaterials = async () => {
    try {
      let res = await AxiosService.get(`${ApiRoutes.GET_MATERIAL.path}`, {
        authenticate: ApiRoutes.GET_MATERIAL.authenticate,
      });
      if (res.status === 200) {
        setMaterials(res.data.materials);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleShowModal = (id) => {
    setId(id);
    setModalShow(true);
  };
  const handleCloseModal = () => setModalShow(false);
  const handleEdit = (id) => {
    navigate(`/main/materials/edit/${id}`);
  }
  return (
    <>
      <div className="d-flex justify-content-between align-items-center py-3">
        <h3>Materials Details</h3>
        <Button onClick={() => navigate("create")}>
          Create &nbsp;
          <i className="fa-solid fa-plus"></i>
        </Button>
      </div>
      {materials.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <th>SL.No</th>
              <th>Material Package</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((e, i) => {
              return (
                <tr>
                  <td>{i + 1}</td>
                  <td>
                    {e.materialType === 1
                      ? "Standard Package"
                      : e.materialType === 2
                      ? "Premium Package"
                      : e.materialType === 3
                      ? "Elite Package"
                      : "Custom Package"}
                  </td>
                  <td>{e.packageStatus === 1 ? "Active" : "In-Active"}</td>
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
      ) : (
        <p style={{ textAlign: "center", color: "red" }}>
          {" "}
          No data found!!! &nbsp; Please create material to list out details
        </p>
      )}

      <MyVerticallyCenteredModal
        show={modalShow}
        data={modalData}
        handleclose={() => handleCloseModal()}
      />
    </>
  );
}

export default Materials;
