import { URL_API } from "../api/apiUrl";
import { getProvider, postProvider, putProvider, deleteProvider } from "../api/httpProvider";




export const getTeacherAttendence = async (inputParam) => {
  try {
    return await postProvider(
      URL_API.ATTENDENCE.TEACCHER,
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
export const getStudentAttendence = async (inputParam) => {
  try {
    return await postProvider(
      URL_API.ATTENDENCE.STUDENT,
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
