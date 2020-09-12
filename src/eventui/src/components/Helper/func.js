import moment from 'moment';

export const isExpired = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const expire = user === null ? new Date() : user.expireDate;
    const nowDate = new Date();
    const mNowDate = moment(nowDate);
    const mExpectedDate = moment(expire);
    
    return mExpectedDate.diff(mNowDate, "days") === 0;
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