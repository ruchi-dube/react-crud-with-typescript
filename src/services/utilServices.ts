export default class UtilService {
  static getErrorMessage = (e: any): string => {
    return e?.response?.data?.message
      ? e.response.data.message
      : e.message || "An error occurred, please try again later.";
  };

  // static confirm = async (msg: string): Promise<boolean> => {
  //   return confirm(msg);
  // };

  static showError = async (msg: string) => {
    alert(msg);
  };

  static showSuccess = async (msg: string) => {
    alert(msg);
  };

  static convertToArray(
    obj: { [key: string]: string },
    labelProp = "label",
    valueProp = "value"
  ) {
    const arr: Array<any> = [];
    Object.keys(obj).forEach((key: string) => {
      arr.push({
        [labelProp]: obj[key],
        [valueProp]: key,
      });
    });
    return arr;
  }
}
