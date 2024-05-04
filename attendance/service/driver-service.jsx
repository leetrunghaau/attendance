import { URL_API } from "../api/apiUrl";
import { getProvider, postProvider, putProvider, deleteProvider } from "../api/httpProvider";



export const getListDriver = async () => {
  try {
    return await getProvider(
      URL_API.DRIVER.GETS,
      null,
      null
    ).then(async (response) => {
      return response.data;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const updateDriver = async (inputParam) => {
  try {
    return await putProvider(
      URL_API.DRIVER.UPDATE,
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
export const createDriver = async (inputParam) => {
  try {
    return await postProvider(
      URL_API.DRIVER.CREATE,
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
export const deleteDriver = async (inputParam) => {
  try {
    return await deleteProvider(
      URL_API.DRIVER.DELETE + inputParam,
      null,
      null
    ).then(async (response) => {
      return response.data;
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};