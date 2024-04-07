import {DMNAM_CONST} from '../constans/DMNamConstant'  
import dayjs from 'dayjs';
import { GetDanhMucNumber } from '../../Util/Utils';

export const startLoadingAsnc = () => {
    return {
        type: DMNAM_CONST.DMNAM_BEGIN_LOAD,
    };
};
export const loadingSuccessAsnc = (data) => {
    return {
        type: DMNAM_CONST.DMNAM_LOAD_SUCCESS,
        payload: data
    };
};
export const loadingFailAsnc = () => {
    return {
        type: DMNAM_CONST.DMNAM_LOAD_FAIL,
    };
};

export const setSelectedAsnc = (item) => {
    return {
        type: DMNAM_CONST.DMNAM_SET_SELECTED,
        payload: item
    };
};

export const LoadDanhMucNam = () => {
    console.log("ACTION LOAD DANH MUC NAM");
    return async dispatch => {
        dispatch(startLoadingAsnc()); 
       // const result = await GetDanhMucDonVi()  
        const result =   GetDanhMucNumber(dayjs().year() + 1, 2014, 1, "");     
        let item = { value: -1, label: `Tất cả` };
        result.unshift(item); 
        dispatch(loadingSuccessAsnc(result));
    };
};
