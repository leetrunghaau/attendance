
import { post, get } from "../api/httpProvider";
import { URL_API } from "../api/apiUrl";

export const getDanhSachUser = async () => {
  try {
    return await get(URL_API.PHANQUYEN.GET_DANH_SACH_USER,null,null).then(async (response) => {
      return response.data;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const checkUserValid = async (inputParam) => {
  try {
    return await post(URL_API.PHANQUYEN.CHECK_USER_VALID,inputParam, null).then(async (response) => {
      return response.data;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const addOrUpdateUser = async (inputParam) => {
  try {
    return await post(URL_API.PHANQUYEN.ADD_UPDATE_USER,inputParam, null).then(async (response) => {
      return response.data;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
