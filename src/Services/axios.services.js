import axios from "axios";
const apiURL = "http://localhost:8088/api";
export default  () => {
    axios.defaults.baseURL =apiURL;
  return axios;
}