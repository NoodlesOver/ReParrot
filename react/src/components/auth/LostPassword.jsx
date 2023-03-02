import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import debug from "sabio-debug";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/brand/logo/geeks-ui.svg";
import lostPasswordSchema from "schemas/lostPasswordSchema";
import { Row, Col, Card, Image, Button } from "react-bootstrap";
import emailService from "../../services/emailService";
import Swal from "sweetalert2";

const _logger = debug.extend("lostPassword"); //sabio:lostPassword

function LostPassword() {
	const navigate = useNavigate();
	const lostPasswordData = { email: "" };

	function handleSubmit(values) {
		_logger(lostPasswordData);
		emailService
			.passwordResetEmail(values)
			.then(onEmailSuccess)
			.catch(onEmailError);
	}

	const onEmailSuccess = () => {
		Swal.fire(
			"Email sent!",
			"If the email exists in our database, you should be receiving one here shortly!",
			"success"
		).then(function () {
			navigate("/");
		});
	};

	const onEmailError = error => {
		_logger("email send fail -----> ", error);
		Swal.fire(
			"Internal Server Error",
			"Close this dialog box and double check email address",
			"error"
		);
	};
	return (
		<React.Fragment>
			<Row className="align-items-center justify-content-center g-0 min-vh-100">
				<Col lg={5} md={5} className="py-8 py-xl-0">
					<Card>
						<Card.Body className="p-6">
							<div className="mb-4">
								<Link to="/">
									<Image src={Logo} className="mb-4" alt="geeks" />
								</Link>
								<h1 className="mb-1 fw-bold">Forgotten Password Recovery</h1>
								<span>
									Here by mistake?
									<Link to="/login" className="ms-1">
										Sign in{" "}
									</Link>
									or
									<Link to="/register" className="ms-1">
										Register
									</Link>
								</span>
							</div>
							<Formik
								enableReinitialize={true}
								initialValues={lostPasswordData}
								onSubmit={handleSubmit}
								validationSchema={lostPasswordSchema}
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
										<Col lg={12} md={12} className="mb-0 d-grid gap-2">
											<Button variant="primary" type="submit">
												Reset Password
											</Button>
										</Col>
									</Row>
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
											className="btn-social btn-social-outline btn-linkedin"
										>
											<i className="fab fa-linkedin" />
										</Link>{" "}
										<Link
											to="#"
											className="btn-social btn-social-outline btn-github"
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

export default LostPassword;
