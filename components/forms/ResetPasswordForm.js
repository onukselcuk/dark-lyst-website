import { useRef } from "react";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import { connect } from "react-redux";
import { resetPassword } from "../../store/actions/authActions";
import formStyles from "../../styles/formStyles.module.css";

const schema = yup.object({
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(32, "Password cannot be longer than 32 characters")
        .required("Password is required"),
    confirm: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords don't match")
        .required("Password confirmation is required"),
    recaptcha: yup.string().required("Recaptcha is required")
});

const ResetPasswordForm = ({ resetPassword, email, resetToken }) => {
    const resetRecaptchaRef = useRef(null);

    const executeCaptcha = function () {
        resetRecaptchaRef.current.execute();
    };

    const resetCaptcha = function () {
        resetRecaptchaRef.current.reset();
    };

    const handleFormSubmit = (response) => {
        const userObj = {
            ...response,
            resetToken,
            email
        };

        resetPassword(userObj);
    };

    return (
        <Formik
            validationSchema={schema}
            onSubmit={handleFormSubmit}
            initialValues={{
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
                <Form
                    className={formStyles.SignUpForm}
                    noValidate
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const formErrors = await validateForm();
                        const keys = Object.keys(formErrors);

                        if (keys && keys.length > 1) {
                            handleSubmit();
                        } else {
                            executeCaptcha();
                        }
                    }}
                >
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
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
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
                                className={formStyles.FormControl}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.confirm}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group as={Col} controlId="validationFormikRecaptcha">
                        <ReCAPTCHA
                            sitekey="6Lccp94UAAAAAMs4Me7MqWxY5-XWpNiwfHmloXXW"
                            size="invisible"
                            theme="dark"
                            ref={resetRecaptchaRef}
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
                    <Form.Group
                        className={formStyles.ButtonContainer}
                        as={Col}
                        controlId="validationFormikConfirm"
                    >
                        <Button
                            size="lg"
                            type="submit"
                            className={formStyles.Button}
                        >
                            Reset Password
                        </Button>
                    </Form.Group>
                </Form>
            )}
        </Formik>
    );
};

export default connect(null, { resetPassword })(ResetPasswordForm);
