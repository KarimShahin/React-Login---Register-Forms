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
	const [buttonDisabled, setButtonDisabled] = useState(true);
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
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
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
					<label htmlFor="password" className="form-label">
						Password
					</label>
					<input
						type="password"
						className={`form-control ${
							patterns.password.test(loginForm.password) || loginFormError.passwordError == ""
								? ""
								: "border-danger"
						}`}
						id="password"
						value={loginForm.password}
						onChange={handleChange}
					/>
					{/* <i className="fa-solid fa-eye-slash"></i> */}
					<div id="passwordError" className="form-text text-danger">
						{loginFormError.passwordError}
					</div>
				</div>
				<button type="submit" className="btn btn-primary my-3" disabled={buttonDisabled}>
					Submit
				</button>
			</form>
		</>
	);
}

export default Login;
