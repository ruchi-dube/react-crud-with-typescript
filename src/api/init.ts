import axios, { Axios, AxiosRequestConfig } from "axios";

class InitApi {
  static _instance: Axios;

  static getInstance() {
    if (this._instance) {
      return this._instance;
    }

    this._instance = axios.create();

    this._instance.interceptors.request.use(async (config: any) => {
      config.headers = {
        Accept: "application/json",
      };
      return config;
    });

    return this._instance;
  }
}

export default InitApi;
