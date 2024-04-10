import React, { useState } from "react";
import SideBar from "./SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import MyVerticallyCenteredModal from "../utils/modal.jsx";
import { toast } from "react-toastify";

function Layout() {
  let navigate = useNavigate();
  let [dropdownOpen, setDropdownOpen] = useState(false);
  let [modalShow, setModalShow] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    console.log(dropdownOpen);
  };
  const handleShowModal = () => {
    setModalShow(true);
  };
  let modalData = {
    heading: "Are you sure want to logout ?",
    button: ["Yes", "No"],
    handleConfirm: async (value) => {
      handleCloseModal();
      if (value === "Yes") {
        sessionStorage.removeItem("token");
        toast.success("Logout Successfull");
        navigate("/");
      }
    },
  };
  const handleCloseModal = () => setModalShow(false);
  return (
    <div className="d-flex">
      <SideBar />
      <div className="container-fluid">
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
              <ul className="navbar-nav ml-auto">
                {/* <!-- Nav Item - Alerts --> */}
                <li className="nav-item dropdown no-arrow mx-1">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="alertsDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fas fa-bell fa-fw"></i>
                    {/* <!-- Counter - Alerts --> */}
                    <span className="badge badge-danger badge-counter">3+</span>
                  </a>
                  {/* <!-- Dropdown - Alerts --> */}
                  <div
                    className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="alertsDropdown"
                  >
                    <h6 className="dropdown-header">Alerts Center</h6>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#"
                    >
                      <div className="mr-3">
                        <div className="icon-circle bg-primary">
                          <i className="fas fa-file-alt text-white"></i>
                        </div>
                      </div>
                      <div>
                        <div className="small text-gray-500">
                          December 12, 2019
                        </div>
                        <span className="font-weight-bold">
                          A new monthly report is ready to download!
                        </span>
                      </div>
                    </a>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#"
                    >
                      <div className="mr-3">
                        <div className="icon-circle bg-success">
                          <i className="fas fa-donate text-white"></i>
                        </div>
                      </div>
                      <div>
                        <div className="small text-gray-500">
                          December 7, 2019
                        </div>
                        $290.29 has been deposited into your account!
                      </div>
                    </a>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#"
                    >
                      <div className="mr-3">
                        <div className="icon-circle bg-warning">
                          <i className="fas fa-exclamation-triangle text-white"></i>
                        </div>
                      </div>
                      <div>
                        <div className="small text-gray-500">
                          December 2, 2019
                        </div>
                        Spending Alert: We've noticed unusually high spending
                        for your account.
                      </div>
                    </a>
                    <a
                      className="dropdown-item text-center small text-gray-500"
                      href="#"
                    >
                      Show All Alerts
                    </a>
                  </div>
                </li>

                {/* <!-- Nav Item - Messages --> */}
                <li className="nav-item dropdown no-arrow mx-1">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="messagesDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fas fa-envelope fa-fw"></i>
                    {/* <!-- Counter - Messages --> */}
                    <span className="badge badge-danger badge-counter">7</span>
                  </a>
                  {/* <!-- Dropdown - Messages --> */}
                  <div
                    className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="messagesDropdown"
                  >
                    <h6 className="dropdown-header">Message Center</h6>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#"
                    >
                      <div className="dropdown-list-image mr-3">
                        <img
                          className="rounded-circle"
                          src="img/undraw_profile_1.svg"
                          alt="..."
                        />
                        <div className="status-indicator bg-success"></div>
                      </div>
                      <div className="font-weight-bold">
                        <div className="text-truncate">
                          Hi there! I am wondering if you can help me with a
                          problem I've been having.
                        </div>
                        <div className="small text-gray-500">
                          Emily Fowler · 58m
                        </div>
                      </div>
                    </a>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#"
                    >
                      <div className="dropdown-list-image mr-3">
                        <img
                          className="rounded-circle"
                          src="img/undraw_profile_2.svg"
                          alt="..."
                        />
                        <div className="status-indicator"></div>
                      </div>
                      <div>
                        <div className="text-truncate">
                          I have the photos that you ordered last month, how
                          would you like them sent to you?
                        </div>
                        <div className="small text-gray-500">Jae Chun · 1d</div>
                      </div>
                    </a>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#"
                    >
                      <div className="dropdown-list-image mr-3">
                        <img
                          className="rounded-circle"
                          src="img/undraw_profile_3.svg"
                          alt="..."
                        />
                        <div className="status-indicator bg-warning"></div>
                      </div>
                      <div>
                        <div className="text-truncate">
                          Last month's report looks great, I am very happy with
                          the progress so far, keep up the good work!
                        </div>
                        <div className="small text-gray-500">
                          Morgan Alvarez · 2d
                        </div>
                      </div>
                    </a>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#"
                    >
                      <div className="dropdown-list-image mr-3">
                        <img
                          className="rounded-circle"
                          src="https://source.unsplash.com/Mv9hjnEUHR4/60x60"
                          alt="..."
                        />
                        <div className="status-indicator bg-success"></div>
                      </div>
                      <div>
                        <div className="text-truncate">
                          Am I a good boy? The reason I ask is because someone
                          told me that people say this to all dogs, even if they
                          aren't good...
                        </div>
                        <div className="small text-gray-500">
                          Chicken the Dog · 2w
                        </div>
                      </div>
                    </a>
                    <a
                      className="dropdown-item text-center small text-gray-500"
                      href="#"
                    >
                      Read More Messages
                    </a>
                  </div>
                </li>

                <div className="topbar-divider d-none d-sm-block"></div>

                {/* <!-- Nav Item - User Information --> */}
                <li className="nav-item dropdown no-arrow d-flex align-items-center">
                  <div>
                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                      Raaja Ravi Varman
                    </span>
                    <img
                      onClick={toggleDropdown}
                      style={{
                        height: "50px",
                        width: "50px",
                        cursor: "pointer",
                      }}
                      className="img-profile rounded-circle"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZoggVvywxZ2J0kQD7MbpHo5jrK-0GF3fcHw&usqp=CAU"
                    />
                  </div>

                  {dropdownOpen && (
                    <Dropdown.Menu show={dropdownOpen}>
                      <Dropdown.Item href="#">
                        <i className="fa-solid fa-user"></i> &nbsp; Profile
                      </Dropdown.Item>
                      <Dropdown.Item href="#">
                        <i className="fa-solid fa-gears"></i> &nbsp; Settings
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleShowModal()}>
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>{" "}
                        &nbsp; Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div>
          <Outlet />
        </div>
        <footer
          style={{ position: "fixed", bottom: 0, right: 0 }}
          className="sticky-footer bg-white"
        >
          <div className="container my-auto">
            <div className="copyright text-center my-auto">
              <span>Copyright &copy; Trio Engineers 2018</span>
            </div>
          </div>
        </footer>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        data={modalData}
        handleclose={() => handleCloseModal()}
      />
    </div>
  );
}

export default Layout;
