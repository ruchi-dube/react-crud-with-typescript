import React, { FC, useState } from "react";
import { IEmployee } from "../config/interface";
import EmployeeModel from "./EmployeeModel";

// console.log("IEmployee" IEmployee);

type Props = {
  list: IEmployee[];
  // list: IEmployee[] | Record<string, IEmployee>;
  onDeleteClickHandler: (data: IEmployee) => void;
  onEdit: (data: IEmployee) => void;
};

const EmployeeList = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [showDataToView, setShowDataToView] = useState(
    null as IEmployee | null
  );
  // console.log("first", Props);
  const { list, onDeleteClickHandler, onEdit } = props;
  // console.log("list", typeof list);

  const viewEmployeeDetails = (data: IEmployee) => {
    setShowDataToView(data);
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id </th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((employee, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1} </th>
                <td>{`${employee.name}`}</td>
                <td>{`${employee.email}`}</td>
                <td>{`${employee.phone}`}</td>
                <td>
                  <div>
                    <input
                      type="button"
                      value="view"
                      onClick={() => viewEmployeeDetails(employee)}
                    />
                    <input
                      type="button"
                      value="edit"
                      onClick={() => onEdit(employee)}
                    />
                    <input
                      type="button"
                      value="deleted"
                      onClick={() => onDeleteClickHandler(employee)}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showModal && showDataToView !== null && (
        <EmployeeModel onClose={onCloseModal} data={showDataToView} />
      )}
    </>
  );
};

export default EmployeeList;
