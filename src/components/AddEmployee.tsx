import React, { useState } from "react";
import { Formik } from "formik";
import * as YUP from "yup";
import { IEmployee, IEmployeeFormValues } from "../config/interface";
import axios from "axios";
import CrudApi from "../api/crudApi";
import UtilService from "../services/utilServices";

type Props = {
  onBackButtonHandler: () => void;
  onSUbmitClickHandler: (data: IEmployee) => void;
};

let initialValue: IEmployeeFormValues = {
  name: "",
  email: "",
  phone: "",
};

const addEmployeeSchema = YUP.object().shape({
  name: YUP.string().required("Required!"),
  email: YUP.string().email("Invalid email").required("Required!"),
  phone: YUP.string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Required!"),
});

const AddEmployee = (props: Props) => {
  // const [EmployeeTable, setEmployeeTable] = useState<IEmployeeFormValues[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { onBackButtonHandler, onSUbmitClickHandler } = props;

  const handleFormSubmit = async (values: IEmployeeFormValues) => {
    try {
      setIsLoading(true);
      const addApi = CrudApi.getInstance();
      const { data } = await addApi.createEmployeeData(values);
      console.log("response.data", data);
      onSUbmitClickHandler(data);
      onBackButtonHandler();
    } catch (e) {
      UtilService.showError(UtilService.getErrorMessage(e));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValue}
        onSubmit={handleFormSubmit}
        validationSchema={addEmployeeSchema}
      >
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
                value={values.name}
                onBlur={handleBlur}
              />

              {errors.name && touched.name ? (
                <div style={{ color: "red" }}>{errors.name} </div>
              ) : null}

              <label>Email</label>
              <input
                id="email"
                type="text"
                onChange={handleChange}
                value={values.email}
                onBlur={handleBlur}
              />
              {errors.email && touched.email ? (
                <div style={{ color: "red" }}>{errors.email}</div>
              ) : null}
              <label>Phone</label>
              <input
                id="phone"
                type="text"
                onChange={handleChange}
                value={values.phone}
                onBlur={handleBlur}
              />
              {errors.phone && touched.phone ? (
                <div style={{ color: "red" }}>{errors.phone}</div>
              ) : null}

              <button type="submit" onClick={() => handleSubmit()}>
                Add Employee
              </button>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default AddEmployee;
