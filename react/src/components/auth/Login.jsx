import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import loginSchema from "../../schemas/loginSchema";
import Logo from "../../assets/images/brand/logo/geeks-ui.svg";
import { Link } from "react-router-dom";
import debug from "sabio-debug";
import { Row, Col, Card, Image, Button } from "react-bootstrap";
import userService from "../../services/userService";
import Swal from "sweetalert2";

const _logger = debug.extend("loginPage"); //sabio:loginPage

function Login() {
  let navigate = useNavigate();

  const loginData = { email: "", password: "" };

  const handleSubmit = values => {
    _logger(values);
    userService.login(values).then(onLoginSuccess).catch(onLoginError);
  };

  const onLoginSuccess = () => {
    userService
      .getCurrentUser()
      .then(onGetCurrentUserSuccess)
      .catch(onGetCurrentUserError);
  };

  const onGetCurrentUserSuccess = response => {
    _logger("log in data", response.item);

    Swal.fire("Login Success", "You're in!", "success").then(function () {
      navigate("/");
    });
  };

  const onLoginError = () => {
    Swal.fire(
      "Invalid Email/Password provided",
      "Double check credentials and try again",
      "error"
    );
  };

  const onGetCurrentUserError = () => {
    Swal.fire("Oops", "Something went wrong", "error");
  };

  return (
    <React.Fragment>
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={5} md={5} className="py-8 py-xl-0">
          <Card>
            <Card.Body className="p-6">
              <div className="mb-4">
                <Link to="/">
                  <Image src={Logo} className="mb-4" alt="" />
                </Link>
                <h1 className="mb-1 fw-bold">Sign in!</h1>
                <span>
                  Don{"'"}t have an account?{" "}
                  <Link to="/register" className="ms-1">
                    Sign up!
                  </Link>{" "}
                </span>
              </div>
              <Formik
                enableReinitialize={true}
                initialValues={loginData}
                onSubmit={handleSubmit}
                validationSchema={loginSchema}
              >
                <Form>
                  <Row>
                    <Col lg={12} md={12} className="mb-3">
                      <label htmlFor="email">Email</label>
                      <Field
                        type="email"
                        name="email"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="form-has-error"
                      />
                    </Col>
                    <Col lg={12} md={12} className="mb-3">
                      <label htmlFor="password">Password</label>
                      <Field
                        type="password"
                        name="password"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="form-has-error"
                      />
                    </Col>
                    <Col lg={12} md={12} className="mb-0 d-grid gap-2">
                      <Button variant="primary" type="submit">
                        Sign In
                      </Button>
                    </Col>
                  </Row>
                  <div>
                    Forgot password? <Link to="/lostpassword">Click here!</Link>
                  </div>
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
                </Form>
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default Login;
