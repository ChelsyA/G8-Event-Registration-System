import React from "react";
import Auxiliary from "../../hoc/Auxiliary";
import Login from './Login/Login';
import Register from './Register/Register';

const FormPanel = (props) => {
  return (
    <Auxiliary>
        <Login />
        <Register />
    </Auxiliary>
  );
};

export default FormPanel;
