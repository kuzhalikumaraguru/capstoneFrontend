import React from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

function UnAuthorized() {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1>402 - Unauthorized Access</h1>
          <p>
          You are not authorized to access this page.
          </p>
          <Link to="/">
            <Button variant="primary">Go to sign-in Page</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default UnAuthorized;
