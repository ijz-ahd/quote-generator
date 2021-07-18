import axios from "axios";

const instance = axios.create({
  baseURL: "https://quote-gnr.herokuapp.com",
});

export default instance;
