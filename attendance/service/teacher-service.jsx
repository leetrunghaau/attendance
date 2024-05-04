import { URL_API } from "../api/apiUrl";
import { getProvider, postProvider, putProvider, deleteProvider } from "../api/httpProvider";



export const getListTeacher = async () => {
  try {
    return await getProvider(
      URL_API.TEACHER.GETS,
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
export const updateTeacher = async (inputParam) => {
  try {
    return await putProvider(
      URL_API.TEACHER.UPDATE,
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
export const createTeacher = async (inputParam) => {
  try {
    return await postProvider(
      URL_API.TEACHER.CREATE,
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
export const deleteTeacher = async (inputParam) => {
  try {
    return await deleteProvider(
      URL_API.TEACHER.DELETE + inputParam,
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