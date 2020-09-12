import axios from "axios";
import * as consts from './constants';

export const logout = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  axios.post(`${consts.DJ_AUTH_URL}login\\`, {}, {
    headers: { 'TOKEN ': + user.token }
  }).then(function(response) {
    console.log('Authenticated');
  }).catch(function(error) {
    console.log('Error on Authentication');
  });
  localStorage.removeItem("user");
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authSuccess = user => {
  return {
    type: consts.AUTH_SUCCESS,
    user
  };
};

export const authFail = error => {
  return {
    type: consts.AUTH_FAIL,
    error: error
  };
};

export const authCheckState = () => {
  return dispatch => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === undefined || user === null) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(user.expirationDate);
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(user));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

export const checkExpiredDate = () => {
  let isExpired = false;
  const user = JSON.parse(localStorage.getItem("user"));
  const expireDate = new Date(user.expireDate);
  const expireTime = (expireDate.getTime() - new Date().getTime()) / 1000;
  setTimeout(() => {
    // set isauthenticated
  }, expireTime * 1000);
}
