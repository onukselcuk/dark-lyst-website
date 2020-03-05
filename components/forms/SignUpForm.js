import { useRef } from "react";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import { connect } from "react-redux";
import { registerUser } from "../../store/actions/authActions";

const schema = yup.object({
	name: yup.string().required("Name is required"),
	email: yup.string().email("Email is invalid").required("Email is required"),
	password: yup
		.string()
		.min(8, "Password must be at least 8 characters")
		.max(32, "Password cannot be longer than 32 characters")
		.required("Password is required"),
	confirm: yup
		.string()
		.oneOf([ yup.ref("password"), null ], "Passwords don't match")
		.required("Password confirmation is required"),
	recaptcha: yup.string().required("Recaptcha is required")
});

const SignUpForm = ({ registerUser, isAuthenticated }) => {
	const recaptchaRef = useRef(null);

	const executeCaptcha = function () {
		recaptchaRef.current.execute();
	};

	const resetCaptcha = function () {
		recaptchaRef.current.reset();
	};

	const handleFormSubmit = (response) => {
		registerUser(response);
	};

	return (
		<Formik
			validationSchema={schema}
			onSubmit={handleFormSubmit}
			initialValues={{
				name: "",
				email: "",
				password: "",
				confirm: "",
				recaptcha: ""
			}}
		>
			{({
				handleSubmit,
				handleChange,
				handleBlur,
				values,
				touched,
				isValid,
				errors,
				setFieldValue,
				validateForm
			}) => (
				<Form className="sign-up-form" noValidate>
					<Form.Group as={Col} controlId="validationFormikName">
						<Form.Label>Name</Form.Label>
						<InputGroup>
							<Form.Control
								type="text"
								name="name"
								value={values.name}
								onChange={handleChange}
								isInvalid={touched.name && errors.name}
								isValid={touched.name && !errors.name}
								onBlur={handleBlur}
								size="lg"
							/>
							<Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
						</InputGroup>
					</Form.Group>
					<Form.Group as={Col} controlId="validationFormikEmail">
						<Form.Label>Email Address</Form.Label>
						<InputGroup>
							<Form.Control
								type="email"
								name="email"
								value={values.email}
								onChange={handleChange}
								isInvalid={touched.email && errors.email}
								isValid={touched.email && !errors.email}
								onBlur={handleBlur}
								size="lg"
							/>
							<Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
						</InputGroup>
					</Form.Group>
					<Form.Group as={Col} controlId="validationFormikPassword">
						<Form.Label>Password</Form.Label>
						<InputGroup>
							<Form.Control
								type="password"
								name="password"
								value={values.password}
								onChange={handleChange}
								isInvalid={touched.password && errors.password}
								isValid={touched.password && !errors.password}
								onBlur={handleBlur}
								size="lg"
							/>
							<Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
						</InputGroup>
					</Form.Group>
					<Form.Group as={Col} controlId="validationFormikConfirm">
						<Form.Label>Confirm Password</Form.Label>
						<InputGroup>
							<Form.Control
								type="password"
								name="confirm"
								value={values.confirm}
								onChange={handleChange}
								isInvalid={touched.confirm && errors.confirm}
								isValid={touched.confirm && !errors.confirm}
								onBlur={handleBlur}
								size="lg"
							/>
							<Form.Control.Feedback type="invalid">{errors.confirm}</Form.Control.Feedback>
						</InputGroup>
					</Form.Group>
					<Form.Group as={Col} controlId="validationFormikRecaptcha">
						<ReCAPTCHA
							sitekey="6Lccp94UAAAAAMs4Me7MqWxY5-XWpNiwfHmloXXW"
							size="invisible"
							theme="dark"
							ref={recaptchaRef}
							onChange={(response) => {
								if (response === null) {
									setFieldValue("recaptcha", "");
									return;
								}

								setFieldValue("recaptcha", response);

								if (response) {
									handleSubmit();
								} else {
									resetCaptcha();
								}
							}}
						/>
					</Form.Group>
					<Form.Group className="button-container" as={Col} controlId="validationFormikConfirm">
						<Button
							size="lg"
							onClick={async () => {
								const formErrors = await validateForm();
								const keys = Object.keys(formErrors);

								if (keys && keys.length > 1) {
									handleSubmit();
								} else {
									executeCaptcha();
								}
							}}
						>
							Sign Up
						</Button>
					</Form.Group>
				</Form>
			)}
		</Formik>
	);
};

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.isAuthenticated
	};
};

export default connect(mapStateToProps, { registerUser })(SignUpForm);
