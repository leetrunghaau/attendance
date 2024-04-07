import { post, get } from "../api/httpProvider";
import { URL_API } from "../api/apiUrl";

export const GetDanhSachTieuChi = async (inputParam) => {
  try {
    console.log("PARAM==>",inputParam);
    return await post(URL_API.DMTIEUCHI.GET_DANHMUC_TIEUCHI,inputParam,null).then(async (response) => {
      return response.data;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const AddOrUpdateTieuChi = async (inputParam) => {
  try {
    console.log("PARAM==>",inputParam);
    return await post(URL_API.DMTIEUCHI.ADD_OR_UPDATE_TIEUCHI,inputParam,null).then(async (response) => {
      return response.data;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const XoaTieuChi = async (inputParam) => {
  try {
    console.log("PARAM==>",inputParam);
    return await post(URL_API.DMTIEUCHI.XOA_TIEUCHI,inputParam,null).then(async (response) => {
      return response.data;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
