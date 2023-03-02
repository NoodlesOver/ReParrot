import React from "react";
import { Image, Button, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

function OrganizationConfirmation(props) {
  const { onBack, isSubmitting, backLabel, isLokiCompletek } = props;

  const handleFinish = () => {
    props.finishHandler(props.data);
  };
  return (
    <React.Fragment>
      <h5>Verify information below is correct before clicking finish.</h5>
      <Row>
        <Col>
          <label className="mb-1">
            <h4>Logo:</h4>
          </label>
          <div className="mb-3">
            {<Image src={props.data.logoUrl} width="100px" />}
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <label>
            <h5>Organization name:</h5>
          </label>
          <p className="mx-2 border-bottom">{props.data.name}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <label>
            <h5>Description:</h5>
          </label>
          <p className="mx-2 border-bottom">{props.data.description}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <label>
            <h5>Phone Number:</h5>
          </label>
          <p className="mx-2 border-bottom">{props.data.businessPhone}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <label>
            <h5>Website:</h5>
          </label>
          <p className="mx-2 border-bottom">{props.data.siteUrl}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <label>
            <h5>Address Line One:</h5>
          </label>
          <p className="mx-2 border-bottom">{props.data.lineOne}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <label>
            <h5>Address Line Two:</h5>
          </label>
          <p className="mx-2 border-bottom">{props.data.lineTwo}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <label>
            <h5>City:</h5>
          </label>
          <p className="mx-2 border-bottom">{props.data.city}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <label>
            <h5>State:</h5>
          </label>
          <p className="mx-2 border-bottom">{props.data.state}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <label>
            <h5>ZipCode:</h5>
          </label>
          <p className="mx-2 border-bottom">{props.data.zip}</p>
        </Col>
      </Row>
      <div className="button-group">
        <button
          type="button"
          className="btn btn-sm btn-secondary"
          onClick={onBack}
          disabled={isSubmitting || isLokiCompletek}
        >
          {backLabel}
        </button>
        <Button className="btn btn-sm btn-primary mx-2" onClick={handleFinish}>
          Finish
        </Button>
      </div>
    </React.Fragment>
  );
}

OrganizationConfirmation.propTypes = {
  data: PropTypes.shape({
    organizationTypeId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    logoUrl: PropTypes.string.isRequired,
    businessPhone: PropTypes.string.isRequired,
    primaryLocationId: PropTypes.number.isRequired,
    siteUrl: PropTypes.string.isRequired,
    lineOne: PropTypes.string.isRequired,
    lineTwo: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
  onBack: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
  backLabel: PropTypes.string.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  isLokiCompletek: PropTypes.bool.isRequired,
  finishHandler: PropTypes.func.isRequired,
};

export default OrganizationConfirmation;
