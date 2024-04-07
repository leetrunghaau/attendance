import DMNHASANXUAT_CONST from '../constans/DMNhaSanXuatConstant';

export const startLoadDMNhaSanXuat = () => {
    return {
        type: DMNHASANXUAT_CONST.START_LOAD_DMUC_NHASANXUAT,
    };
};

export const finishLoadDMNhaSanXuat = data => {
    return {
        type: DMNHASANXUAT_CONST.FINISH_LOAD_DMUC_NHASANXUAT,
        payload: data,
    };
};

export const failedLoadDMNhaSanXuat = error => {
    return {
        type: DMNHASANXUAT_CONST.FAILED_LOAD_DMUC_NHASANXUAT,
        payload: error,
    };
};