// @ts-nocheck

import React from "react";
import PropTypes from "prop-types";
import GoogleAuthService from "./GoogleAuthService";
import styles from "./SSOButton.module.scss";

const renderDefaultButton = () => (
  <div className={styles.btn} id="pp-google-sso-btn" />
);

const useGoogleAuthService = (clientId, authCallback) => {
  React.useEffect(() => {
    (async () => {
      const AuthService = new GoogleAuthService(clientId);
      AuthService.renderGoogleSSOButton(authCallback);
    })();
  }, [clientId, authCallback]);
};

const PpGoogleAuthButton = ({ googleClientId, authCallback, children }) => {
  const renderButton = children || renderDefaultButton;
  useGoogleAuthService(googleClientId, authCallback);
  return renderButton();
};

PpGoogleAuthButton.propTypes = {
  googleClientId: PropTypes.string.isRequired,
  authCallback: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default React.memo(PpGoogleAuthButton);
