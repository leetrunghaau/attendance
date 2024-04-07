import {DMDONVI_CONST} from '../constans/DMDonViConstant'

export const initialState = {
    loading:false,
    message: "",   
    data:[],
    donViSelected:null,
};

export const dmDonViReducer = (state = initialState, action) => {
    switch (action.type) {
        case DMDONVI_CONST.DMDONVI_BEGIN_LOAD:
            return {
                ...state,
                loading:true,
                message:""
            };
        case DMDONVI_CONST.DMDONVI_LOAD_FAIL:
            return {
                ...state,
                loading: false,
                message:"Load danh mục đơn vị thất bại"
            };
        case DMDONVI_CONST.DMDONVI_LOAD_SUCCESS:
            return {
                ...state,
                loading: false,
                message:"",
                data:action.payload,
                //donViSelected:action.payload[0],
            };   
        case DMDONVI_CONST.DMDONVI_SET_SELECTED:
            return {
                ...state,
                donViSelected:action.payload,
            };       
        default:
            return {
                ...state              
            }
    }
};