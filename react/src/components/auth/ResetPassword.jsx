import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import newPasswordSchema from "../../schemas/newPasswordSchema";
import { Row, Col, Card, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/brand/logo/geeks-ui.svg";
import debug from "sabio-debug";
import userService from "services/userService";
import Swal from "sweetalert2";

const _logger = debug.extend("newPassword"); //sabio:newPassword

function NewPassword() {
	const navigate = useNavigate();
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const { id } = useParams();
	const newPasswordData = {
		password: "",
		confirmPassword: "",
		token: params.get("token"),
	};

	function handleSubmit(values) {
		userService
			.resetPassword(id, values)
			.then(onPasswordUpdateSuccess)
			.catch(onPasswordUpdateError);
	}

	const onPasswordUpdateSuccess = () => {
		Swal.fire(
			"Success!",
			"Password updated, try logging in now!",
			"success"
		).then(function () {
			navigate("/login");
		});
	};

	const onPasswordUpdateError = error => {
		_logger("update failed ----->", error);
		if (error.response.status === 403) {
			Swal.fire("403", "Forbidden", "error").then(goHome);
		} else {
			Swal.fire(
				"Oops, you shouldn't be here",
				"Sorry about that",
				"error"
			).then(goHome);
		}
	};

	function goHome() {
		navigate("/");
	}

	return (
		<React.Fragment>
			<Row className="align-items-center justify-content-center g-0 min-vh-100">
				<Col lg={5} md={5} className="py-8 py-xl-0">
					<Card>
						<Card.Body>
							<div className="mb-4">
								<Link to="/">
									<Image src={Logo} className="mb-4" alt="geeks" />
								</Link>
								<h1 className="mb-1 fw-bold">Reset Password</h1>
							</div>
							<Formik
								enableReinitialize={true}
								initialValues={newPasswordData}
								onSubmit={handleSubmit}
								validationSchema={newPasswordSchema}
							>
								<Form>
									<Row>
										<Col lg={12} md={12} className="mb-3">
											<label htmlFor="password">New Password</label>
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
											<label htmlFor="confirmPassword">
												Confirm New Password
											</label>
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
									</Row>
									<Col lg={12} md={12} className="mb-0 d-grid gap-2">
										<Button variant="primary" type="submit">
											Reset Password
										</Button>
									</Col>
									<hr className="my-4" />
									<div className="mt-4 text-center">
										<Link
											to="#"
											className="btn-social btn-social-outline btn-facebook"
										>
											<i className="fab fa-facebook" />
										</Link>{" "}
										<Link
											to="#"
											className="btn-social btn-social-outline btn-twitter"
										>
											<i className="fab fa-twitter" />
										</Link>{" "}
										<Link
											to="#"
											className="btn-social btn-social-outline btn-twitter"
										>
											<i className="fab fa-linkedin" />
										</Link>
										<Link
											to="#"
											className="btn-social btn-social-outline btn-twitter"
										>
											<i className="fab fa-github" />
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

export default NewPassword;
