import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ApiRoutes from "../Routes/ApiRoutes.jsx";
import AxiosService from "../Routes/AxiosService.jsx";
import { toast } from "react-toastify";

function SignIn() {
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is Required")
        .email("Enter a valid email"),
      password: Yup.string().required("Password is Required"),
    }),
    onSubmit: async (values) => {
      try {
        let res = await AxiosService.post(`${ApiRoutes.SIGN_IN.path}`, values, {
          authenticate: ApiRoutes.SIGN_UP.authenticate,
        });
        if (res.status === 200) {
          toast.success(res.data.message);
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("role", res.data.role);
          sessionStorage.setItem("id", res.data.id);
          navigate("/main/dashboard");
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
                  <h3 className="login-heading mb-4">Welcome back!</h3>

                  <form onSubmit={formik.handleSubmit}>
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
                    </div>

                    {/* <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="rememberPasswordCheck"
                      />
                      <label
                        className="form-check-label"
                        for="rememberPasswordCheck"
                      >
                        Remember password
                      </label>
                    </div> */}
                    <div>
                      <a
                        className="small"
                        onClick={() => navigate("/forgetPassword")}
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="d-grid">
                      <button
                        className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                        type="submit"
                      >
                        Sign in
                      </button>
                      <div className="text-center">
                        <a
                          className="small"
                          onClick={() => navigate("/signUp")}
                        >
                          New User? Sign Up
                        </a>
                      </div>
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

export default SignIn;
