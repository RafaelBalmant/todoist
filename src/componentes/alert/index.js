import React, { useMemo } from "react";
import { Alert } from "reactstrap";
import { Container } from "./styles";

function AlertComponent({ setError, error, message, type }) {
  useMemo(() => {
    if (error) {
      setTimeout(() => {
        setError({
          ...error,
          status: false,
        });
      }, 5000);
    }
  }, [error]);
  return (
    <Container>
      <Alert color={type} isOpen={error} className="text-center">
        {message}
      </Alert>
    </Container>
  );
}

export default AlertComponent;
