import { useRef } from "react";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import { connect } from "react-redux";
import { changePassword } from "../../store/actions/authActions";
import formStyles from "../../styles/formStyles.module.css";
import theme from "../../src/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/changePasswordStyles.module.css";
import loaderStyles from "../../styles/loader.module.css";
import breakpoints from "../../src/breakpoints";

const schema = yup.object({
    oldPassword: yup.string().required("Old Password is required"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(32, "Password cannot be longer than 32 characters")
        .required("New password is required"),
    confirm: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords don't match")
        .required("New Password confirmation is required"),
    recaptcha: yup.string().required("Recaptcha is required")
});

const ChangePasswordForm = ({
    changePassword,
    setIsChangingPassword,
    isPasswordChangeLoading
}) => {
    const recaptchaRef = useRef(null);

    const executeCaptcha = function () {
        recaptchaRef.current.execute();
    };

    const resetCaptcha = function () {
        recaptchaRef.current.reset();
    };

    const handleFormSubmit = (response) => {
        changePassword(response);
    };

    const closePassword = () => {
        setIsChangingPassword(false);
    };

    return (
        <div className="profile-container">
            {isPasswordChangeLoading ? (
                <div className="loader-container">
                    <div className={loaderStyles.loader}>Loading...</div>
                </div>
            ) : (
                <Formik
                    validationSchema={schema}
                    onSubmit={handleFormSubmit}
                    initialValues={{
                        oldPassword: "",
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
                            <Form.Group
                                as={Col}
                                controlId="validationFormikPassword"
                            >
                                <Form.Label>Old Password</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type="password"
                                        name="oldPassword"
                                        value={values.oldPassword}
                                        onChange={handleChange}
                                        isInvalid={
                                            touched.oldPassword &&
                                            errors.oldPassword
                                        }
                                        isValid={
                                            touched.oldPassword &&
                                            !errors.oldPassword
                                        }
                                        onBlur={handleBlur}
                                        size="lg"
                                        className={formStyles.FormControl}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.oldPassword}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                controlId="validationFormikPassword"
                            >
                                <Form.Label>New Password</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        isInvalid={
                                            touched.password && errors.password
                                        }
                                        isValid={
                                            touched.password && !errors.password
                                        }
                                        onBlur={handleBlur}
                                        size="lg"
                                        className={formStyles.FormControl}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                controlId="validationFormikConfirm"
                            >
                                <Form.Label>Confirm New Password</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type="password"
                                        name="confirm"
                                        value={values.confirm}
                                        onChange={handleChange}
                                        isInvalid={
                                            touched.confirm && errors.confirm
                                        }
                                        isValid={
                                            touched.confirm && !errors.confirm
                                        }
                                        onBlur={handleBlur}
                                        size="lg"
                                        className={formStyles.FormControl}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.confirm}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group
                                as={Col}
                                controlId="validationFormikPassword"
                            >
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
                                    Change Password
                                </Button>
                            </Form.Group>
                        </Form>
                    )}
                </Formik>
            )}
            <div onClick={closePassword} className="close-button-container">
                <FontAwesomeIcon className={styles.closeIcon} icon={faTimes} />
            </div>
            <style jsx>{`
                .profile-container {
                    width: 50%;
                    margin: 2rem auto;
                    border-radius: 10px;
                    padding: 2rem;
                    padding-top: 4rem;
                    background-color: ${theme.palette.eight.main};
                    position: relative;
                }

                .close-button-container {
                    position: absolute;
                    top: 5%;
                    right: 5%;
                }

                .close-button-container:hover {
                    cursor: pointer;
                }

                @media (max-width: ${breakpoints.sizes.mdsm}) {
                    .profile-container {
                        width: 70%;
                    }
                }
            `}</style>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isPasswordChangeLoading: state.auth.isPasswordChangeLoading
    };
};

export default connect(mapStateToProps, { changePassword })(ChangePasswordForm);
