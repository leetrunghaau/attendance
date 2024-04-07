import { DMDOT_CONST } from '../constans/DMDotConstant'
import { GetDanhMucDot, GetCauHinhThoiGianByIdDot } from '../../Services/DanhMuc.service'

export const startLoadingAsnc = () => {
    return {
        type: DMDOT_CONST.DMDOT_BEGIN_LOAD,
    };
};

export const loadingSuccessAsnc = (data) => {
    return {
        type: DMDOT_CONST.DMDOT_LOAD_SUCCESS,
        payload: data
    };
};

export const loadingFailAsnc = () => {
    return {
        type: DMDOT_CONST.DMDOT_LOAD_FAIL,
    };
};

export const setSelectedAsnc = (item) => {
    return {
        type: DMDOT_CONST.DMDOT_SET_SELECTED,
        payload: item
    };
};

export const LoadDanhMucDot = (param) => {
    return async dispatch => {
        dispatch(startLoadingAsnc());
        const result = await GetDanhMucDot(param)
        if (result) {
            if (result.status == "Ok") {
                dispatch(loadingSuccessAsnc(result.data))
            }
            else {
                dispatch(loadingFailAsnc())
            }
        }
        else {
            dispatch(loadingFailAsnc());
        }

    };
};

export const loadCauHinhThoiGianByIdDot = async (param) => {
    const res = await GetCauHinhThoiGianByIdDot(param)
    if (res && res.status == "Ok") {
        return res.data;
    } else {
        return null;
    }
}
