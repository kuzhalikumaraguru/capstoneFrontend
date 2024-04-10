import React, { useEffect, useState } from "react";
import BarChart from "../utils/barChart.jsx";
import AxiosService from "../Routes/AxiosService.jsx";
import ApiRoutes from "../Routes/ApiRoutes.jsx";
import { useSearchParams } from "react-router-dom";
import PieChart from "../utils/pieChart.jsx";

function Dashboard() {
  let [data, setData] = useState([]);
  let [users, setUsers] = useState([]);

  const getAllProjects = async () => {
    try {
      let res = await AxiosService.get(`${ApiRoutes.GET_ALL_PROJECT.path}`, {
        authenticate: ApiRoutes.GET_ALL_PROJECT.authenticate,
      });
      if (res.status === 200) {
        setData(res.data.projects);
        console.log(data);
      }
    } catch (error) {}
  };
  const getAllUsers = async () => {
    try {
      let res = await AxiosService.get(`${ApiRoutes.GET_ALL_USER.path}`, {
        authenticate: ApiRoutes.GET_ALL_USER.authenticate,
      });
      if (res.status === 200) {
        setUsers(res.data.users);
        console.log(users);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getAllProjects();
    getAllUsers();
  }, []);
  return (
    <div className="d-flex column-gap-5">
      <div>
        <BarChart projects={data} />
      </div>
      <div>
        <PieChart users={users} />
      </div>
    </div>
  );
}

export default Dashboard;
