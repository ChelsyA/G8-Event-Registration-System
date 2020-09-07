import moment from 'moment';

export const diffDate = (nowDate, expectedDate) => {
    const mNowDate = moment(nowDate);
    const mExpectedDate = moment(expectedDate);
    
    return mNowDate.diff(mExpectedDate, "days");
}