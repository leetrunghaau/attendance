import React from 'react';
import Loading from "../Loading";
const Loader = ({isLoading}) => {
  if(!isLoading) return null;
  return (
    <div id="loader" className="d-flex justify-content-center align-items-center flex-column">
      {/* <img src="https://react-pdf.org/images/logo.png" alt="loader" className="mb-5 App-logo" />
      <p>Loading...</p> */}
      <Loading />
    </div>
  )
}

export default Loader
