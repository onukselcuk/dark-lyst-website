import { useRef } from "react";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import { connect } from "react-redux";
import { loginUser } from "../../store/actions/authActions";
import formStyles from "../../styles/formStyles.module.css";

const schema = yup.object({
	email: yup.string().email("Email is invalid").required("Email is required"),
	password: yup
		.string()
		.min(8, "Password must be at least 8 characters")
		.max(32, "Password cannot be longer than 32 characters")
		.required("Password is required"),
	recaptcha: yup.string().required("Recaptcha is required")
});

const LoginForm = ({ loginUser, isAuthenticated }) => {
	const loginRecaptchaRef = useRef(null);

	const executeCaptcha = function () {
		loginRecaptchaRef.current.execute();
	};

	const resetCaptcha = function () {
		loginRecaptchaRef.current.reset();
	};

	const handleFormSubmit = (response) => {
		loginUser(response);
	};

	return (
		<Formik
			validationSchema={schema}
			onSubmit={handleFormSubmit}
			initialValues={{
				email: "",
				password: "",
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
				<Form className={formStyles.SignUpForm} noValidate>
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
								className={formStyles.FormControl}
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
								className={formStyles.FormControl}
							/>
							<Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
						</InputGroup>
					</Form.Group>

					<Form.Group as={Col} controlId="validationFormikRecaptcha">
						<ReCAPTCHA
							sitekey="6Lccp94UAAAAAMs4Me7MqWxY5-XWpNiwfHmloXXW"
							size="invisible"
							theme="dark"
							ref={loginRecaptchaRef}
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
					<Form.Group className={formStyles.ButtonContainer} as={Col} controlId="validationFormikConfirm">
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
							className={formStyles.Button}
						>
							Login
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

export default connect(mapStateToProps, { loginUser })(LoginForm);
