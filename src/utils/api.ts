// import { getCookie } from "cookies-next";

import axios from "axios";
import {
  apiErrorHandler,
  apiSuccessHandler,
} from "@/helpers/responseHandler";
import Qs from "qs";
import { AxiosRequestHeaders } from "axios";

const customAxios = axios.create({
  baseURL: process.env.BASE_URL as string,
  withCredentials: true,
  paramsSerializer: {
    serialize: params =>
      Qs.stringify(params, { arrayFormat: "brackets" }),
  },
});

customAxios.interceptors.request.use(
  function (config) {
    // const cookie = getCookie("connect.sid") ?? "";

    config.headers = {
      "Content-Type": "application/json",
      // Authorization: cookie,
      ...config.headers,
    } as AxiosRequestHeaders;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

customAxios.interceptors.response.use(
  apiSuccessHandler,
  apiErrorHandler,
);

export default customAxios;
