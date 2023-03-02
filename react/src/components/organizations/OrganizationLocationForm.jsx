import React, { useState } from "react";
import { Row, Button } from "react-bootstrap";
import { Formik, Form } from "formik";
import locationFormSchema from "schemas/locationFormSchema";
import AutoComplete from "../location/AutoComplete";
import debug from "sabio-debug";
import PropTypes from "prop-types";
const _logger = debug.extend("LocationForm");

function OrganizationLocationForm(props) {
  const { isSubmitting, backLabel, nextLabel, onBack, onNext, isLokiComplete } =
    props;
  const [locationFormData, setLocationFormData] = useState({
    lineOne: "",
    lineTwo: "",
    city: "",
    state: "",
    zip: "",
    latitude: 0.0,
    longitude: 0.0,
  });

  const handleUpload = () => {
    _logger(locationFormData);
    onNext({
      lineOne: locationFormData.lineOne,
      lineTwo: locationFormData.lineTwo,
      city: locationFormData.city,
      zip: locationFormData.zip,
      latitude: locationFormData.latitude,
      longitude: locationFormData.longitude,
      state: locationFormData.state,
    });
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={locationFormData}
      validationSchema={locationFormSchema}
    >
      <div className="container">
        <div id="form">
          <Form>
            <Row>
              <AutoComplete setLocationFormData={setLocationFormData} />
            </Row>
            <div className="button-group lokiBtn">
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={onBack}
                disabled={isSubmitting || isLokiComplete}
              >
                {backLabel}
              </button>
              <Button
                className="btn btn-sm btn-primary mx-2"
                disabled={isSubmitting}
                onClick={handleUpload}
              >
                {nextLabel}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Formik>
  );
}

OrganizationLocationForm.propTypes = {
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
    city: PropTypes.string.isRequired,
    zip: PropTypes.string.isRequired,
  }).isRequired,
  values: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    businessPhone: PropTypes.string,
    siteUrl: PropTypes.string,
  }).isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  backLabel: PropTypes.string.isRequired,
  nextLabel: PropTypes.string.isRequired,
  onFinish: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  isLokiComplete: PropTypes.bool.isRequired,
};

export default OrganizationLocationForm;
