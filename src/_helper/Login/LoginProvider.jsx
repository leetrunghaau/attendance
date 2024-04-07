import Context from './index';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {LocalStorageKey} from '../../Util/define';


const LoginProvider = (props) => {
    const [loginInfo, setLoginInfo] = useState(null);
    useEffect(()=>{
        if(loginInfo==null) return;
        localStorage.setItem(LocalStorageKey.LoginInfo, JSON.stringify(loginInfo) );
        console.log("AAAAAAAAAAA=======>",loginInfo);
    },[loginInfo])

    return (
        <Context.Provider
            value={{
                ...props,
                loginInfo,
                setLoginInfo              
            }}
        >
            {props.children}
        </Context.Provider>
    );
};

export default LoginProvider;
