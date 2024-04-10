import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import * as Yup from "yup";
import AxiosService from "../../Routes/AxiosService.jsx";
import ApiRoutes from "../../Routes/ApiRoutes";
import { PDFViewer } from "@react-pdf/renderer";

function QuotationDetails() {
  const [pdfUrl, setPdfUrl] = useState(null);
  let formik = useFormik({
    initialValues: {
      landArea: "",
      builtUpAreaGF: "",
      builtUpAreaFF: "",
      septicTank: "",
      sump: "",
      compoundWall: "",
    },
    validationSchema: Yup.object({
      landArea: Yup.string()
        .matches(/^\d{1,5}$/, "Land Area must be up to 5 digits")
        .required("Land Area is required"),
      builtUpAreaGF: Yup.string()
        .test(
          "lessThanLandAreaGF",
          "Built Up Area GF must be less than or equal to Land Area minus 10 sq.ft",
          function (value) {
            const landArea = this.parent.landArea - 10;
            return parseFloat(value) <= parseFloat(landArea);
          }
        )
        .required("Built Up Area GF is required"),
      builtUpAreaFF: Yup.string()
        .test(
          "lessThanLandAreaFF",
          "Built Up Area FF must be less than or equal to Land Area minus 10 sq.ft",
          function (value) {
            const landArea = this.parent.landArea - 10;
            return parseFloat(value) <= parseFloat(landArea);
          }
        )
        .required("Built Up Area FF is required"),
      septicTank: Yup.string().matches(/^\d{1,5}$/, "Must be up to 5 digits"),
      sump: Yup.string().matches(/^\d{1,5}$/, "Must be up to 5 digits"),
      compoundWall: Yup.string().matches(/^\d{1,3}$/, "Must be up to 3 digits"),
    }),
    onSubmit: async (values) => {
      try {
        let res = await AxiosService.post(
          `${ApiRoutes.GET_QUOT_PDF.path}`,
          values,
          {
            authenticate: ApiRoutes.GET_QUOT_PDF.authenticate,
            responseType: "arraybuffer",
          }
        );
        if (res.status === 201) {
          const pdfBlob = new Blob([res.data], {
            type: "application/pdf",
          });
          const pdfurl = URL.createObjectURL(pdfBlob);
          setPdfUrl(pdfurl);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  console.log("PDF Content:", pdfUrl);
  return (
    <>
      <div>
        <div className="d-flex justify-content-between align-items-center py-3">
          <h2>Quotation Details</h2>
        </div>
        <p>Please fill the details to get your quotation details</p>
        <br></br>
        <Form onSubmit={formik.handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Land Area in SQ.FT</Form.Label>
              <Form.Control
                type="number"
                id="landArea"
                name="landArea"
                onChange={formik.handleChange}
                value={formik.values.landArea}
                onBlur={formik.handleBlur}
              />
              {formik.touched.landArea && formik.errors.landArea ? (
                <div style={{ color: "red" }}>{formik.errors.landArea}</div>
              ) : null}
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>GF Built Up Area in SQ.FT</Form.Label>
              <Form.Control
                type="number"
                id="builtUpAreaGF"
                name="builtUpAreaGF"
                onChange={formik.handleChange}
                value={formik.values.builtUpAreaGF}
                onBlur={formik.handleBlur}
              />
              {formik.touched.builtUpAreaGF && formik.errors.builtUpAreaGF ? (
                <div style={{ color: "red" }}>
                  {formik.errors.builtUpAreaGF}
                </div>
              ) : null}
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>FF Built Up Area in SQ.FT</Form.Label>
              <Form.Control
                type="number"
                id="builtUpAreaFF"
                name="builtUpAreaFF"
                onChange={formik.handleChange}
                value={formik.values.builtUpAreaFF}
                onBlur={formik.handleBlur}
              />
              {formik.touched.builtUpAreaFF && formik.errors.builtUpAreaFF ? (
                <div style={{ color: "red" }}>
                  {formik.errors.builtUpAreaFF}
                </div>
              ) : null}
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Septic Tank in Litres</Form.Label>
              <Form.Control
                type="number"
                id="septicTank"
                name="septicTank"
                onChange={formik.handleChange}
                value={formik.values.septicTank}
                onBlur={formik.handleBlur}
              />
              {formik.touched.septicTank && formik.errors.septicTank ? (
                <div style={{ color: "red" }}>{formik.errors.septicTank}</div>
              ) : null}
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Sump in Litres</Form.Label>
              <Form.Control
                type="number"
                id="sump"
                name="sump"
                onChange={formik.handleChange}
                value={formik.values.sump}
                onBlur={formik.handleBlur}
              />
              {formik.touched.sump && formik.errors.sump ? (
                <div style={{ color: "red" }}>{formik.errors.sump}</div>
              ) : null}
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Compound Wall in RFT</Form.Label>
              <Form.Control
                type="number"
                id="compoundWall"
                name="compoundWall"
                onChange={formik.handleChange}
                value={formik.values.compoundWall}
                onBlur={formik.handleBlur}
              />
              {formik.touched.compoundWall && formik.errors.compoundWall ? (
                <div style={{ color: "red" }}>{formik.errors.compoundWall}</div>
              ) : null}
            </Form.Group>
          </Row>
          <p>
            NOTE :- EB, Borewell & Motor, Plan Approval, Extra Elevation works
            are separate charges.
          </p>
          <Button type="submit" variant="primary">
            Get Quotation
          </Button>
        </Form>
        <br></br>

        {/* <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <h3 style={{ color: "red" }}>TRIO ENGINEERS</h3>
            <p>
              CONSTRUCTION AND INTERIOR SOLUTIONS<br></br>DEALERS :- &nbsp;
              GRANITE, MARBLE AND EPOXY FLOORING, KAG VITRIFIED TILES, WATER
              PROOFING AND LEAKAGE.
            </p>
            <p>Contact: 9789097404, 9790868697, 9087139987</p>
            <p>
              Email:{" "}
              <b style={{ textDecoration: "underline", color: "blue" }}>
                trioengineers2018@gmail.com
              </b>{" "}
            </p>
          </div>
          <hr></hr>
          <p style={{ textAlign: "end" }}>Date: Current Date</p>
          <h4 style={{ textAlign: "center" }}>Quotation Details</h4>
          <p style={{ textAlign: "center" }}>Total Land Area: 1000sq.ft</p>
          <table
            cellPadding={"15px"}
            style={{
              margin: "auto",
              border: "1px solid black",
              borderCollapse: "collapse",
              width: "60%",
            }}
          >
            <thead style={{ border: "1px solid black" }}>
              <tr style={{ border: "1px solid black" }}>
                <th style={{ border: "1px solid black", width: "2%" }}>NO</th>
                <th style={{ border: "1px solid black", width: "40%" }}>
                  DESCRIPTION
                </th>
                <th style={{ border: "1px solid black", width: "15%" }}>QTY</th>
                <th style={{ border: "1px solid black", width: "15%" }}>
                  RATE
                </th>
                <th style={{ border: "1px solid black", width: "30%" }}>
                  AMOUNT
                </th>
              </tr>
            </thead>
            <tbody style={{ border: "1px solid black" }}>
              <td style={{ border: "1px solid black" }}>1</td>
              <td style={{ border: "1px solid black" }}>something</td>
              <td style={{ border: "1px solid black" }}>1</td>
              <td style={{ border: "1px solid black" }}>1</td>
              <td style={{ border: "1px solid black" }}>1</td>
            </tbody>
          </table>
          <br></br>
          <p style={{ color: "red", textAlign: "center" }}>
            NOTE :- EB, Borewell & Motor, Plan Approval, Extra Elevation works
            are not included, those are separate charges.
          </p>
          <div style={{ textAlign: "center" }}>
            <span>Regards,</span>
            <h5>Trio Engineers</h5>
          </div>
        </div> */}
      </div>
      {pdfUrl && (
        <iframe
          src={pdfUrl}
          title="Agreement PDF"
          width="100%"
          height="500px"
          border="0"
        />
      )}
    </>
  );
}

export default QuotationDetails;
