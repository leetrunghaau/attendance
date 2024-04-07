import React, { useState, useEffect, Fragment } from "react";
import { Col,Row } from "reactstrap";
import { Close, SaveChanges } from '../../../Constant';
import PropTypes from 'prop-types';
import { Button } from "antd";
import { SaveOutlined,CloseOutlined   } from '@ant-design/icons';
import { fi } from 'date-fns/locale';
import CommonModal from '../../UiKits/Modals/common/modal';
//import { PDFViewer } from '@react-pdf/renderer';

import { Viewer,Worker } from '@react-pdf-viewer/core';
//pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// Import the styles
//import '@react-pdf-viewer/core/lib/styles/index.css';
//import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

//import PDFViewer from 'pdf-viewer-reactjs'

import { SampleFileBase64 } from "./docs/sample";

const CommonPDF11 = (props) => {
  const { isOpen, toggler, size, title, bodyClass, actionConfirm, showHeader, showFooter,fullScreen,showConfirm } = props;
  //const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const toggle = () => props.setShowModal(!props.showModal);
  //const [url, setUrl] = useState();
  useEffect(() => {
  //  const blob = base64toBlob(file);
  //   const url1 = URL.createObjectURL(blob);
  //   setUrl(url1);
  //console.log("-----PDF-----",url);
  }, []);

 
//   const base64 =
//         'data:application/pdf;base64,JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAvTWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9udAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAwMDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G';
//     const pdfContentType = 'application/pdf';

//     const base64toBlob = (data) => {
//         // Cut the prefix `data:application/pdf;base64` from the raw base 64
//         const base64WithoutPrefix = data.substr(`data:${pdfContentType};base64,`.length);

//         const bytes = atob(base64WithoutPrefix);
//         let length = bytes.length;
//         let out = new Uint8Array(length);

//         while (length--) {
//             out[length] = bytes.charCodeAt(length);
//         }

//         return new Blob([out], { type: pdfContentType });
//     };

//     const url = URL.createObjectURL(base64toBlob(base64));

//    return (
//     <>
    
//     <CommonModal
//         isOpen={props.showModal}
//         title={"Xem PDF"}
//         toggler={toggle}     
//         size="xl" 
//         showConfirm={false}       
//         >
//         <Fragment>
//         <Row>
//           <Col sm="12" md="12">
         
        
//          <Worker workerUrl="../../../../node_modules/pdfjs-dist/build/pdf.worker.js">
//             <div
//                 style={{
//                     border: '1px solid rgba(0, 0, 0, 0.3)',
//                     height: '750px',
//                 }}
//             >
//                 <Viewer fileUrl={url} />
//             </div>
//             </Worker>
//            </Col>
//            </Row>
//         </Fragment>
//       </CommonModal>
//       </>
//   );
// };

// CommonPDF.propTypes = {
//   isOpen: PropTypes.bool,
//   showHeader: PropTypes.bool,
//   showFooter: PropTypes.bool,
//   showConfirm:PropTypes.bool,
//   toggler: PropTypes.func,
//   size: PropTypes.string,
//   title: PropTypes.string,
//   fullScreen:PropTypes.bool,
//   bodyClass: PropTypes.string,
//   actionConfirm: PropTypes.func,
// };

// CommonPDF.defaultProps = {
//   isOpen: false,
//   showHeader: true,
//   showFooter: true,
//   showConfirm:true,
//   toggler: () => { },
//   size: 'md',
//   title: "",
//   bodyClass: "",
//   fullScreen:false,
//   actionConfirm: () => { },
// };
}
export default CommonPDF11;