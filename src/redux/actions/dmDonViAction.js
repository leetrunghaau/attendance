import {DMDONVI_CONST} from '../constans/DMDonViConstant'
import { LocalStorageKey } from '../../Util/define';
import { GetDanhMucDonVi } from '../../Services/DanhMuc.service'
import SweetAlert from 'sweetalert2';
export const startLoadingAsnc = () => {
    return {
        type: DMDONVI_CONST.DMDONVI_BEGIN_LOAD,
    };
};
export const loadingSuccessAsnc = (data) => {
    return {
        type: DMDONVI_CONST.DMDONVI_LOAD_SUCCESS,
        payload: data
    };
};
export const loadingFailAsnc = () => {
    return {
        type: DMDONVI_CONST.DMDONVI_LOAD_FAIL,
    };
};

export const setSelectedAsnc = (item) => {
    return {
        type: DMDONVI_CONST.DMDONVI_SET_SELECTED,
        payload: item
    };
};

export const LoadDanhMucDonVi = () => {
    console.log("ACTION LOAD DANH MUC DON VI");
    return async dispatch => {
        dispatch(startLoadingAsnc()); 
        const result = await GetDanhMucDonVi()
        //console.log("RESULT DM DON VI==>",result);
        if (result) {
            if (result.status == "Ok") {
                dispatch(loadingSuccessAsnc(result.data))
            }
            else
            {
                //SweetAlert.fire({ title: 'Thông báo', text: 'Đăng nhập không thành công, vui lòng thử lại.', icon: 'error', confirmButtonText: 'Đóng', });
                dispatch(loadingFailAsnc())
            }
        }
        else {
            //SweetAlert.fire({ title: 'Thông báo', text: 'Đăng nhập không thành công, vui lòng thử lại.', icon: 'error', confirmButtonText: 'Đóng', });
            dispatch(loadingFailAsnc());
        }

    };
};
