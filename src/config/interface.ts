export interface IEmployee {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export enum PageEnum {
  list,
  add,
  edit,
}

export interface IEmployeeFormValues {
  name: string;
  email: string;
  phone: string;
}
