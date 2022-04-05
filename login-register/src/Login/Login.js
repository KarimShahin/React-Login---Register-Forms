import "./Login.css";
import React from "react";
import { useState, useEffect } from "react";

function Login(props) {
	const patterns = {
		email: /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
		password: /^[\d\w@-]{8,20}$/i,
	};
	const [loginForm, setLoginForm] = useState({
		email: "",
		password: "",
	});
	const [loginFormError, setLoginFormError] = useState({
		emailError: "",
		passwordError: "",
	});
	const [flag, setFlag] = useState({
		buttonDisabled: true,
		showHidePassword: true,
	});
	const handleChange = (event) => {
		let element = event.target.id;
		let elementError = element + "Error";
		setLoginForm({
			...loginForm,
			[element]: event.target.value,
		});
		setLoginFormError({
			...loginFormError,
			[elementError]:
				event.target.value.length === 0
					? "This Field is Required"
					: patterns[element].test(event.target.value)
					? null
					: element === "email"
					? "Email must be a valid email ex: username@mydomain.com"
					: "Password must not be less than 8 digit",
		});
	};

	const showHidePassword = () => {
		setFlag({
			...flag,
			showHidePassword: !flag.showHidePassword,
		});
	};

	const submitForm = (event) => {
		event.preventDefault();
		console.log(loginForm);
	};

	useEffect(() => {
		if (
			!loginFormError.emailError &&
			!loginFormError.passwordError &&
			loginFormError.emailError !== "" &&
			loginFormError.passwordError !== ""
		) {
			setFlag({
				...flag,
				buttonDisabled: false,
			});
		} else {
			setFlag({
				...flag,
				buttonDisabled: true,
			});
		}
	}, [loginFormError]);

	return (
		<>
			<h1 className="text-center">Login</h1>
			<form onSubmit={submitForm}>
				<div className="mb-3 my-3">
					<label htmlFor="email" className="form-label">
						Email address
					</label>
					<input
						type="email"
						className={`form-control ${
							patterns.email.test(loginForm.email) || loginFormError.emailError == ""
								? ""
								: "border-danger"
						}`}
						id="email"
						aria-describedby="emailHelp"
						value={loginForm.email}
						onChange={handleChange}
					/>
					<div id="emailError" className="form-text text-danger">
						{loginFormError.emailError}
					</div>
				</div>
				<div className="mb-3">
					<label htmlFor="password" style={{ display: "block" }} className="form-label">
						Password
					</label>
					<input
						type={flag.showHidePassword ? "password" : "text"}
						style={{ display: "inline-block", width: "94%" }}
						className={`form-control ${
							patterns.password.test(loginForm.password) || loginFormError.passwordError == ""
								? ""
								: "border-danger"
						}`}
						id="password"
						value={loginForm.password}
						onChange={handleChange}
					/>
					<i
						style={{ padding: "0.6em", border: "1px solid #c4c4c4", cursor: "pointer" }}
						className="fa-solid fa-eye-slash"
						onClick={showHidePassword}
					></i>
					<div id="passwordError" className="form-text text-danger">
						{loginFormError.passwordError}
					</div>
				</div>
				<button type="submit" className="btn btn-primary my-3" disabled={flag.buttonDisabled}>
					Submit
				</button>
			</form>
		</>
	);
}

export default Login;
