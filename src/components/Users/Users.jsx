import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import ApiRoutes from "../../Routes/ApiRoutes";
import AxiosService from "../../Routes/AxiosService";
import MyVerticallyCenteredModal from "../../utils/modal.jsx";
import { toast } from "react-toastify";

function Users() {
  let navigate = useNavigate();
  let [users, setUsers] = useState([]);
  let [user_id, setId] = useState([]);
  let [modalShow, setModalShow] = useState(false);
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
          `${ApiRoutes.DELETE_USER.path}/${user_id}`,
          {
            authenticate: ApiRoutes.DELETE_USER.authenticate,
          }
        );
        if (res.status === 200) {
          toast.success(res.data.message);
          getAllUsers();
        }
      }
    },
  };
  const handleCloseModal = () => setModalShow(false);
  const getUserType = (value) => {
    let type;
    switch (value) {
      case 1: {
        type = "Super Admin";
        break;
      }
      case 2: {
        type = "Admin";
        break;
      }
      case 3: {
        type = "Manager";
        break;
      }
      case 4: {
        type = "Site Engineer";
        break;
      }
      case 5: {
        type = "Client";
        break;
      }
      case 6: {
        type = "Labour";
        break;
      }
    }
    return type
  }
  let getAllUsers = async () => {
    try {
      let res = await AxiosService.get(`${ApiRoutes.GET_ALL_USER.path}`, {
        authenticate: ApiRoutes.GET_ALL_USER.authenticate,
      });
      if (res.status === 200) {
        setUsers(res.data.users);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  let handleEdit = (id) => {
    navigate(`/main/users/edit/${id}`);
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center py-3">
        <h3>Users</h3>
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
              <th>Name</th>
              <th>Mail ID</th>
              <th>User Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((e,i) => {
              return  <tr key={i}>
                <td>{i+ 1}</td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{getUserType(e.userType)}</td>
                <td>{e.status == "1" ? 'Active' : 'In-Active'}</td>
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

export default Users;
