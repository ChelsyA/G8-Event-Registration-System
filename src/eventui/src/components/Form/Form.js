import React from "react";
import Auxiliary from "../../hoc/Auxiliary";
import Login from "./Login/Login";
import Register from "./Register/Register";

const FormPanel = (props) => {
  return (
    <Auxiliary>
      {props.isLogin ? (
        <Login
          back={props.onBack}
          islogin={props.isLogin}
          submitLogin={props.onLogin}
        />
      ) : (
        <Register
          back={props.onBack}
          isregister={props.isRegister}
          submitRegister={props.onRegister}
        />
      )}
    </Auxiliary>
  );
};

export default FormPanel;
