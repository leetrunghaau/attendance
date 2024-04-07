import DMNHASANXUAT_CONST from '../constans/DMNhaSanXuatConstant';

const initialState = {
  listNhaSanXuat: [],
  isLoading: true,
  error: null,
};

const dmNhaSanXuatReducer = (state = initialState, action) => {
  switch (action.type) {
    case DMNHASANXUAT_CONST.START_LOAD_DMUC_NHASANXUAT:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case DMNHASANXUAT_CONST.FINISH_LOAD_DMUC_NHASANXUAT:
      return {
        ...state,
        listNhaSanXuat: action.payload,
        isLoading: false,
      };
    case DMNHASANXUAT_CONST.FAILED_LOAD_DMUC_NHASANXUAT:
      return {
        ...state,
        listNhaSanXuat: [],
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default dmNhaSanXuatReducer;
