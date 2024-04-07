import { PHIEU_NHAP_XUAT_CONST } from "../constans/PhieuNhapXuatConstant";

export const loadDanhSachPhieuXuatFail = errMsg => {
  return {
    type: PHIEU_NHAP_XUAT_CONST.LOAD_DANH_SACH_PHIEU_FAIL,
    error: errMsg
  };
};

export const setDanhSachPhieuXuat = data => {
  return {
    type: PHIEU_NHAP_XUAT_CONST.SET_DANH_SACH_PHIEU_XUAT,
    payload: data
  };
};