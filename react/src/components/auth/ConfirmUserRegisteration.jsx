import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import userService from "../../services/userService";
import debug from "sabio-debug";

const _logger = debug.extend("userConfirmation"); //sabio:userConfirmation

function ConfirmUserRegistration() {
	const [hasFired, setHasFired] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const token = params.get("token");
	const { id } = useParams();

	useEffect(() => {
		if (!hasFired) {
			userService
				.confirmUserRegistration(id, token)
				.then(onConfirmSuccess)
				.catch(onConfirmError);
		}
	}, []);

	const onConfirmSuccess = () => {
		setHasFired(true);
		Swal.fire("Registration Confirmed", "Try logging in!", "success").then(
			function () {
				navigate("/login");
			}
		);
	};

	const onConfirmError = error => {
		_logger("userConfimation error ----->", error);
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

	return <React.Fragment></React.Fragment>;
}

export default ConfirmUserRegistration;
