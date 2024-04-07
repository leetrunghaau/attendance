import {LOGIN_CONST} from '../constans/LoginConstant'
import { LocalStorageKey } from '../../Util/define';
import { Login as LoginService } from '../../Services/Login.service'
import SweetAlert from 'sweetalert2';
export const startLoginAsnc = () => {
    return {
        type: LOGIN_CONST.BEGIN_LOGIN,
    };
};
export const loginSuccessAsnc = (data) => {
    return {
        type: LOGIN_CONST.LOGIN_SUCCESS,
        payload: data
    };
};
export const loginFailAsnc = () => {
    return {
        type: LOGIN_CONST.LOGIN_FAIL,
    };
};

export const logout = () => {
    return {
        type: LOGIN_CONST.LOGOUT,
    }
}

export const Login = param => {
    console.log(param);
    return async dispatch => {
        dispatch(startLoginAsnc());
        const result = await LoginService(param)
        console.log("RESULT==>",result);
        if (result) {
            if (result.status == "Ok") {
                localStorage.setItem(LocalStorageKey.LoginInfo, JSON.stringify(result.data) );
                dispatch(loginSuccessAsnc(result.data))
            }
            else
            {
                SweetAlert.fire({ title: 'Thông báo', text: 'Đăng nhập không thành công, vui lòng thử lại.', icon: 'error', confirmButtonText: 'Đóng', });
                dispatch(loginFailAsnc())
            }
        }
        else {
            SweetAlert.fire({ title: 'Thông báo', text: 'Đăng nhập không thành công, vui lòng thử lại.', icon: 'error', confirmButtonText: 'Đóng', });
            dispatch(loginFailAsnc());
        }

    };
};
