import { post, get } from "../api/httpProvider";
import { URL_API } from "../api/apiUrl";

export const GetDanhSachTieuChiNhanXet = async (inputParam) => {
  try {
    console.log("PARAM==>",inputParam);
    return await post(URL_API.NHAN_XET.GET_DANHSACH_TIEUCHI_NHANXET,inputParam,null).then(async (response) => {
      return response.data;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const GetTongHopNhanXet = async (inputParam) => {
  try {
    console.log("PARAM==>",inputParam);
    return await post(URL_API.NHAN_XET.GET_TONG_HOP_NHANXET,inputParam,null).then(async (response) => {
      return response.data;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const SaveNhanXet = async (inputParam) => {
  try {
    console.log("PARAM==>",inputParam);
    return await post(URL_API.NHAN_XET.SAVE_NHAN_XET,inputParam,null).then(async (response) => {
      return response.data;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};