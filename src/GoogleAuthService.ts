// Services
import { injectDynamicScript } from "./ppDynamicResourceInjector";

const GOOGLE_PLATFORM_SCRIPT = "https://accounts.google.com/gsi/client";

interface CustomButtonUIConfig {
  type?: "icon" | "standard";
  theme?: "outline" | "filled_blue" | "filled_black";
  size?: "small" | "medium" | "large";
  text?: "signin" | "signin_with" | "signup_with" | "continue_with";
  shape?: "rectangular" | "pill" | "circle" | "square";
  logo_alignment?: "left" | "center";
  width?: string;
  locale?: string;
}

class GoogleAuthServices {
  _clientId: string;

  constructor(clientId: string) {
    this._clientId = clientId;
  }

  loadGooglePlatformApi() {
    return new Promise((resolve) => {
      if (window.google) {
        resolve(window.google);
        return;
      }

      injectDynamicScript(GOOGLE_PLATFORM_SCRIPT, () => {
        return resolve(window.google);
      });
    });
  }

  renderGoogleSSOButton(
    callback: () => void,
    btnUiConfig: CustomButtonUIConfig
  ) {
    return new Promise((resolve) => {
      return this.loadGooglePlatformApi().then((google: any) => {
        // callback returns a CredentialResponse
        // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/google.accounts/index.d.ts#L513
        google.accounts.id.initialize({
          client_id: this._clientId,
          callback
        });

        const defaultBtnConfig: CustomButtonUIConfig = {
          type: "standard",
          theme: "filled_blue",
          size: "large",
          text: "signin_with",
          shape: "rectangular",
          width: "150",
          logo_alignment: "center"
        };

        google.accounts.id.renderButton(
          document.getElementById("pp-google-sso-btn"),
          // customization attributes
          { ...defaultBtnConfig, ...btnUiConfig }
        );
        // optional: display one tap dialogue
        // google.accounts.id.prompt();
        resolve(true);
      });
    });
  }
}

export default GoogleAuthServices;
