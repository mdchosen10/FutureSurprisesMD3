/* eslint-disable no-console */
import { AxiosResponse } from "axios";

interface ErrorResponse {
  response: {
    status: number;
    data: object;
  };
}

export function apiErrorHandler(err: ErrorResponse) {
  if (err.response) {
    switch (err.response.status) {
      case 500:
        return err.response;
      case 503:
        window.location.href = "/maintenance";
        return;
      case 400:
        return err.response;
      case 404:
        return err.response;
      // window.location.href = "/404";
      case 401:
        return err.response;
      default:
        return err.response.data;
    }
  }
  return new Error("Unexpected Error Occurred!");
}

export function apiSuccessHandler(res: AxiosResponse) {
  return res;
}
