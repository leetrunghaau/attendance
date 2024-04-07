import {SHOWFILE_CONST} from '../constans/ShowFileConstant'
export const showHideFile = (isShow) => {
    return {
        type: SHOWFILE_CONST.SHOWFILE_SHOW_HIDE_POPUP,
        payload:isShow
    };
};
export const setData = (data) => {
    console.log("DATA ACTION====>",data);
    return {
        type: SHOWFILE_CONST.SHOWFILE_SETDATA,
        payload: data
    };
};

