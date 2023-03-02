import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Card, Image, Button } from "react-bootstrap";
import Logo from "../../assets/images/brand/logo/geeks-ui.svg";
import debug from "sabio-debug";
import { Formik, Form, Field, ErrorMessage } from "formik";
import registrationSchema from "schemas/registrationSchema";
import userService from "services/userService";
import Swal from "sweetalert2";

const _logger = debug.extend("registerPage"); //sabio:registerPage

function Register() {
	const navigate = useNavigate();
	const userRegisterData = {
		email: "",
		firstName: "",
		lastName: "",
		mi: "",
		avatarUrl: "",
		password: "",
		confirmPassword: "",
		statusTypeId: 1,
	};

	const handleSubmit = values => {
		_logger(values);
		userService.add(values).then(onUserAddSuccess).catch(onUserAddError);
	};

	const onUserAddSuccess = () => {
		Swal.fire(
			"Success!",
			"Now check your email to confirm registration",
			"success"
		).then(function () {
			navigate("/login");
		});
	};

	const onUserAddError = error => {
		_logger(error.response.status);
		if (error.response.status === 500) {
			Swal.fire("Register failed", "Email already exists", "error");
		} else {
			Swal.fire("Register Failed", "Something went wrong", "error");
		}
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
								<h1 className="mb-1 fw-bold">Sign up!</h1>
								<span>
									Already have an account?{" "}
									<Link to="/login" className="ms-1">
										Sign in
									</Link>
								</span>
							</div>
							<Formik
								enableReinitialize={true}
								initialValues={userRegisterData}
								onSubmit={handleSubmit}
								validationSchema={registrationSchema}
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
											<label htmlFor="firstName">First Name</label>
											<Field
												type="text"
												name="firstName"
												className="form-control"
											/>
											<ErrorMessage
												name="firstName"
												component="div"
												className="form-has-error"
											/>
										</Col>
										<Col lg={12} md={12} className="mb-3">
											<label htmlFor="lastName">Last Name</label>
											<Field
												type="text"
												name="lastName"
												className="form-control"
											/>
											<ErrorMessage
												name="lastName"
												component="div"
												className="form-has-error"
											/>
										</Col>
										<Col lg={12} md={12} className="mb-3">
											<label htmlFor="mi">MI</label>
											<Field type="text" name="mi" className="form-control" />
											<ErrorMessage
												name="mi"
												component="div"
												className="form-has-error"
											/>
										</Col>
										<Col lg={12} md={12} className="mb-3">
											<label htmlFor="avatarUrl">Avatar Url</label>
											<Field
												type="text"
												name="avatarUrl"
												className="form-control"
											/>
											<ErrorMessage
												name="mavatarUrli"
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
										<Col lg={12} md={12} className="mb-3">
											<label htmlFor="confirmPassword">Confirm Password</label>
											<Field
												type="password"
												name="confirmPassword"
												className="form-control"
											/>
											<ErrorMessage
												name="confirmPassword"
												component="div"
												className="form-has-error"
											/>
										</Col>
										<Col lg={12} md={12} className="mb-0 d-grid gap-2">
											<Button variant="primary" type="submit">
												Sign Up
											</Button>
										</Col>
									</Row>

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

export default Register;
