import {LOGIN_CONST} from '../constans/LoginConstant'

export const initialState = {
    token: null,
    loading:false,
    message: "",   
    details:null,
    admin: false,
    permission:{}
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_CONST.BEGIN_LOGIN:
            return {
                ...state,
                loading:true,
                message:""
            };
        case LOGIN_CONST.LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                token:null,
                message:"Đăng nhập thất bại",
                permission:{}
            };
        case LOGIN_CONST.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                message:"",
                token: action.payload.token,
                details:action.payload.details,
                //permission:action.payload.permission
            };
        case LOGIN_CONST.LOGOUT:
            return {
                ...state,
                loading: false,
                message:"",
                token: null,
                permission:{}
            }
        default:
            return {
                ...state              
            }
    }
};