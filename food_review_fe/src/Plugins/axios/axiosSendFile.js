import axios from "axios";
const baseUrl = `${process.env.REACT_APP_SERVER_DOMAIN}`;
const axiosCustomSendFile = async (url, payload) => {
  try {
    const response = await axios.post(`${baseUrl}${url}`, payload, {
      timeout: 1000,
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
export default axiosCustomSendFile;
