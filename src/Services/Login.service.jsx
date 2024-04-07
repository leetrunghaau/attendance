import { post,get } from '../api/httpProvider';
import { URL_API } from '../api/apiUrl';

export const Login = async (inputParam) => {
    try {
        return await post(URL_API.LOGIN.GET_TOKEN,inputParam).then(async response => {
            return response.data;
        });
    } catch (error) {
        console.log(error);
        return null;
    }
};

