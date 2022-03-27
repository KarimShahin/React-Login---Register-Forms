import React from "react";
import { useState, useEffect } from "react";

function Register(props) {
	const [registerForm, setRegisterForm] = useState({
		name: "",
		email: "",
		username: "",
		password: "",
		confirmpassword: "",
	});
	const [registerFormError, setRegisterFormError] = useState({
		nameError: "",
		emailError: "",
		usernameError: "",
		passwordError: "",
		confirmpasswordError: "",
	});
	const patterns = {
		name: /^[a-zA-Z]{2,12}$/,
		email: /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
		password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
		confirmpassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
		username: /^[\S]{2,24}$/,
	};
	const [buttonDisabled, setButtonDisabled] = useState(true);
	const handleChange = (event) => {
		let element = event.target.id;
		let elementError = element + "Error";
		setRegisterForm({
			...registerForm,
			[element]: event.target.value,
		});
		setRegisterFormError({
			...registerFormError,
			[elementError]:
				event.target.value.length === 0
					? "This Field is Required"
					: patterns[element].test(event.target.value) && element !== "confirmpassword"
					? null
					: element === "name"
					? "name must be 2 characters or more"
					: element === "email"
					? "Email must be a valid email ex: username@mydomain.com"
					: element === "password"
					? "Password must not be less than 8 characters and contains at least one uppercase & one digit & one special character"
					: element === "username"
					? "username must not contain space"
					: element === "confirmpassword" && event.target.value === registerForm.password
					? null
					: "passwords doesn't match",
		});
	};

	const submitForm = (event) => {
		event.preventDefault();
		console.log(registerForm);
	};

	useEffect(() => {
		if (
			!registerFormError.emailError &&
			!registerFormError.passwordError &&
			!registerFormError.nameError &&
			!registerFormError.usernameError &&
			!registerFormError.confirmpasswordError &&
			registerFormError.emailError !== "" &&
			registerFormError.passwordError !== "" &&
			registerFormError.confirmpasswordError !== "" &&
			registerFormError.usernameError !== "" &&
			registerFormError.nameError !== ""
		) {
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
		}
	}, [registerFormError]);
	return (
		<>
			<h1 className="text-center">Register</h1>
			<form onSubmit={submitForm}>
				<div className="mb-3 my-3">
					<label htmlFor="name" className="form-label">
						Name
					</label>
					<input
						type="text"
						className={`form-control ${
							patterns.name.test(registerForm.name) || registerForm.name === "" ? "" : "border-danger"
						}`}
						id="name"
						aria-describedby="nameHelp"
						value={registerForm.name}
						onChange={handleChange}
					/>
					<div id="nameError" className="form-text text-danger">
						{registerFormError.nameError}
					</div>
				</div>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">
						Email address
					</label>
					<input
						type="email"
						className={`form-control ${
							patterns.email.test(registerForm.email) || registerForm.email === "" ? "" : "border-danger"
						}`}
						id="email"
						aria-describedby="emailHelp"
						value={registerForm.email}
						onChange={handleChange}
					/>
					<div id="emailError" className="form-text text-danger">
						{registerFormError.emailError}
					</div>
				</div>
				<div className="mb-3">
					<label htmlFor="username" className="form-label">
						User Name
					</label>
					<input
						type="text"
						className={`form-control ${
							patterns.username.test(registerForm.username) || registerForm.username === ""
								? ""
								: "border-danger"
						}`}
						id="username"
						value={registerForm.username}
						onChange={handleChange}
					/>
					<div id="usernameError" className="form-text text-danger">
						{registerFormError.usernameError}
					</div>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">
						Password
					</label>
					<input
						type="password"
						className={`form-control ${
							patterns.password.test(registerForm.password) || registerForm.password === ""
								? ""
								: "border-danger"
						}`}
						id="password"
						value={registerForm.password}
						onChange={handleChange}
					/>
					<div id="passwordError" className="form-text text-danger">
						{registerFormError.passwordError}
					</div>
				</div>
				<div className="mb-3">
					<label htmlFor="confirmpassword" className="form-label">
						Confirm Password
					</label>
					<input
						type="password"
						className={`form-control ${
							registerForm.confirmpassword === registerForm.password ? "" : "border-danger"
						}`}
						id="confirmpassword"
						value={registerForm.confirmpassword}
						onChange={handleChange}
					/>
					<div id="confirmpasswordError" className="form-text text-danger">
						{registerFormError.confirmpasswordError}
					</div>
				</div>
				<button type="submit" className="btn btn-primary my-3" disabled={buttonDisabled}>
					Submit
				</button>
			</form>
		</>
	);
}

export default Register;
