
import { post, get, postForFromFrom } from "../api/httpProvider";
import { URL_API } from "../api/apiUrl";

export const getDanhSachFile = async (IdParentPA) => {
  try {
    return await get(URL_API.LUU_FILE.GET_DANH_SACH_LUU_FILE, { IdParent: IdParentPA }, null).then(async (response) => {
      return response.data;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getDanhSachThuMuc = async () => {
  try {
    return await get(URL_API.LUU_FILE.GET_DANH_SACH_THU_MUC, null, null).then(async (response) => {
      return response.data;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getFullFile = async () => {
  try {
    return await get(URL_API.LUU_FILE.GET_FULL_FILE, null, null).then(async (response) => {
      return response.data;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const themThuMuc = async (IdParentPA) => {
  try {
    return await post(URL_API.LUU_FILE.THEM_THU_MUC, { idParent: IdParentPA }, null).then(async (response) => {
      return response.data;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const xoaFiles = async (fileParam) => {
  try {
    return await post(URL_API.LUU_FILE.XOA_FILES, fileParam, null).then(async (response) => {
      return response.data;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const suaTenFile = async (id, newName) => {
  try {
    return await post(URL_API.LUU_FILE.SUA_TEN_FILE, { id: id, newName: newName }, null).then(async (response) => {
      return response.data;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const uploadFiles = async (uploadParam) => {
  try {
    return await postForFromFrom(URL_API.LUU_FILE.UPLOAD_FILE, uploadParam, null).then(async (response) => {
      return response.data;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const moveFiles = async (param) => {
  try {
    return await post(URL_API.LUU_FILE.MOVE_FILES, param, null).then(async (response) => {
      return response.data;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const downloadFile = async (param) => {
  try {
    return await post(URL_API.LUU_FILE.DOWNLOAD_FILE, param, null).then(async (response) => {
      return response.data;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};