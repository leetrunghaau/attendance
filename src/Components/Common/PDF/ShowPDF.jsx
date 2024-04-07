import React, { useState, useEffect, Fragment,useRef  } from "react";
import { Col,Row } from "reactstrap";
import { Document, Page,pdfjs } from 'react-pdf';
import { Close, SaveChanges } from '../../../Constant';
import PropTypes from 'prop-types';
import { Button,Image } from "antd";
import { SaveOutlined,CloseOutlined   } from '@ant-design/icons';
import { fi } from 'date-fns/locale';
import CommonModal from '../../UiKits/Modals/common/modal';
import ControlPanel from './ControlPanel';
import Loader from './Loader';
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { saveAs } from 'file-saver';


//import { PDFViewer } from '@react-pdf/renderer';
//pdfjs.GlobalWorkerOptions.workerSrc ='pdfjs-dist/build/pdf.worker.min.js';
//import { Viewer } from '@react-pdf-viewer/core';
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// Import the styles
//import '@react-pdf-viewer/core/lib/styles/index.css';
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url,
// ).toString();
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const CommonPDF = (props) => {
  const { isOpen, toggler, size, title, bodyClass, actionConfirm, showHeader, showFooter,fullScreen,showConfirm,FileBase64 } = props;
  const [scale, setScale] = useState(1.0);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [allPageNumbers, setAllPageNumbers] =  useState();
  const [fileData, setFileData] =  useState();
  const PAGE_MAX_HEIGHT = 600; // maxHeight for scroll
  // These are just for fun ;)
	const [outerWidth, setOuterWidth] = useState();
	const CONTAINER_PADDING = 50;
  
  const pdfRef = useRef(null);
  const [selectedPage, setSelectedPage] = useState(1);

  // const toggle = () => props.setShowModal(!props.showModal);
  const [dataBase64, setDataBase64] = useState("");

  const FILE_TYPE = {pdf:"application/pdf",doc:""}

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

  function onDocumentLoadSuccess({ numPages }) {
     setNumPages(numPages);
     setIsLoading(false);
    const allPageNumbers = []; // array of numbers
		for (let p = 1; p < numPages + 1; p++) {
			allPageNumbers.push(p);
		}
		setAllPageNumbers(allPageNumbers);
    // just for fun
		setOuterWidth(document.getElementById('pdf-section').offsetWidth);
  }

  // const handleScroll = () => {
  //   const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  //   setPageNumber(Math.ceil(scrollTop / window.innerHeight));
  //   console.log("XEM CURRENT PAGE",Math.ceil(scrollTop / window.innerHeight))
  // };
  // const handleDownload = () => {
  //   // Replace `base64Data` with your actual base64 string
  //   const base64Data = props.FileBase64; // Your base64 string goes here
  
  //   // Convert the base64 string to a Blob
  //   const byteCharacters = atob(base64Data);
  //   const byteNumbers = new Array(byteCharacters.length);
  //   for (let i = 0; i < byteCharacters.length; i++) {
  //     byteNumbers[i] = byteCharacters.charCodeAt(i);
  //   }
  //   const byteArray = new Uint8Array(byteNumbers);
  //   const blob = new Blob([byteArray], { type: 'application/pdf' });
  
  //   // Save the Blob as a file
  //   saveAs(blob, 'document.pdf');
  // };
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
      <Loader isLoading={isLoading} />
      <section
        id="pdf-section"
        className="d-flex flex-column align-items-center w-100"
      >
        <ControlPanel
          scale={scale}
          setScale={setScale}
          numPages={numPages}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          //file={`data:application/pdf;base64,${SampleFileBase64}`}
          //file="../../../assets/PDF/HuongDanSuDungKPIEVNHCMC.pdf"
          onDownload={() => props.onDownload()}
        />
        <div style={{
						maxHeight: `${PAGE_MAX_HEIGHT}px`, // needed for scroll
            width: `${outerWidth}px`,
						overflowY: 'auto', // yes vertical scroll
						overflowX: 'auto', // no horizontal scroll
            margin:'auto',
						// just for fun
						border: '2px solid lightgray', // matches the scroll color
						borderRadius: '5px',
					}}>
        <Document
          file={`data:application/pdf;base64,${dataBase64}`}
         //fil{e="../../../assets/PDF/HuongDanSuDungKPIEVNHCMC.pdf"
         //file={fileData}
          onLoadSuccess={onDocumentLoadSuccess}
          ref={pdfRef}
        >
         
					{allPageNumbers
						? allPageNumbers.map((pn) => (
              <div>
              <p style={{textAlign:"center"}}>
                Page {pn || (pn ? 1 : "--")} 
              </p>
								<Page key={`page-${pn}`} width={outerWidth - CONTAINER_PADDING * 2} pageNumber={pn} scale={scale} renderAnnotationLayer={false}
                inputRef={(ref) => {
                  if (ref && pageNumber === pn) {
                    ref.scrollIntoView();
                  }
                }}
                renderTextLayer={false} />  
                </div>
						  ))
						: undefined}
            
				
        
      
        </Document>
        </div>
        </section>
</div>

      </>
  );
};

CommonPDF.propTypes = {
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
};

CommonPDF.defaultProps = {
  isOpen: false,
  showHeader: true,
  showFooter: true,
  showConfirm:true,
  toggler: () => { },
  size: 'md',
  FileBase64:'',
  title: "",
  bodyClass: "",
  fullScreen:false,
  actionConfirm: () => { },
};

export default CommonPDF;