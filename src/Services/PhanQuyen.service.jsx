import { post, get } from "../api/httpProvider";
import { URL_API } from "../api/apiUrl";

export const GetChucNang = async (inputParam) => {
  try {
    return await get(
      URL_API.PHANQUYEN.GET_CHUCNANG,
      inputParam,
      null
    ).then(async (response) => {
      return response.data;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const saveThayDoiTree = async (inputParam) => {
  try {
    return await post(
      URL_API.PHANQUYEN.UPDATE_TREE_CHUC_NANG,
      inputParam,
      null
    ).then(async (response) => {
      return response.data;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};


export const AddUpdateDMChucNang = async (params) => {
  console.log("==== Thêm DM chức năng ====", params);

  try {
      return await post(URL_API.PHANQUYEN.ADD_UPDATE_DANH_MUC_CHUC_NANG, params, null).then(async response => {
          return response.data;
      });
  } catch (error) {
      console.log(error);
      return null;
  }
};

// export const UpdateTreeChucNang = async (params) => {
//   try {
//       return await post(URL_API.PHANQUYEN.ADD_UPDATE_DANH_MUC_CHUC_NANG, params, null).then(async response => {
//           return response.data;
//       });
//   } catch (error) {
//       console.log(error);
//       return null;
//   }
// };