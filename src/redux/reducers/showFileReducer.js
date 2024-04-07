import {SHOWFILE_CONST} from '../constans/ShowFileConstant'

export const initialState = {
    showModal:false,   
    FileBase64:"",
    Extension:"",
    FileName:""
};

export const showFileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOWFILE_CONST.SHOWFILE_SHOW_HIDE_POPUP:
            return {
                ...state,
                showModal:action.payload
            };
        case SHOWFILE_CONST.SHOWFILE_SETDATA:
            return {
                ...state,
                FileBase64: action.payload.FileBase64,
                Extension:action.payload.Extension,
                FileName:action.payload.FileName
            };             
        default:
            return {
                ...state              
            }
    }
};