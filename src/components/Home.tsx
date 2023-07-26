import React, { useEffect, useState } from "react";
import { IEmployee, PageEnum } from "../config/interface";
import axios from "axios";
import EmployeeList from "./EmployeeList";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";
import CrudApi from "../api/crudApi";
import UtilService from "../services/utilServices";
import LoadingIndicator from "./placeholder/LoadingIndicator";

const Home = () => {
  const [showPage, setShowPage] = useState(PageEnum.list);
  const [dataToEdit, setDataToEdit] = useState<IEmployee>({} as IEmployee);
  const [employeesList, setEmployeesList] = useState([] as IEmployee[]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("getEmployeeList");
    getEmployeeListData();
  }, []);

  const onAddEmployeeClickHandler = () => {
    setShowPage(PageEnum.add);
  };

  const ShowListPage = () => {
    setShowPage(PageEnum.list);
  };

  const addEmployee = () => {
    getEmployeeListData();
  };

  const deleteEmployee = async (data: IEmployee) => {
    try {
      setIsLoading(true);
      const deleteApi = CrudApi.getInstance();
      await deleteApi.deleteEmployeeData(data.id);
      console.log("deleted", data.id);
      getEmployeeListData();
    } catch (e) {
      UtilService.showError(UtilService.getErrorMessage(e));
    } finally {
      setIsLoading(false);
    }
  };

  const getEmployeeListData = async () => {
    try {
      setIsLoading(true);
      const api = CrudApi.getInstance();
      const { data } = await api.getEmployeeListStatus();
      setEmployeesList(data);
    } catch (e) {
      UtilService.showError(UtilService.getErrorMessage(e));
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const editEmployeeData = (data: IEmployee) => {
    setShowPage(PageEnum.edit);
    setDataToEdit(data);
  };

  const handleUpdateClick = () => {
    console.log("editData");
    getEmployeeListData();
    setShowPage(PageEnum.list);

    // }
  };

  return (
    <>
      <h3>Crud application</h3>

      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <section className="section-content">
            {showPage === PageEnum.list && (
              <>
                <input
                  type="button"
                  value="Add Employee"
                  onClick={onAddEmployeeClickHandler}
                  style={{ float: "right" }}
                />
                <EmployeeList
                  list={employeesList}
                  onDeleteClickHandler={deleteEmployee}
                  onEdit={editEmployeeData}
                />
              </>
            )}

            {showPage === PageEnum.add && (
              <AddEmployee
                onBackButtonHandler={ShowListPage}
                onSUbmitClickHandler={addEmployee}
              />
            )}

            {showPage === PageEnum.edit && dataToEdit !== null && (
              <EditEmployee
                data={dataToEdit}
                onBackButtonHandler={ShowListPage}
                onUpdateClickHandler={handleUpdateClick}
              />
            )}
          </section>
        </>
      )}
    </>
  );
};

export default Home;
