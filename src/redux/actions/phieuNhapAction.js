import { PHIEU_NHAP_XUAT_CONST } from "../constans/PhieuNhapXuatConstant";

export const loadDanhSachPhieuNhapFail = errMsg => {
  return {
    type: PHIEU_NHAP_XUAT_CONST.LOAD_DANH_SACH_PHIEU_FAIL,
    error: errMsg
  };
};

export const setDanhSachPhieuNhap = data => {
  return {
    type: PHIEU_NHAP_XUAT_CONST.SET_DANH_SACH_PHIEU_NHAP,
    payload: data
  };
};