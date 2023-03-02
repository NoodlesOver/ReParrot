import axios from "axios";
import "./serviceHelpers";
import debug from "sabio-debug";
import * as serviceHelpers from "./serviceHelpers";
const _logger = debug.extend("emailService");

const endpoint = `${serviceHelpers.API_HOST_PREFIX}/api/emails`;

let addContactUsEmail = (payload) => {
  _logger(payload);

  const config = {
    method: "POST",
    url: `${endpoint}/contactus`,
    data: payload,
    withCredentials: false,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config)
    .then(serviceHelpers.onGlobalSuccess)
    .catch(serviceHelpers.onGlobalError);
};

let passwordResetEmail = email =>{
  const config = {
    method: "POST",
    url: `${endpoint}/passwordreset?email=${email.email}`,
    withCredentials: false,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(serviceHelpers.onGlobalSuccess).catch(serviceHelpers.onGlobalError);
}

const emailService = {
  addContactUsEmail,
  passwordResetEmail,
};
export default emailService;
