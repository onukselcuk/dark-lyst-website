import { GoogleLogin } from "react-google-login";
import oauthStyles from "../../styles/oauthbuttonsStyles.module.css";
import { loginUserWithGoogle } from "../../store/actions/authActions";
import { connect } from "react-redux";

const GoogleSignIn = ({ loginUserWithGoogle, isSignUp }) => {
    const responseGoogle = (response) => {
        if (!response.error) {
            console.log("response return from google on frontend ");
            console.log(response);
            loginUserWithGoogle(response, isSignUp);
        }
    };

    return (
        <div className={oauthStyles.OauthButtonContainer}>
            <GoogleLogin
                clientId={process.env.NEXT_STATIC_GOOGLE_OAUTH_CLIENT_ID}
                buttonText="Continue with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
                theme="dark"
                className="google-oauth-button"
            />
        </div>
    );
};

export default connect(null, { loginUserWithGoogle })(GoogleSignIn);
