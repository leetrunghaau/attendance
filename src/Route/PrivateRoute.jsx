import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { authHeader, handleResponse } from '../Services/fack.backend';
import { LocalStorageKey } from '../Util/define';

const PrivateRoute = () => {
  //const [login, setLogin] = useState(JSON.parse(localStorage.getItem('login')));
  //const [authenticated, setAuthenticated] = useState(false);

  const getToken=()=>{
    const loginInfo = JSON.parse(localStorage.getItem(LocalStorageKey.LoginInfo));
      if (loginInfo) {
        return (loginInfo.token);
    }
    return null;
  }
  const jwt_token=getToken();


  useEffect(() => {
    
    const requestOptions = { method: 'GET', headers: authHeader() };
    fetch('/users', requestOptions).then(handleResponse);
    //setAuthenticated(JSON.parse(localStorage.getItem('authenticated')));

    //localStorage.setItem('authenticated', authenticated);
    //localStorage.setItem('login', login);
  }, []);
  return jwt_token ? <Outlet /> : <Navigate exact to={`${process.env.PUBLIC_URL}/login`} />;
};

export default PrivateRoute;
