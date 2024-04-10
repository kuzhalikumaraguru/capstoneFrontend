import AxiosService from "../../Routes/AxiosService.jsx";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import * as Yup from "yup";
import ApiRoutes from "../../Routes/ApiRoutes.jsx";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

function CreateProject() {
  const createValues = {
    projectName: "",
    projectType: 1,
    clientName: "",
    projectStatus: 1,
    projectTimeline: 1,
    projectBudget: "",
    projectArea: "",
    buildUpArea: "",
    buildUpType: 1,
    category: 1,
    address: "",
    city: "",
    state: "",
    zip: "",
  };
  let navigate = useNavigate();
  let location = useLocation();
  let id = location.pathname.split("/")[4];
  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, []);
  let fetchData = async (id) => {
    try {
      let res = await AxiosService.get(`${ApiRoutes.EDIT_PROJECT.path}/${id}`, {
        authenticate: `${ApiRoutes.authenticate}`,
      });
      if (res.status === 200) {
        // console.log(res.data.project);
        setValues({
          ...createValues,
          projectName: res.data.project.projectName,
          projectType: res.data.project.projectType,
          clientName: res.data.project.clientName,
          projectStatus: res.data.project.projectStatus,
          projectTimeline: res.data.project.projectTimeline,
          projectBudget: res.data.project.projectBudget,
          projectArea: res.data.project.projectArea,
          buildUpArea: res.data.project.buildUpArea,
          buildUpType: res.data.project.buildUpType,
          category: res.data.project.category,
          address: res.data.project.address,
          city: res.data.project.city,
          state: res.data.project.state,
          zip: res.data.project.zip,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [editValues, setValues] = useState(createValues);
  let formik = useFormik({
    initialValues:  id ? editValues : createValues,
    validationSchema: Yup.object({
      projectName: Yup.string().required("Project Name is required"),
      projectType: Yup.string().required("Project Type is required"),
      clientName: Yup.string().required("Client Name is required"),
      projectStatus: Yup.string().required("Project Status is required"),
      projectTimeline: Yup.string().required("Project Timeline is required"),
      projectBudget: Yup.string().required("Project Budget is required"),
      projectArea: Yup.string().required("Project Area is required"),
      buildUpArea: Yup.string().required("Build Up Area is required"),
      buildUpType: Yup.string().required("Build Up Type is required"),
      category: Yup.string().required("Category is required"),
      address: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      zip: Yup.number().required("Zip is required").min(6, "Invalid Pincode"),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        let res;
        if (id) {
           res = await AxiosService.put(
            `${ApiRoutes.EDIT_PROJECT.path}/${id}`,
            values,
            {
              authenticate: ApiRoutes.EDIT_PROJECT.authenticate,
            }
          );
        } else {
           res = await AxiosService.post(
            `${ApiRoutes.CREATE_PROJECT.path}`,
            values,
            {
              authenticate: ApiRoutes.CREATE_PROJECT.authenticate,
            }
          );
        }
        if (res.status === 200) {
          toast.success(res.data.message);
          navigate("/main/projects");
        }
      } catch (error) {}
    },
  });

  return (
    <>
      <div>
        <h3>{id ? "Edit Project" : "Create Project"}</h3>
      </div>
      <div>
        <Form onSubmit={formik.handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Project Name</Form.Label>
              <Form.Control
                type="text"
                id="projectName"
                name="projectName"
                onChange={formik.handleChange}
                value={formik.values.projectName}
                onBlur={formik.handleBlur}
              />
              {formik.touched.projectName && formik.errors.projectName ? (
                <div style={{ color: "red" }}>{formik.errors.projectName}</div>
              ) : null}
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Project Type</Form.Label>
              <Form.Select
                id="projectType"
                name="projectType"
                onChange={formik.handleChange}
                value={formik.values.projectType}
                onBlur={formik.handleBlur}
              >
                <option value="1">Villa</option>
                <option value="2">Alteration Work</option>
                <option value="3">Interior Work</option>
                <option value="4">Contract for Civil Work</option>
                <option value="5">Shed Work</option>
              </Form.Select>
              {formik.touched.projectType && formik.errors.projectType ? (
                <div style={{ color: "red" }}>{formik.errors.projectType}</div>
              ) : null}
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Client Name</Form.Label>
              <Form.Control
                type="text"
                id="clientName"
                name="clientName"
                onChange={formik.handleChange}
                value={formik.values.clientName}
                onBlur={formik.handleBlur}
              />
              {formik.touched.clientName && formik.errors.clientName ? (
                <div style={{ color: "red" }}>{formik.errors.clientName}</div>
              ) : null}
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Project Status</Form.Label>
              <Form.Select
                id="projectStatus"
                name="projectStatus"
                onChange={formik.handleChange}
                value={formik.values.projectStatus}
                onBlur={formik.handleBlur}
              >
                <option value="1">Active</option>
                <option value="2">Inactive</option>
              </Form.Select>
              {formik.touched.projectStatus && formik.errors.projectStatus ? (
                <div style={{ color: "red" }}>
                  {formik.errors.projectStatus}
                </div>
              ) : null}
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Project Timeline</Form.Label>
              <Form.Select
                id="projectTimeline"
                name="projectTimeline"
                onChange={formik.handleChange}
                value={formik.values.projectTimeline}
                onBlur={formik.handleBlur}
              >
                <option value="1">Less than 3 Months</option>
                <option value="2">3 Months</option>
                <option value="3">6 Months</option>
                <option value="4">12 Months</option>
              </Form.Select>
              {formik.touched.projectTimeline &&
              formik.errors.projectTimeline ? (
                <div style={{ color: "red" }}>
                  {formik.errors.projectTimeline}
                </div>
              ) : null}
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Project Budget</Form.Label>
              <Form.Control
                type="text"
                id="projectBudget"
                name="projectBudget"
                onChange={formik.handleChange}
                value={formik.values.projectBudget}
                onBlur={formik.handleBlur}
              />
              {formik.touched.projectBudget && formik.errors.projectBudget ? (
                <div style={{ color: "red" }}>
                  {formik.errors.projectBudget}
                </div>
              ) : null}
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Project Area</Form.Label>
              <Form.Control
                type="text"
                id="projectArea"
                name="projectArea"
                onChange={formik.handleChange}
                value={formik.values.projectArea}
                onBlur={formik.handleBlur}
              />
              {formik.touched.projectArea && formik.errors.projectArea ? (
                <div style={{ color: "red" }}>{formik.errors.projectArea}</div>
              ) : null}
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Build Up Area</Form.Label>
              <Form.Control
                type="text"
                id="buildUpArea"
                name="buildUpArea"
                onChange={formik.handleChange}
                value={formik.values.buildUpArea}
                onBlur={formik.handleBlur}
              />
              {formik.touched.buildUpArea && formik.errors.buildUpArea ? (
                <div style={{ color: "red" }}>{formik.errors.buildUpArea}</div>
              ) : null}
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Build Up Type</Form.Label>
              <Form.Select
                id="buildUpType"
                name="buildUpType"
                onChange={formik.handleChange}
                value={formik.values.buildUpType}
                onBlur={formik.handleBlur}
              >
                <option value="1">Individual Villa</option>
                <option value="2">Duplex Villa</option>
                <option value="3">Apartment Villa</option>
              </Form.Select>
              {formik.touched.buildUpType && formik.errors.buildUpType ? (
                <div style={{ color: "red" }}>{formik.errors.buildUpType}</div>
              ) : null}
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Category</Form.Label>
              <Form.Select
                id="category"
                name="category"
                onChange={formik.handleChange}
                value={formik.values.category}
                onBlur={formik.handleBlur}
              >
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
              </Form.Select>
              {formik.touched.category && formik.errors.category ? (
                <div style={{ color: "red" }}>{formik.errors.category}</div>
              ) : null}
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              id="address"
              name="address"
              onChange={formik.handleChange}
              value={formik.values.address}
              onBlur={formik.handleBlur}
            />
            {formik.touched.address && formik.errors.address ? (
              <div style={{ color: "red" }}>{formik.errors.address}</div>
            ) : null}
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                id="city"
                name="city"
                onChange={formik.handleChange}
                value={formik.values.city}
                onBlur={formik.handleBlur}
              />
              {formik.touched.city && formik.errors.city ? (
                <div style={{ color: "red" }}>{formik.errors.city}</div>
              ) : null}
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                id="state"
                name="state"
                onChange={formik.handleChange}
                value={formik.values.state}
                onBlur={formik.handleBlur}
              />
              {formik.touched.state && formik.errors.state ? (
                <div style={{ color: "red" }}>{formik.errors.state}</div>
              ) : null}
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Zip</Form.Label>
              <Form.Control
                type="number"
                id="zip"
                name="zip"
                onChange={formik.handleChange}
                value={formik.values.zip}
                onBlur={formik.handleBlur}
              />
              {formik.touched.zip && formik.errors.zip ? (
                <div style={{ color: "red" }}>{formik.errors.zip}</div>
              ) : null}
            </Form.Group>
          </Row>
          <Button variant="primary" type="submit">
            {id ? "Update" : "Submit"}
          </Button>
        </Form>
      </div>
    </>
  );
}

export default CreateProject;
