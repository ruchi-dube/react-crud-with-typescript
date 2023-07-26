import { AxiosResponse } from "axios";
import appConstants from "../config/app-constants";
import InitApi from "./init";

class CrudApi {
  static _instance: CrudApi;

  static getInstance = () => {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new CrudApi();
    return this._instance;
  };

  _apiSvc;

  constructor() {
    this._apiSvc = InitApi.getInstance();
  }

  getEmployeeListStatus = async (): Promise<AxiosResponse> => {
    return this._apiSvc.get(`${appConstants.apiUrl}`);
  };

  createEmployeeData = async (data: {}): Promise<AxiosResponse> => {
    return this._apiSvc.post(`${appConstants.apiUrl}`, data);
  };

  updateEmployeeData = async (
    employeeId: number,
    updatedData: any
  ): Promise<AxiosResponse> => {
    return this._apiSvc.put(
      `${appConstants.apiUrl}/${employeeId}`,
      updatedData
    );
  };

  deleteEmployeeData = async (employeeId: number): Promise<AxiosResponse> => {
    return this._apiSvc.delete(`${appConstants.apiUrl}/${employeeId}`);
  };
}

export default CrudApi;
