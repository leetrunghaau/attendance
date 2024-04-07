import {LOADING_CONST} from '../constans/LoadingConstant'

export const initialState = {
    showLoading:false  
};

export const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_CONST.LOADING_SHOW:
            console.log("REDUCER SHOW");
            return {
                ...state,
                showLoading:true
            };
            case LOADING_CONST.LOADING_HIDE:
            console.log("REDUCER FALSE");
                return {
                    ...state,
                    showLoading:false
                };
        default:
            return {
                ...state              
            }
    }
};