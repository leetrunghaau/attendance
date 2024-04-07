import { post, get } from "../api/httpProvider";
import { URL_API } from "../api/apiUrl";

export const GetDanhSachTieuChiChamDiem = async (inputParam) => {
  try {
    console.log("PARAM==>",inputParam);
    return await post(URL_API.CHAM_DIEM.GET_DANHSACH_TIEUCHI_CHAMDIEM,inputParam,null).then(async (response) => {
      return response.data;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const SaveChamDiem = async (inputParam) => {
  try {
    console.log("PARAM==>",inputParam);
    return await post(URL_API.CHAM_DIEM.SAVE_CHAM_DIEM,inputParam,null).then(async (response) => {
      return response.data;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};