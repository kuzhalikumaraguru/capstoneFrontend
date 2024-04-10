import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import AxiosService from "../Routes/AxiosService";
import ApiRoutes from "../Routes/ApiRoutes";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ForgetPassword() {
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is Required")
        .email("Enter a valid email"),
    }),
    onSubmit: async (values) => {
      try {
        let res = await AxiosService.post(`${ApiRoutes.FOR_PWD.path}`, values, {
          authenticate: ApiRoutes.FOR_PWD.authenticate,
        });
        if (res.status === 201) {
          toast.warning(res.data.message);
          navigate("/");
        }
      } catch (error) {}
    },
  });
  return (
    <>
      <h3 style={{ textAlign: "center" }}>
        Please enter your registered email address to get password reset link
      </h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="m-auto col-md-3 form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            placeholder="name@example.com"
          />
          <label for="floatingInput">Email address</label>
          {formik.touched.email && formik.errors.email ? (
            <div style={{ color: "red" }}>{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="m-auto col-md-1 d-grid">
          <button
            className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default ForgetPassword;
