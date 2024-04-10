import { useFormik } from "formik";
import React from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import AxiosService from "../Routes/AxiosService";
import ApiRoutes from "../Routes/ApiRoutes";
import { toast } from "react-toastify";

function ConfirmPassword() {
  let location = useLocation();
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .required("New password is required")
        .min(8, "Password must be at least 8 characters long")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=]).{8,}$/,
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
        ),
      confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref("newPassword"), null],
          "Password must match with new password"
        )
        .required("Confirm password is required"),
    }),
    onSubmit: async (values) => {
      try {
        let res = await AxiosService.post(
          `${ApiRoutes.SET_NEW_PWD.path}/${location.pathname.split('/')[3]}`,
          values,
          {
            authenticate: `${ApiRoutes.SET_NEW_PWD.authenticate}`,
          }
        );
        if (res.status === 201) {
          toast.success(res.data.message);
          navigate("/");
        }
      } catch (error) {
          toast.error(error.message);
          console.log(error);
      }
    },
  });
  return (
    <>
      <div>
        <h3 className="p-3" style={{ textAlign: "center" }}>
          Welcome! Trio Engineer User!
          <br />
          Please, kindly provide the password to update
        </h3>
      </div>
      <Container style={{ width: "25%" }}>
        <Form onSubmit={formik.handleSubmit}>
          <Row className="mb-3">
            <Form.Group>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                className="form-control"
                id="newPassword"
                name="newPassword"
                onChange={formik.handleChange}
                value={formik.values.newPassword}
                onBlur={formik.handleBlur}
                placeholder="New Password"
              />
              {formik.touched.newPassword && formik.errors.newPassword ? (
                <div style={{ color: "red" }}>{formik.errors.newPassword}</div>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                onBlur={formik.handleBlur}
                placeholder="Confirm Password"
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div style={{ color: "red" }}>
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </Form.Group>
          </Row>
          <div style={{ textAlign: "center" }}>
            <Button
              style={{ textAlign: "center" }}
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default ConfirmPassword;
