import {DMNAM_CONST} from '../constans/DMNamConstant'

export const initialState = {
    loading:false,
    message: "",   
    data:[],
    namSelected:null,
};

export const dmNamReducer = (state = initialState, action) => {
    switch (action.type) {
        case DMNAM_CONST.DMNAM_BEGIN_LOAD:
            return {
                ...state,
                loading:true,
                message:""
            };
        case DMNAM_CONST.DMNAM_LOAD_FAIL:
            return {
                ...state,
                loading: false,
                message:"Load danh mục năm thất bại"
            };
        case DMNAM_CONST.DMNAM_LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                message:"",
                data:action.payload, 
            };   
        case DMNAM_CONST.DMNAM_SET_SELECTED:
            return {
                ...state,
                namSelected:action.payload,
            };       
        default:
            return {
                ...state              
            }
    }
};