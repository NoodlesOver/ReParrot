import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import organizationService from "./../../services/organizationService";
import debug from "sabio-debug";
import Logo from "../../assets/images/png/reparrot_logo.png";
import Swal from "sweetalert2";
import Loki from "react-loki";
import OrganizationConfirmation from "./OrganizationConfirmation";
import OrganizationLocationForm from "./OrganizationLocationForm";
import OrganizationRegisterForm from "./OrganizationRegisterForm";
import OrgLogoForm from "./OrgLogoForm";
import "./organization.css";

const _logger = debug.extend("Organization");

const Organization = () => {
  const navigate = useNavigate();
  const orgTypeForProfitBusiness = 8;
  const locationTypeBusiness = 2;
  const defaultLocationId = 1;
  const [fullFormData, setFullFormData] = useState({
    organizationTypeId: orgTypeForProfitBusiness,
    name: "",
    description: "",
    logoUrl: "",
    businessPhone: "",
    locationTypeId: locationTypeBusiness,
    primaryLocationId: defaultLocationId,
    siteUrl: "",
    lineOne: "",
    lineTwo: "",
    state: "",
    city: "",
    zip: "",
    latitude: 0,
    longitude: 0,
  });

  const mergeValues = values => {
    setFullFormData(prevState => {
      return { ...prevState, ...values };
    });
  };

  const handleSubmit = data => {
    organizationService
      .createOrganization(data)
      .then(onRegisterSuccess)
      .catch(onRegisterError);
    _logger("you've hit this point and this is your data", data);
  };

  const onRegisterSuccess = () => {
    Swal.fire("Registration Successful!", "Awesome", "success").then(() => {
      navigate("/organizations");
    });
  };

  const onRegisterError = error => {
    Swal.fire("Internal Server Error", "Failure", "error");
    _logger(error);
  };

  const organizationFormSteps = [
    {
      component: <OrganizationRegisterForm data={fullFormData} />,
    },
    {
      component: <OrgLogoForm data={fullFormData} />,
    },
    {
      component: <OrganizationLocationForm data={fullFormData} />,
    },
    {
      component: (
        <OrganizationConfirmation
          data={fullFormData}
          finishHandler={handleSubmit}
        />
      ),
    },
  ];

  return (
    <Fragment>
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={5} md={5} className="py-8 py-xl-0">
          <Card>
            <Card.Body className="p-6">
              <div className="mb-4">
                <img src={Logo} className="container-fluid mb-4" alt="" />
                <h1 className="mb-1 fw-bold">Register your organization</h1>
              </div>
              <Loki
                steps={organizationFormSteps}
                renderSteps={() => false}
                onNext={mergeValues}
                onBack={mergeValues}
                onFinish={handleSubmit}
                noActions
              />
              <hr className="my-4" />
              <div className="mt-4 text-center">
                <Link
                  to="#"
                  className="btn-social btn-social-outline btn-facebook"
                >
                  <i className="fab fa-facebook"></i>
                </Link>{" "}
                <Link
                  to="#"
                  className="btn-social btn-social-outline btn-twitter"
                >
                  <i className="fab fa-twitter"></i>
                </Link>{" "}
                <Link
                  to="#"
                  className="btn-social btn-social-outline btn-linkedin"
                >
                  <i className="fab fa-linkedin"></i>
                </Link>{" "}
                <Link
                  to="#"
                  className="btn-social btn-social-outline btn-github"
                >
                  <i className="fab fa-github"></i>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Organization;
