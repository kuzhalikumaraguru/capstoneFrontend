import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  Modal,
  Table,
} from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import * as Yup from "yup";
import { toast } from "react-toastify";
import AxiosService from "../../Routes/AxiosService";
import ApiRoutes from "../../Routes/ApiRoutes";
import MyVerticallyCenteredModal from "../../utils/modal.jsx";

function PlanDetails() {
  const [setEdit, setEditToggle] = useState(false);
  const [planImage, setSelectedImage] = useState(null);
  const [planId, setId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [plans, setPlans] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const handleShowModal = () => setShowModal(true);
  let modalData = {
    heading: "Are you sure want to delete the selected plan ?",
    button: ["Yes", "No"],
    handleConfirm: async (value) => {
      setModalShow(false);
      if (value === "Yes") {
        let res = await AxiosService.delete(
          `${ApiRoutes.DELETE_PLAN.path}/${planId}`,
          {
            authenticate: ApiRoutes.DELETE_PLAN.authenticate,
          }
        );
        if (res.status === 200) {
          toast.success(res.data.message);
          getAllPlans();
        }
      }
    },
  };
  const handleClose = () => {
    setEditToggle(false);
    setShowModal(false);
    formik.resetForm();
    setSelectedImage(null);
  };
  let formik = useFormik({
    initialValues: {
      planImageName: "",
      planDesc: "",
      planImage: null,
    },
    validationSchema: Yup.object({
      planImageName: Yup.string().required("Image Name is required"),
      planDesc: Yup.string().required("Image Description is required"),
      planImage: Yup.mixed().required("Image is required"),
    }),
    onSubmit: async (values) => {
      try {
        let res;
        if (setEdit) {
          res = await AxiosService.put(
            `${ApiRoutes.EDIT_PLAN.path}/${planId}`,
            values,
            { authenticate: ApiRoutes.EDIT_PLAN.authenticate }
          );
        } else {
          res = await AxiosService.post(
            `${ApiRoutes.CREATE_PLAN.path}`,
            values,
            { authenticate: ApiRoutes.CREATE_PLAN.authenticate }
          );
        }

        if (res.status === 201) {
          toast.success(
            `${planId ? "Updated Successfully" : "Added Successfully"}`
          );
          handleClose();
          getAllPlans();
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  const getAllPlans = async () => {
    try {
      let res = await AxiosService.get(`${ApiRoutes.GET_PLAN.path}`, {
        authenticate: ApiRoutes.GET_PLAN.authenticate,
      });
      if (res.status === 200) {
        setPlans(res.data.plans);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const isImageFile =
        acceptedFiles.length > 0 && acceptedFiles[0].type.startsWith("image/");
      if (!isImageFile) {
        toast.error(
          `${acceptedFiles[0].name} is INVALID FILE FORMAT. Please upload an image`
        );
        return;
      }
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
        formik.setFieldValue("planImage", reader.result);
      };
      reader.readAsDataURL(file);
    },
  });
  const handleEdit = async (id) => {
    setEditToggle(true);
    setId(id);
    handleShowModal();
    try {
      let res = await AxiosService.get(`${ApiRoutes.EDIT_PLAN.path}/${id}`, {
        authenticate: ApiRoutes.EDIT_PLAN.authenticate,
      });
      if (res.status === 200) {
        setSelectedImage(res.data.plan.planImage);
        formik.setValues(res.data.plan);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPlans();
  }, []);
  return (
    <Container>
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center py-3">
            <h2>Plan Details</h2>
            <Button variant="primary" onClick={handleShowModal}>
              Upload Plan
            </Button>
          </div>
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Upload Plan Image</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group>
                  <Form.Label>Image Name</Form.Label>
                  <Form.Control
                    type="text"
                    id="planImageName"
                    name="planImageName"
                    placeholder="Enter image name"
                    value={formik.values.planImageName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.planImageName &&
                  formik.errors.planImageName ? (
                    <div style={{ color: "red" }}>
                      {formik.errors.planImageName}
                    </div>
                  ) : null}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Image Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    id="planDesc"
                    name="planDesc"
                    placeholder="Enter image description"
                    value={formik.values.planDesc}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.planDesc && formik.errors.planDesc ? (
                    <div style={{ color: "red" }}>{formik.errors.planDesc}</div>
                  ) : null}
                </Form.Group>
                <Form.Group>
                  <Form.Label>Image Upload</Form.Label>
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    &nbsp;
                    <span className="uploadButton">
                      {planImage
                        ? "Change Image"
                        : "Drag & drop an image here or click to select image"}
                    </span>
                    <br></br> &nbsp;
                  </div>
                  {planImage && (
                    <div>
                      <h4>Preview:</h4>
                      <Image src={planImage} alt="Uploaded Image" fluid />
                    </div>
                  )}
                  {formik.touched.planImage && formik.errors.planImage ? (
                    <div style={{ color: "red" }}>
                      {formik.errors.planImage}
                    </div>
                  ) : null}
                </Form.Group>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    {setEdit ? "Update Changes" : "Save Changes"}
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>SL.NO</th>
                <th>Plan Image</th>
                <th>Image Name</th>
                <th>Image Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((e, i) => {
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td>
                      <Image
                        style={{
                          height: "50px",
                          width: "50px",
                          borderRadius: "50%",
                        }}
                        src={e.planImage}
                        alt="Uploaded Image"
                        fluid
                      />
                    </td>
                    <td>{e.planImageName}</td>
                    <td>{e.planDesc}</td>
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
                          setId(e._id);
                          setModalShow(true);
                        }}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <MyVerticallyCenteredModal
            show={modalShow}
            data={modalData}
            handleclose={() => setModalShow(false)}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default PlanDetails;
