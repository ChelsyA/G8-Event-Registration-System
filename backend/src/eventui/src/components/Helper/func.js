import moment from 'moment';

export const isExpired = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const expire = user === null ? new Date() : user.expire;
    const nowDate = new Date();
    const mNowDate = moment(nowDate);
    const mExpectedDate = moment(expire);
    
    return mExpectedDate.diff(mNowDate, "days") === 0;
}