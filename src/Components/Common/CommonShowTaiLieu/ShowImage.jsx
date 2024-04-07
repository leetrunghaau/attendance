import React, { useState, useEffect, Fragment,useRef  } from "react";
import { Col,Row } from "reactstrap";

import PropTypes from 'prop-types';



//import { PDFViewer } from '@react-pdf/renderer';
//pdfjs.GlobalWorkerOptions.workerSrc ='pdfjs-dist/build/pdf.worker.min.js';
//import { Viewer } from '@react-pdf-viewer/core';
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// Import the styles
//import '@react-pdf-viewer/core/lib/styles/index.css';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();


const ShowTaiLieu_Image = (props) => {
  const {FileBase64 } = props;

  const [dataBase64, setDataBase64] = useState("");

 

  useEffect(() => {
    setDataBase64(FileBase64)
    console.log("fileeee",FileBase64)
  //  const blob = base64toBlob(file);
  //   const url1 = URL.createObjectURL(blob);
  //   setUrl(url1);
  //console.log("duong dan ne",`${process.env.PUBLIC_URL}/assets/PDF/HuongDanSuDungKPIEVNHCMC.pdf`);

  //setFileData(`${process.env.PUBLIC_URL}/PDF/HuongDanSuDungKPIEVNHCMC.pdf`);
  }, [FileBase64]);

  // function onDocumentLoadSuccess({ numPages }) {
  //   setNumPages(numPages);
  //   setPageNumber(1);
  // }

  // function changePage(offset) {
  //   setPageNumber(prevPageNumber => prevPageNumber + offset);
  // }

  // function previousPage() {
  //   changePage(-1);
  // }

  // function nextPage() {
  //   changePage(1);
  // }

  
   return (
    <>
    
      <img src={`data:image/png;base64,${props.FileBase64}`}/>
      </>
  );
};

ShowTaiLieu_Image.propTypes = {

  FileBase64:PropTypes.string,

};

ShowTaiLieu_Image.defaultProps = {
  FileBase64:'',
};

export default ShowTaiLieu_Image;