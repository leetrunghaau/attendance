import Axios from 'axios';
import { LocalStorageKey } from '../Util/define';

export const postProvider = async (url, data, param = null, responseType = 'json') => {  //responseType=arraybuffer/stream/json
    let token = '';
    const loginInfo = JSON.parse(localStorage.getItem(LocalStorageKey.LoginInfo));
    if (loginInfo) {
        token = loginInfo.token;
    }
   
    try {
        return Axios.post(url, data, {
            responseType: responseType,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                Authorization: `Bearer ${token}`,
            },
            params: param ? param : null,
            timeout: 30000
        }).catch(e => {
            console.log("Error : ", url)
            console.log(e)
            return e;
        });
    } catch (error) {
        return null;
    }
};

export const postForFromFrom = async (url, data, param = null, responseType = 'json') => {  //responseType=arraybuffer/stream/json
    let token = '';
    const loginInfo = JSON.parse(localStorage.getItem(LocalStorageKey.LoginInfo));
    if (loginInfo) {
        token = loginInfo.token;
    }
    try {
        return Axios.post(url, data, {
            responseType: responseType,
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
            params: param ? param : null,
            timeout: 30000
        }).catch(e => {
            console.log("Error : ", url)
            console.log(e)
            return e;
        });
    } catch (error) {
        return null;
    }
};

export const getProvider = async (url, params, header, timeout = 30000) => {
    let token = '';
    const loginInfo = JSON.parse(localStorage.getItem(LocalStorageKey.LoginInfo));
    if (loginInfo) {
        token = loginInfo.token;
    } 

    let headers = {
        ...header,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
    }
   
    //console.log("START CALL GET");
    try {
        return Axios.get(url, {
            params: params,
            timeout: timeout,
            headers: headers,
        }).catch(e => {
            console.log("Error : ", url)
            console.log(e)
            return e;
        });
    } catch (error) {
        console.log("GET EXCEPTION==>", error);
        return null;
    }
};

export const putProvider = async (url, data) => {
    let token = '';
    const loginInfo = JSON.parse(localStorage.getItem(LocalStorageKey.LoginInfo));
    if (loginInfo) {
        token = loginInfo.token;
    }

    try {
        return Axios.put(url, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }).catch(e => {
            console.log("Error : ", url)
            console.log(e)
            return e;
        });
    } catch (error) {
        return null;
    }
};
export const deleteProvider = async (url, data) => {
    let token = '';
    const loginInfo = JSON.parse(localStorage.getItem(LocalStorageKey.LoginInfo));
    if (loginInfo) {
        token = loginInfo.token;
    }

    try {
        return Axios.delete(url, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }).catch(e => {
            console.log("Error : ", url)
            console.log(e)
            return e;
        });
    } catch (error) {
        return null;
    }
};
export const upload = async (url, formData) => {
    console.log("FORMDATA----", formData);
    let token = '';
    const loginInfo = JSON.parse(localStorage.getItem(LocalStorageKey.LoginInfo));
    if (loginInfo) {
        token = loginInfo.token;
    }
    let headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
    };
    try {
        return await Axios.post(url, formData, {
            headers: headers,
        }).then(x => {
            return x;
        }).catch(e => {
            console.log('catch', JSON.stringify(e))
            return null;
        });
    } catch (error) {
        return null;
    }

};