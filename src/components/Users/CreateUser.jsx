import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import AxiosService from "../../Routes/AxiosService";
import ApiRoutes from "../../Routes/ApiRoutes";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

function CreateUser() {
  let navigate = useNavigate();
  let location = useLocation();
  let [showPassword, setShowPassword] = useState(false);
  let id = location.pathname.split("/")[4];
  const createValues = {
    name: "",
    email: "",
    password: "",
    userType: 1,
    status: 1,
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  }
  const [editValues, setValues] = useState(createValues);
  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, []);
  let fetchData = async (id) => {
    try {
      let res = await AxiosService.get(`${ApiRoutes.EDIT_USER.path}/${id}`, {
        authenticate: `${ApiRoutes.authenticate}`,
      });
      if (res.status === 200) {
        setValues(res.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };
  let formik = useFormik({
    initialValues: id ? editValues : createValues,
    validationSchema: Yup.object({
      name: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is Required")
        .min(8, "Password must be at least 8 characters long")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=]).{8,}$/,
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
        ),
      userType: Yup.number().required("User type is required"),
      status: Yup.number().required("Status is required"),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Invalid contact number")
        .required("Contact number is required")
        .max(10, "Contact number must be at most 10 digits"),
      address: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      zip: Yup.string()
        .matches(/^\d{6}$/, "Invalid zip code")
        .required("Zip code is required"),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        console.log(values);
        let res;
        if (id) {
          res = await AxiosService.put(
            `${ApiRoutes.EDIT_USER.path}/${id}`,
            values,
            {
              authenticate: ApiRoutes.EDIT_USER.authenticate,
            }
          );
        } else {
          res = await AxiosService.post(
            `${ApiRoutes.CREATE_USER.path}`,
            values,
            {
              authenticate: ApiRoutes.CREATE_USER.authenticate,
            }
          );
        }
        if (res.status === 201) {
          toast.success(res.data.message);
          navigate("/main/users");
        }
      } catch (error) {}
    },
  });
  return (
    <>
      <div>
        <h3>{id ? 'Edit User' : 'Create User'}</h3>
      </div>
      <div>
        <Form onSubmit={formik.handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                id="name"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? (
                <div style={{ color: "red" }}>{formik.errors.name}</div>
              ) : null}
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: "red" }}>{formik.errors.email}</div>
              ) : null}
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Password</Form.Label>
              <div className="password-input">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                />
                <div
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {!showPassword ? (
                    <i className="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i className="fa-solid fa-eye"></i>
                  )}
                </div>
              </div>

              {formik.touched.password && formik.errors.password ? (
                <div style={{ color: "red" }}>{formik.errors.password}</div>
              ) : null}
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>User Type</Form.Label>
              <Form.Select
                id="userType"
                name="userType"
                onChange={formik.handleChange}
                value={formik.values.userType}
                onBlur={formik.handleBlur}
              >
                <option value="1">Super Admin</option>
                <option value="2">Admin</option>
                <option value="3">Manager</option>
                <option value="4">Site Engineer</option>
                <option value="5">Client</option>
                <option value="6">Labour</option>
              </Form.Select>
              {formik.touched.userType && formik.errors.userType ? (
                <div style={{ color: "red" }}>{formik.errors.userType}</div>
              ) : null}
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Status</Form.Label>
              <Form.Select
                id="status"
                name="status"
                onChange={formik.handleChange}
                value={formik.values.status}
                onBlur={formik.handleBlur}
              >
                <option value="1">Active</option>
                <option value="2">In-Active</option>
              </Form.Select>
              {formik.touched.status && formik.errors.status ? (
                <div style={{ color: "red" }}>{formik.errors.status}</div>
              ) : null}
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
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
          </Row>
          <Row className="mb-3">
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
                type="text"
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
            <Form.Group as={Col}>
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                id="phone"
                name="phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
                onBlur={formik.handleBlur}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div style={{ color: "red" }}>{formik.errors.phone}</div>
              ) : null}
            </Form.Group>
          </Row>

          <Button variant="primary" type="submit">
            {id ? 'Update' : 'Submit'}
          </Button>
        </Form>
      </div>
    </>
  );
}

export default CreateUser;
