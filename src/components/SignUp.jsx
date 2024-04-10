import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ApiRoutes from "../Routes/ApiRoutes.jsx";
import AxiosService from "../Routes/AxiosService.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function SignUp() {
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(30, "Not exceed 30 characters")
        .required("Name is Required"),
      email: Yup.string()
        .required("Email is Required")
        .email("Enter a valid email"),
      password: Yup.string()
        .required("Password is Required")
        .min(8, "Password must be at least 8 characters long")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=]).{8,}$/,
          "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
        ),
    }),
    onSubmit: async (values) => {
      try {
        let res = await AxiosService.post(`${ApiRoutes.SIGN_UP.path}`, values, {
          authenticate: ApiRoutes.SIGN_UP.authenticate,
        });
        if (res.status === 201) {
          toast.success(res.data.message);
          navigate("/");
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
  });
  return (
    <div className="container-fluid ps-md-0">
      <div className="row g-0">
        <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
        <div className="col-md-8 col-lg-6">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-md-9 col-lg-8 mx-auto">
                  <h3 className="login-heading mb-4">
                    Hi ! Please sign up to continue
                  </h3>

                  <form onSubmit={formik.handleSubmit}>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        onBlur={formik.handleBlur}
                        placeholder="Enter the username"
                      />
                      <label for="floatingInput">User Name</label>
                      {formik.touched.name && formik.errors.name ? (
                        <div style={{ color: "red" }}>{formik.errors.name}</div>
                      ) : null}
                    </div>
                    <div className="form-floating mb-3">
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
                        <div style={{ color: "red" }}>
                          {formik.errors.email}
                        </div>
                      ) : null}
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        placeholder="Password"
                      />
                      <label for="floatingPassword">Password</label>
                      {formik.touched.password && formik.errors.password ? (
                        <div style={{ color: "red" }}>
                          {formik.errors.password}
                        </div>
                      ) : null}
                    </div>
                    <div className="d-grid">
                      <button
                        className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                        type="submit"
                      >
                        Sign Up
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
