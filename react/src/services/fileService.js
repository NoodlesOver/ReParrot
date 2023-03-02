import axios from "axios";
import {
    onGlobalError,
    onGlobalSuccess,
    API_HOST_PREFIX,
  } from "./serviceHelpers";

  const endpoint = { fileUploadUrl: `${API_HOST_PREFIX}/api/files` };

 const addFiles = (files) => {
    var formData = new FormData();
    Object.keys(files).forEach((key) => {
        formData.append("files", files[key])
      })
    
    const config = {
        method: "POST",
        url: endpoint.fileUploadUrl + "/upload",
        data: formData,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": `multipart/form-data;` },
    };
    
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};


export { addFiles };

