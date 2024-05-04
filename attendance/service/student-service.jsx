import { URL_API } from "../api/apiUrl";
import { getProvider, postProvider, putProvider, deleteProvider } from "../api/httpProvider";



export const getListStudent = async (inputParam) => {
    try {
        return await getProvider(
            URL_API.STUDENT.GETS + inputParam,
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
export const updateStudent = async (inputParam) => {
    try {
        return await putProvider(
            URL_API.STUDENT.UPDATE,
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
export const createStudent = async (inputParam) => {
    try {
        return await postProvider(
            URL_API.STUDENT.CREATE,
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
export const deleteStudent = async (inputParam) => {
    try {
        return await deleteProvider(
            URL_API.STUDENT.DELETE + inputParam,
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