import { combineReducers } from 'redux';
import { loginReducer } from './loginReducer';
import { loadingReducer } from './loadingReducer';
import { dmDonViReducer } from './dmDonViReducer';
import { dmDotReducer } from './dmDotReducer';
import { showFileReducer } from './showFileReducer';
import { dmNamReducer } from './dmNamReducer';

import dmNhaSanXuatReducer from './dmNhaSanXuatReducer';
import phieuXuatReducer from './phieuXuatReducer';
import phieuNhapReducer from './phieuNhapReducer';
import { LOGIN_CONST } from '../constans/LoginConstant';

// declare reducers here
const rootReducers = (state, action) => {
  if (action.type === LOGIN_CONST.LOGOUT) {
    state = undefined;
  }
  return allReducers(state, action);
};

const allReducers = combineReducers({
  login: loginReducer,
  loading: loadingReducer,
  dmDonVi: dmDonViReducer,
  dmDot: dmDotReducer,
  showFile: showFileReducer,
  namKeHoachTong: dmNamReducer,

  dmNhaSanXuat: dmNhaSanXuatReducer,
  phieuNhap: phieuNhapReducer,
  phieuXuat: phieuXuatReducer,
});

export default rootReducers;
