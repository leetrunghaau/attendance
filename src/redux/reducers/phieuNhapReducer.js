import { PHIEU_NHAP_XUAT_CONST } from "../constans/PhieuNhapXuatConstant";

const initialState = {
  danhSachPhieuNhap: [],
  error: null,
};

const phieuNhapReducer = (state = initialState, action) => {
  switch (action.type) {
    case PHIEU_NHAP_XUAT_CONST.SET_DANH_SACH_PHIEU_NHAP:
      return {
        ...state,
        danhSachPhieuNhap: action.payload,
        error: null,
      };
    case PHIEU_NHAP_XUAT_CONST.LOAD_DANH_SACH_FAIL:
      return {
        ...state,
        danhSachPhieuNhap:[],
        error: action.error,
      };
    default:
      return state;
  }
};

export default phieuNhapReducer;