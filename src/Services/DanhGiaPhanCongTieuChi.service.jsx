import { post, get } from "../api/httpProvider";
import { URL_API } from "../api/apiUrl";

export const GetDanhSachTieuChiPhanCong = async (inputParam) => {
  try {
    console.log("PARAM==>",inputParam);
    return await post(URL_API.TIEUCHI_PHANCONG.GET_DANHSACH_TIEUCHI_PHANCONG,inputParam,null).then(async (response) => {
      return response.data;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const LuuTieuChiPhanCong = async (inputParam) => {
  try {
    console.log("PARAM==>",inputParam);
    return await post(URL_API.TIEUCHI_PHANCONG.LUU_TIEUCHI_PHANCONG,inputParam,null).then(async (response) => {
      return response.data;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

