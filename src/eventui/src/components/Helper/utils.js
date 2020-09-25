import moment from 'moment';
import axios from 'axios';
import  * as consts  from '../../store/constants';

export const getEvents = () => {
  return axios.get(`${consts.EVENTAPP_URL}events/`).then(res => res.data)
}

export const getUser = () => isExpired ? JSON.parse(localStorage.getItem("user")) : null;

export const isExpired = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const expire = user === null ? new Date() : user.expireDate;
    const nowDate = new Date();
    const mNowDate = moment(nowDate);
    const mExpectedDate = moment(expire);
    console.log(mExpectedDate.diff(mNowDate))
    return mExpectedDate.diff(mNowDate) <= 0;
}

export const count = (num) => {
    if (num <= 0) return [];
    if (isNaN(num)) return [];
    let arr = []
    for (let i = 0; i <= num; i++) {
        arr.push(i);
    }
    return arr;
}

export const feedback = (id, passed, text="", isEvent = false) => {
    const fieldId = document.getElementById(id);
    const feedbackId = document.getElementById(id + "_feedback");
    if (isEvent) {
      fieldId.classList.remove("is-invalid");
      feedbackId.classList.add("is-invisible");
      feedbackId.classList.remove("is-visible");
    } else {
      if (!passed) {
        fieldId.classList.add("is-invalid");
        feedbackId.classList.add("is-visible");
        feedbackId
          .classList.remove("is-invisible");
        if (text !== "") {
          feedbackId.innerText = text;
        }
      } else {
        fieldId.classList.remove("is-invalid");
        feedbackId.classList.add("is-invisible");
        feedbackId.classList.remove("is-visible");
      }
    }
  };

export const getCookies = (name) => {
  var cookies = {};
  if (document.cookie && document.cookie !== '') {
      document.cookie.split(';').forEach(function (c) {
          var m = c.trim().match(/(\w+)=(.*)/);
          if(m !== undefined) {
              cookies[m[1]] = decodeURIComponent(m[2]);
          }
      });
  }
  if (name) {
      return cookies[name]
  }
  return cookies;
}