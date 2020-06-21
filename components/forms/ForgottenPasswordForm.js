import { useRef } from "react";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import { connect } from "react-redux";
import { passwordResetRequest } from "../../store/actions/authActions";
import formStyles from "../../styles/formStyles.module.css";

const schema = yup.object({
    email: yup.string().email("Email is invalid").required("Email is required"),
    recaptcha: yup.string().required("Recaptcha is required")
});

const ForgottenPasswordForm = ({ passwordResetRequest }) => {
    const passResReqRecaptchaRef = useRef(null);

    const executeCaptcha = function () {
        passResReqRecaptchaRef.current.execute();
    };

    const resetCaptcha = function () {
        passResReqRecaptchaRef.current.reset();
    };

    const handleFormSubmit = (response) => {
        passwordResetRequest(response);
    };

    return (
        <Formik
            validationSchema={schema}
            onSubmit={handleFormSubmit}
            initialValues={{
                email: "",
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
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group as={Col} controlId="validationFormikRecaptcha">
                        <ReCAPTCHA
                            sitekey="6Lccp94UAAAAAMs4Me7MqWxY5-XWpNiwfHmloXXW"
                            size="invisible"
                            theme="dark"
                            ref={passResReqRecaptchaRef}
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
                            Submit
                        </Button>
                    </Form.Group>
                </Form>
            )}
        </Formik>
    );
};

export default connect(null, { passwordResetRequest })(ForgottenPasswordForm);
