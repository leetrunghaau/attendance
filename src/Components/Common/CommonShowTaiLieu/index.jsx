import React, { useState, useEffect, Fragment,useRef  } from "react";
import { Col,Row } from "reactstrap";
import { Document, Page,pdfjs } from 'react-pdf';
import { Close, SaveChanges } from '../../../Constant';
import PropTypes from 'prop-types';
import { Button,Image } from "antd";
import { SaveOutlined,CloseOutlined   } from '@ant-design/icons';
import { fi } from 'date-fns/locale';
import CommonModal from '../../UiKits/Modals/common/modal';
import ControlPanel from '../PDF/ControlPanel';
import Loader from '../PDF/Loader';
import CommonPDF from '../PDF/ShowPDF';
import { saveAs } from 'file-saver';
import { useDispatch, useSelector } from 'react-redux';
import { showHideFile,setData } from '../../../redux/actions/showFileAction';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();


const CommonTaiLieu = (props) => {
  const dispatch = useDispatch();
  const {  showModal, FileBase64,Extension,FileName } = useSelector(state => state.showFile); //showFile nay nằm trong reducers/index

 // const {FileBase64,Extension,FileName} = props;


  const toggle = () =>{
    //  props.setShowModal(!props.showModal);  
    //  props.setFileBase64("");
    // props.setExtension("");'
    dispatch(showHideFile(!showModal));
  };
 
  const FILE_TYPE = {pdf:"application/pdf",
                      doc:"application/msword",docx:"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                      xls:"application/vnd.ms-excel",
                      xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                      ppt:"application/vnd.ms-powerpoint",
                      pptx:"application/vnd.openxmlformats-officedocument.presentationml.presentation",
                      jpe:"image/jpeg",
                      jpeg:"image/jpeg",
                      jpg:"image/jpeg",
                      gif:"image/gif",
                      png:"image/png",
                    }

  const getContentType=(param)=> {
    switch(param) {
      case 'doc':
        return FILE_TYPE.doc;
      case 'docx':
        return FILE_TYPE.docx;
      case 'xls':
        return FILE_TYPE.xls;
      case 'xlsx':
        return FILE_TYPE.xlsx;
      case 'ppt':
        return FILE_TYPE.ppt;
      case 'pptx':
        return FILE_TYPE.pptx;
      case 'jpe':
        return FILE_TYPE.jpe; 
      case 'jpeg':
        return FILE_TYPE.jpeg; 
      case 'jpg':
        return FILE_TYPE.jpg; 
      case 'gif':
        return FILE_TYPE.gif; 
      case 'png':
        return FILE_TYPE.png; 
      case 'pdf':
        return FILE_TYPE.pdf;   
      default:
        return '';
    }
  }         
  useEffect(() => {
    //console.log("----Extension----",Extension);
    //console.log("file name",FileName);

    //console.log("file base 64",FileBase64);
    if(FileBase64==null || FileBase64==""||Extension==null||Extension=="" || FileName=="")
    return;
    if(Extension=="doc" || Extension=="docx" || Extension=="xls" || Extension=="xlsx" || Extension=="ppt" || Extension=="pptx"){
      //props.setShowModal(false);
      handleDownload(FileBase64);
      dispatch(setData({FileBase64:"",
        Extension:"",
        FileName:""}));
      //props.setFileBase64("");
     // props.setExtension("");
      
    }
    else{
     
    }
  }, [FileBase64,Extension,FileName]);
 
  const base64ToBlob = (base64Data, contentType) => {
    if(!base64Data||!contentType)
    return;
    const sliceSize = 512;
    const byteCharacters = atob(base64Data);
    console.log("atob neeee",byteCharacters);
    const byteArrays = [];
    
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      
      const byteArray = new Uint8Array(byteNumbers);
      //console.log("byteArray neeee",byteArray);
      byteArrays.push(byteArray);
    }
    console.log("byteArray neeee",byteArrays);
    return new Blob(byteArrays, { type: contentType });
  };

  const handleDownload = () => {
    try{
  const contentType=getContentType(Extension)
  const blob = base64ToBlob(FileBase64, contentType);
    // Save the Blob as a file
    console.log("blob neeee",blob);
    saveAs(blob, FileName/*+"."+Extension*/);
    }
    catch(e){
      alert(e);
    }
  };
  // const handlePageChange = (e) => {
  //   setSelectedPage(Number(e.target.value));
  // };

  // const scrollToPage = () => {
  //   console.log("===ttttt====",selectedPage);
  //   if (pdfRef && pdfRef.current) {
  //     const pdfViewer = pdfRef.current.viewer;
  //     console.log("===ttttt1====",pdfViewer);
  //     if (pdfViewer) {
  //       pdfViewer.scrollPageIntoView({ selectedPage });
  //     }
  //   }
  // };

   return (
    <>

    <CommonModal
        isOpen={showModal}
        title={"Xem tài liệu"}
        toggler={toggle}     
        size="xl" 
        showConfirm={false}       
        >
        <Fragment>
        <Row>
          <Col sm="12" md="12">
         
                     
          {/* <Document
          //file="./docs/HuongDanSuDungKPIEVNHCMC.pdf"
         file={`data:application/pdf;base64,${file}`}       
                    loading="Please wait!"
                    onLoadSuccess={onDocumentLoadSuccess}       
          >
             <Page pageNumber={pageNumber} />
             </Document>
             <div>
        <p>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
        <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
          Previous
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
      </div> */}
        
        <div>
      {/* <Loader isLoading={isLoading} /> */}
      
      {Extension=="pdf" ?

       <CommonPDF      
          FileBase64={FileBase64}    
          onDownload={() =>handleDownload()}
      />

      : <div><img style={{width:'100%'}} src={`data:${getContentType(Extension)};base64,${FileBase64}`}/></div> }  
      
    </div>
           </Col>
           </Row>
        </Fragment>
      </CommonModal> 

      </>
  );
};

CommonTaiLieu.propTypes = {
  isOpen: PropTypes.bool,
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool,
  showConfirm:PropTypes.bool,
  toggler: PropTypes.func,
  size: PropTypes.string,
  FileBase64:PropTypes.string,
  title: PropTypes.string,
  fullScreen:PropTypes.bool,
  bodyClass: PropTypes.string,
  actionConfirm: PropTypes.func,
  Extension: PropTypes.string,
  FileName: PropTypes.string,
};

CommonTaiLieu.defaultProps = {
  isOpen: false,
  showHeader: true,
  showFooter: true,
  showConfirm:true,
  toggler: () => { },
  size: 'md',
  FileBase64:'',
  Extension:'',
  FileName:'',
  title: "",
  bodyClass: "",
  fullScreen:false,
  actionConfirm: () => { },
};

export default CommonTaiLieu;