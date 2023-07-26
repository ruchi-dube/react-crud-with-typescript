import React from "react";
import { IEmployee } from "../config/interface";

type Props = {
  onClose: () => void;
  data: IEmployee;
};

const EmployeeModel = (props: Props) => {
  const { onClose, data } = props;
  console.log("data", data);
  return (
    <>
      <div id="id01" className="w3-modal">
        <div className="w3-modal-content">
          <div className="w3-container">
            <span onClick={onClose} className="w3-button w3-display-topright">
              &times;
            </span>
            <p>employee Details</p>
            <div>
              <label>name:{data?.name}</label>
            </div>
            <div>
              <label>email:{data?.email}</label>
            </div>
            <div>
              <label>phone:{data?.phone}</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeModel;
