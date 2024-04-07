import {DMDOT_CONST} from '../constans/DMDotConstant'

export const initialState = {
    loading:false,
    message: "",   
    data:[],
    dotSelected:null,
};

export const dmDotReducer = (state = initialState, action) => {
    switch (action.type) {
        case DMDOT_CONST.DMDOT_BEGIN_LOAD:
            return {
                ...state,
                loading:true,
                message:""
            };
        case DMDOT_CONST.DMDOT_LOAD_FAIL:
            return {
                ...state,
                loading: false,
                message:"Load danh mục đợt thất bại"
            };
        case DMDOT_CONST.DMDOT_LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                message:"",
                data:action.payload,
                //khoSelected:action.payload[0],
            };   
        case DMDOT_CONST.DMDOT_SET_SELECTED:
            return {
                ...state,
                dotSelected:action.payload,
            };       
        default:
            return {
                ...state              
            }
    }
};