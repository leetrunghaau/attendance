import React, { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Loader = (props) => {
  const { showLoading } = useSelector(state => state.loading);
  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log("SHOW LOADING==>",showLoading);
    setShow(showLoading);
  }, [showLoading]);

  return (
    <Fragment>
      <div style={{zIndex:999999}} className={`loader-wrapper ${show ? '' : 'loderhide'}`}>
        <div className='loader-index'>
          <span></span>
        </div>
        <svg>
          <defs></defs>
          <filter id='goo'>
            <fegaussianblur in='SourceGraphic' stdDeviation='11' result='blur'></fegaussianblur>
            <fecolormatrix in='blur' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9' result='goo'></fecolormatrix>
          </filter>
        </svg>
      </div>
    </Fragment>
  );
};

export default Loader;
