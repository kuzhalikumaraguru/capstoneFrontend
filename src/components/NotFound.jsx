// NotFoundPage.js
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1>404 - Page Not Found</h1>
          <p>
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
          <Link to="/">
            <Button variant="primary">Go to Home Page</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFound;
