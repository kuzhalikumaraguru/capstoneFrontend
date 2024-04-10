import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Col, Row } from "react-bootstrap";
import AxiosService from "../../Routes/AxiosService";
import ApiRoutes from "../../Routes/ApiRoutes";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

function CreateMaterial() {
  let navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  let location = useLocation();
  const id = location.pathname.split("/")[4];
  const initialMaterials = [
    {
      id: 1,
      name: "Civil Material",
      content:
        "Rod - TMT Rod, Bricks - Machine Cut Brick, M-sand - Double Washed, P-sand and Cement - Dalmia were used in the construction. ",
    },
    {
      id: 2,
      name: "Tiles Material",
      content:
        "Tiles - Kag used in the construction for Wall, Floor, Steps and Water Proofing.",
    },
    {
      id: 3,
      name: "Plumbing Material",
      content:
        "Taps - Fisherman, Pipes - Parryware, Sanitary Wares - Parryware, Washbasin - Parryware, Shower and Healthfaucet were used in the construction.",
    },
    {
      id: 4,
      name: "Electrical Material",
      content:
        "Switches - Livon, Fibros & Kundan, Wires - Orbit, Electrical pipes were used in the construction.",
    },
    {
      id: 5,
      name: "Carpenting Material",
      content:
        "Wood - Main Door (First Quality Teak),Wood - Other Doors (Second Quality Teak), Wood - Toilet Door (PVC),Wood - Windows (Second Quality Teak with Square Polish Rod 10mm and Semi Black Color Glass) were used in the construction.",
    },
    {
      id: 6,
      name: "Others",
      content:
        "Sink - Stainless Steel , Staircase - Mild Steel Hand Rail were used in the construction.",
    },
  ];
  const [materials, setMaterials] = useState(initialMaterials);
  const [materialType, setMaterialType] = useState(1);
  const [packageStatus, setPackageStatus] = useState(1);
  let formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      content: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Material name is required"),
      content: Yup.string().required("Material content is required"),
    }),
    onSubmit: async (values) => {
      console.log(values, "formvalues");
      if (values.id) {
        const updatedMaterials = materials.map((material) =>
          material.id === values.id ? { ...material, ...values } : material
        );
        setMaterials(updatedMaterials);
      } else {
        const newMaterial = {
          id: materials.length + 1,
          name: values.name,
          content: values.content,
        };
        setMaterials([...materials, newMaterial]);
      }
      formik.resetForm();
      setToggle(false);
    },
  });
  const handleAccordionItemClick = (index) => {
    setToggle(true);
    const selectedMaterial = materials[index];
    formik.setValues({
      id: selectedMaterial.id,
      name: selectedMaterial.name,
      content: selectedMaterial.content,
    });
  };

  const handleMaterialTypeChange = (event) => {
    setMaterialType(event.target.value);
  };

  const handlePackageStatusChange = (event) => {
    setPackageStatus(event.target.value);
  };
  const handleSave = async () => {
    try {
      let res;
      let materialData = {
        materialType: materialType,
        packageStatus: packageStatus,
        materialsList: materials,
      };
      if (id) {
        res = await AxiosService.put(
          `${ApiRoutes.EDIT_MATERIAL.path}/${id}`,
          materialData,
          { authenticate: ApiRoutes.EDIT_MATERIAL.authenticate }
        );
      } else {
        res = await AxiosService.post(
          `${ApiRoutes.CREATE_MATERIAL.path}`,
          materialData,
          { authenticate: ApiRoutes.CREATE_MATERIAL.authenticate }
        );
      }
      
      if (res.status == 201) {
        toast.success(res.data.message);
        navigate("/main/materials");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (id) {
      fetchMaterialById();
    }
  }, []);
  const fetchMaterialById = async () => {
    try {
      let res = await AxiosService.get(
        `${ApiRoutes.EDIT_MATERIAL.path}/${id}`,
        { authenticate: ApiRoutes.EDIT_MATERIAL.authenticate }
      );
      if (res.status === 200) {
        setMaterials(res.data.material.materialsList);
        setMaterialType(res.data.material.materialType);
        setPackageStatus(res.data.material.packageStatus);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center py-3">
        <h3>List of Materials</h3>
        <Button variant="success" onClick={() => handleSave()}>
          {id ? "Update Changes" : "Save Changes"} &nbsp;
          <i className="fa-solid fa-right"></i>
        </Button>
      </div>
      <Form>
        <Row className="mb-3" style={{ width: "50%" }}>
          <Form.Group as={Col}>
            <Form.Label>Material Package</Form.Label>
            <Form.Select
              id="materialType"
              name="materialType"
              onChange={handleMaterialTypeChange}
              value={materialType}
            >
              <option value="1">Standard Package</option>
              <option value="2">Premium Package</option>
              <option value="3">Elite Package</option>
              <option value="4">Custom Package</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Material Package Status</Form.Label>
            <Form.Select
              id="packageStatus"
              name="packageStatus"
              onChange={handlePackageStatusChange}
              value={packageStatus}
            >
              <option value="1">Active</option>
              <option value="2">Inactive</option>
            </Form.Select>
          </Form.Group>
        </Row>
      </Form>
      <div style={{ display: "flex", columnGap: "50px" }}>
        <Accordion style={{ width: "50%" }}>
          {materials.map((material, index) => {
            return (
              <>
                <Accordion.Item
                  key={index}
                  eventKey={index.toString()}
                  onClick={() => handleAccordionItemClick(index)}
                >
                  <Accordion.Header>{material.name}</Accordion.Header>
                  <Accordion.Body>{material.content}</Accordion.Body>
                </Accordion.Item>
              </>
            );
          })}
        </Accordion>
        <div style={{ width: "50%" }}>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
              <Form.Label>Material Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter material name"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.touched.name && formik.errors.name ? (
                <div style={{ color: "red" }}>{formik.errors.name}</div>
              ) : null}
            </Form.Group>
            <br></br>
            <Form.Group>
              <Form.Label>Material Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter material content"
                id="content"
                name="content"
                value={formik.values.content}
                onChange={formik.handleChange}
              />
              {formik.touched.content && formik.errors.content ? (
                <div style={{ color: "red" }}>{formik.errors.content}</div>
              ) : null}
            </Form.Group>
            <br></br>
            <div style={{ display: "flex", columnGap: "25px" }}>
              <Button variant="primary" type="submit">
                {toggle ? "Update Material" : "Add Material"}
              </Button>
              {/* {toggle ? (
                <Button variant="danger" onClick={formik.handleChange}>Delete Material</Button>
              ) : (
                <></>
              )} */}
            </div>
          </Form>
        </div>
      </div>
      <br></br>
      <p>
        NOTE: Materials were selected and utilized to ensure the construction
        project maintains high standards of quality, durability, and structural
        integrity.
      </p>
    </>
  );
}

export default CreateMaterial;
