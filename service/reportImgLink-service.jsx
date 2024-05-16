import { URL_API } from "../api/apiUrl";
import { getProvider, postProvider, putProvider, deleteProvider } from "../api/httpProvider";



export const getListImgLink = async (inputParam) => {
  try {
    return await getProvider(
      URL_API.REPORT_IMG.GETS + inputParam,
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