import React, { useState, useEffect } from "react";
import { IEmployee, IEmployeeFormValues } from "../config/interface";
import { Formik } from "formik";
import axios from "axios";
import CrudApi from "../api/crudApi";
import UtilService from "../services/utilServices";

type Props = {
  data: IEmployee;
  onBackButtonHandler: () => void;
  onUpdateClickHandler: (data: IEmployee) => void;
};

const EditEmployee = (props: Props) => {
  const [editData, setEditData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { data, onBackButtonHandler, onUpdateClickHandler } = props;

  let initialValue: IEmployeeFormValues = {
    name: data.name,
    email: data.email,
    phone: data.phone,
  };

  const handleFormSubmit = async (values: IEmployeeFormValues) => {
    console.log("putRequest111", data.id);
    try {
      setIsLoading(true);
      const updateApi = CrudApi.getInstance();
      const { data: responseData } = await updateApi.updateEmployeeData(
        data.id,
        values
      );
      console.log("putRequest222", responseData);
      onUpdateClickHandler(responseData);
    } catch (e) {
      UtilService.showError(UtilService.getErrorMessage(e));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("editEmployee");
    getListData();
  }, []);

  const getListData = async () => {
    console.log("getListData", data.id);
    try {
      setIsLoading(true);
      const api = CrudApi.getInstance();
      const { data } = await api.getEmployeeListStatus();
      setEditData(data);
    } catch (e) {
      UtilService.showError(UtilService.getErrorMessage(e));
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Formik initialValues={initialValue} onSubmit={handleFormSubmit}>
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          touched,
        }) => {
          return (
            <>
              <label>Name</label>
              <input
                id="name"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              <label>Email</label>
              <input
                id="email"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <label>Phone</label>
              <input
                id="phone"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
              />

              <button type="submit" onClick={() => handleSubmit()}>
                update Employee
              </button>
              <button type="button" onClick={onBackButtonHandler}>
                back
              </button>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default EditEmployee;
