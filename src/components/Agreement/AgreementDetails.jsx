import React, { useState } from "react";
import { Button } from "react-bootstrap";
import AxiosService from "../../Routes/AxiosService";
import ApiRoutes from "../../Routes/ApiRoutes";
// import DocViewer from "react-doc-viewer";
import { Document, Page } from "react-pdf";

function AgreementDetails() {
  //   const [docUrl, setDocUrl] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfUrl, setPdfUrl] = useState(null);
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  const handleDownload = async () => {
    try {
      let res = await AxiosService.get(`${ApiRoutes.DOWNLOAD_AGG_DOC.path}`, {
        authenticate: ApiRoutes.DOWNLOAD_AGG_DOC.authenticate,
        responseType: "arraybuffer",
      });
      if (res.status === 200) {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        // const pdfUrl = URL.createObjectURL(pdfBlob);
        const reader = new FileReader();
        reader.onload = () => {
          setPdfUrl(reader.result);
        };
        reader.readAsDataURL(pdfBlob);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center py-3">
        <h2>Agreement Details</h2>
        <p style={{ color: "green", textAlign: "center", marginBottom: "0px" }}>
          Click download button to view the agreement details
        </p>
        <Button
          variant="primary"
          onClick={() => {
            handleDownload();
          }}
        >
          Download
        </Button>
      </div>
      {/* <div> {docUrl ? <DocViewer documents={[{ uri: docUrl }]} /> : <></>}</div> */}
      {/* {pdfUrl}
      {pdfUrl && (
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      )} */}
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

export default AgreementDetails;
