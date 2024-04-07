import React, { Fragment } from 'react';
import { Route, Routes,useLocation } from 'react-router-dom';

import { routesDanhGiaCanBo } from './RoutesDanhGiaCanBo';
import AppLayout from '../Layout/Layout';
import { AnimatePresence } from "framer-motion"
import { useSelector } from 'react-redux';

const LayoutRoutes = () => {
  const { details} = useSelector(state => state.login);
const location=useLocation();
  return (
    <AnimatePresence >
      <Routes location={location} key={location.pathname}>
     
        {routesDanhGiaCanBo.map(({ROLE, path, Component }, i) => {
           if(ROLE && (
            !ROLE.includes(details.Role)
            &&!ROLE.includes(details.Khoi)
            )  
           ) 
           {
             return(<></>);
           }
           else
          return(
          <Fragment key={i}>
          <Route element={<AppLayout />} key={i}>
            <Route path={path} element={Component} />
          </Route>
          </Fragment>
          )
})}
      </Routes>
    </AnimatePresence>
  );
};

export default LayoutRoutes;