export default class StorageService {
  static getApiToken = async (): Promise<string | null> => {
    return localStorage.getItem("_api_token");
  };

  static setApiToken = async (token: string): Promise<void> => {
    return localStorage.setItem("_api_token", token);
  };

  static removeApiToken = async (): Promise<void> => {
    return localStorage.removeItem("_api_token");
  };
}
