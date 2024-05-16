import { URL_API } from "../api/apiUrl";
import { getProvider, postProvider, putProvider, deleteProvider } from "../api/httpProvider";



export const getListLesson = async () => {
  try {
    return await getProvider(
      URL_API.LESSON.GETS,
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
export const updateLesson = async (inputParam) => {
  try {
    return await putProvider(
      URL_API.LESSON.UPDATE,
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
export const createLesson = async (inputParam) => {
  try {
    return await postProvider(
      URL_API.LESSON.CREATE,
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
export const deleteLesson = async (inputParam) => {
  try {
    return await deleteProvider(
      URL_API.LESSON.DELETE + inputParam,
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