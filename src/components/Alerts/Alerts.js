import React, { useEffect } from "react";
import { Container, Alert, Row, Col } from "reactstrap";
import { useDispatch } from "react-redux";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { removeAlert } from "../../state/AlertSlice";
import "./scss/Alerts.scss";

const Alerts = ({ alerts, closeAlert }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    alerts.forEach((alert, i) => {
      setTimeout(() => {
        dispatch(removeAlert(alert));
      }, 3000 + 300 * i);
    });
  }, [alerts]);

  return (
    <Container fluid id="alerts-container" className="position-absolute">
      <Row className="g-0 mt-3">
        {alerts.map((alert) => (
          <Col xs={12} lg={{ size: 4, offset: 4 }}>
            <Alert color={alert.alertType}>
              <Row className="g-0">
                <Col xs={10}>
                  <h4 className="h4">{alert.text}</h4>
                </Col>
                <Col
                  xs={2}
                  className="
                    d-flex
                    justify-content-end
                    align-items-center
                    lead
                    "
                >
                  <AiOutlineCloseCircle
                    onClick={() => {
                      dispatch(removeAlert(alert));
                    }}
                  />
                </Col>
              </Row>
            </Alert>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Alerts;
