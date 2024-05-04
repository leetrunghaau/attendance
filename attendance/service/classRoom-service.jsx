import { URL_API } from "../api/apiUrl";
import { getProvider, postProvider, putProvider, deleteProvider } from "../api/httpProvider";



export const getListClassRoom = async () => {
  try {
    return await getProvider(
      URL_API.CLASS_ROOM.GETS,
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
export const updateClassRoom = async (inputParam) => {
  try {
    return await putProvider(
      URL_API.CLASS_ROOM.UPDATE,
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
export const createClassRoom = async (inputParam) => {
  try {
    return await postProvider(
      URL_API.CLASS_ROOM.CREATE,
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
export const deleteClassRoom = async (inputParam) => {
  try {
    return await deleteProvider(
      URL_API.CLASS_ROOM.DELETE + inputParam,
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