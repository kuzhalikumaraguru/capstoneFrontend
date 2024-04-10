import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { useLocation, useNavigate } from "react-router-dom";

function SideBar() {
  let navigate = useNavigate();
  let location = useLocation();
  return (
    <div id="wrapper">
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <a className="sidebar-brand d-flex align-items-center justify-content-center">
          <div className="sidebar-brand-text mx-3">
            TRIO ENGINEERS<sup>3</sup>
          </div>
        </a>
        <hr className="sidebar-divider my-0" />
        <li
          className={`nav-item ${
            location.pathname === "/dashboard" ? "active" : ""
          }`}
        >
          <a className="nav-link" onClick={() => navigate("dashboard")}>
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </a>
        </li>
        <li
          className={`nav-item ${
            location.pathname === "/projects" ? "active" : ""
          }`}
        >
          <a className="nav-link" onClick={() => navigate("projects")}>
            <i className="fas fa-fw fa-chart-area"></i>
            <span>Projects</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={() => navigate("users")}>
            <i className="fas fa-fw fa-table"></i>
            <span>Users</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={() => navigate("materials")}>
            <i className="fas fa-fw fa-table"></i>
            <span>Materials</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={() => navigate("plan")}>
            <i className="fas fa-fw fa-table"></i>
            <span>Plan</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={() => navigate("agreement")}>
            <i className="fas fa-fw fa-table"></i>
            <span>Agreement</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={() => navigate("Quotation")}>
            <i className="fas fa-fw fa-table"></i>
            <span>Quotation</span>
          </a>
        </li>
        <hr className="sidebar-divider d-none d-md-block" />
      </ul>
    </div>
  );
}

export default SideBar;
