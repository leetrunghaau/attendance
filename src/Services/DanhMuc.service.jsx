import { post, get } from "../api/httpProvider";
import { URL_API } from "../api/apiUrl";
import { async } from "q";

export const GetDanhMucDonVi = async () => {
  try {
    return await get(URL_API.DANHMUC.GET_DANHMUC_DONVI, null, null).then(async (response) => {
      //console.log("DM DON VI===>",response.data);
      return response.data;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const GetDanhMucDot = async (inputParam) => {
  try {
    return await get(URL_API.DANHMUC.GET_DANHMUC_DOT, inputParam, null).then(async (response) => {
      return response.data;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const GetCauHinhThoiGianByIdDot = async (inputParam) => {
  try {
    return await get(URL_API.DOT.GET_THOI_GIAN, inputParam, null).then(async (response) => {
      return response.data;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const GetDanhMucKhoi = async (inputParam) => {
  try {
    return await get(URL_API.DANHMUC.GET_DANHMUC_KHOI, inputParam, null).then(async (response) => {
      return response.data;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const GetDanhMucQuyen = async () => {
  try {
    return await get(URL_API.DANHMUC.GET_DANHMUC_QUYEN, null, null).then(async (response) => {
      return response.data;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};