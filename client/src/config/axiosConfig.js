import axios from "axios";
import {ENDPOINT} from "./config";

const instance = axios.create({
  baseURL: ENDPOINT,
});

export default instance;
