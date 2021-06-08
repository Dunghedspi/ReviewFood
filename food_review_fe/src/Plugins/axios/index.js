import axios from "axios";
import QueryString from "qs";
function axiosCustom() {
  const instance = axios.create({
    headers: {
      // "X-Requested-With": "XMLHttpRequest",
      "Content-type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
    baseURL: `${process.env.REACT_APP_SERVER_DOMAIN}`,
    withCredentials: true,
  });

  const handleSuccess = (response) => {
    return response;
  };
  const handleError = (error) => {
    console.log(error);
    return Promise.reject(error);
  };
  instance.interceptors.request.use(handleSuccess, handleError);
  return {
    callApi: async (method, url, payload, params) => {
      try {
        const result = await instance({
          method,
          url,
          data: QueryString.stringify(payload) || null,
          params: QueryString.stringify(params) || null,
        });
        return result;
      } catch (error) {
        console.log(error);
      }
    },
  };
}
export default axiosCustom();
