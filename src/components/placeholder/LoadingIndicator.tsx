import React from "react";
import { Container, Spinner } from "react-bootstrap";

type Props = {};

const LoadingIndicator = (props: Props) => {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ height: "70vh" }}
    >
      <Spinner animation="grow" variant="primary" />
    </Container>
  );
};

export default LoadingIndicator;
