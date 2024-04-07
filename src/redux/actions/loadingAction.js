import {LOADING_CONST} from '../constans/LoadingConstant'
import { LocalStorageKey } from '../../Util/define';
import { Login as LoginService } from '../../Services/Login.service'

export const showLoading = () => {
    return {
        type: LOADING_CONST.LOADING_SHOW,
    };
};
export const hideLoading = (data) => {
    return {
        type: LOADING_CONST.LOADING_HIDE,
    };
};

