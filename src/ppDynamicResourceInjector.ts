// ---- Inject Dynamic JS
// @ts-nocheck

let scriptInjectionManager = {};

export const injectDynamicScript = (scriptSrc, callback) => {
  let injection = scriptInjectionManager[scriptSrc];

  if (injection && callback) {
    const { callbackQueue, isLoaded } = injection;

    if (isLoaded) {
      callback();
      return;
    }

    callbackQueue.push(callback);
    return;
  }

  let newInjection = {
    isLoaded: false,
    callbackQueue: []
  };

  scriptInjectionManager[scriptSrc] = newInjection;

  const script = document.createElement("script");
  script.src = scriptSrc;
  document.body.appendChild(script);

  script.onload = () => {
    if (callback) {
      newInjection.callbackQueue.push(callback);
    }

    newInjection.isLoaded = true;
    newInjection.callbackQueue.forEach((fn) => fn());
    newInjection.callbackQueue = undefined;
  };
};

// ---- Inject Dynamic CSS

let cssInjectionManager = {};

/**
 * @param {String} cssUrl
 */
export const injectDynamicCss = (cssUrl) => {
  const isInjected = cssInjectionManager[cssUrl];

  if (isInjected) {
    return;
  }

  cssInjectionManager[cssUrl] = true;

  var styleElement = document.createElement("link");
  styleElement.setAttribute("rel", "stylesheet");
  styleElement.setAttribute("type", "text/css");
  styleElement.setAttribute("href", cssUrl);
  document.getElementsByTagName("head")[0].appendChild(styleElement);
};
