import axios from "axios";
import {ENDPOINT} from "./config";

const instance = axios.create({
  baseURL: process.env.baseURL || ENDPOINT,
});

export default instance;
