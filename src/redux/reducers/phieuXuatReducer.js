import { PHIEU_NHAP_XUAT_CONST } from "../constans/PhieuNhapXuatConstant";

const initialState = {
  danhSachPhieuXuat: [],
  error: null,
};

const phieuXuatReducer = (state = initialState, action) => {
  switch (action.type) {
    case PHIEU_NHAP_XUAT_CONST.SET_DANH_SACH_PHIEU_XUAT:
      return {
        ...state,
        danhSachPhieuXuat: action.payload,
        error: null,
      };
    case PHIEU_NHAP_XUAT_CONST.LOAD_DANH_SACH_PHIEU_FAIL:
      return {
        ...state,
        danhSachPhieuXuat:[],
        error: action.error,
      };
    default:
      return state;
  }
};

export default phieuXuatReducer;