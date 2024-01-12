// @ts-nocheck

import React from "react";
import "./styles.css";
import PpGoogleAuthButton from "./GoogleSSOButton";
const clientId =
  "238287533322-k747tjfj3hn9jr1qdccduphh224vqg1n.apps.googleusercontent.com";

export default function App() {
  const onGGAuthSuccess = React.useCallback((userInfo) => {
    alert("Login success!");
    console.log({ userInfo });
  }, []);

  return (
    <div className="App">
      <PpGoogleAuthButton
        googleClientId={clientId}
        authCallback={onGGAuthSuccess}
      />
    </div>
  );
}
