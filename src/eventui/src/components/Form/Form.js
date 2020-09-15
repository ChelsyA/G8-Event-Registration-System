import React from "react";
import Auxiliary from "../../hoc/Auxiliary";
import Login from './Login/Login';
import Register from './Register/Register';

const FormPanel = (props) => {

  return (
    <Auxiliary>
        {props.isLogin ? <Login islogin={props.isLogin} submitLogin={props.onLogin} /> : <Register isregister={props.isRegister} submitRegister={props.onRegister} /> }
    </Auxiliary>
  );
};

export default FormPanel;
