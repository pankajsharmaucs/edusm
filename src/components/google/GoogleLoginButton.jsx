import React from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

const GoogleLoginButton = ({ onSuccess, onError }) => {
  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onError={onError}
      useOneTap
      theme="filled_blue"
      type="standard"
      loginUri={window.location.href} // Redirects in the same tab
    />
  );
};

export default GoogleLoginButton;
