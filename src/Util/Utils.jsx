import { TRUNSCATE_TYPE } from "./define";
import { saveAs } from 'file-saver';
import dompurify from 'dompurify';

const FILE_TYPE = {
  pdf: "application/pdf",
  doc: "application/msword", docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  jpe: "image/jpeg",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  gif: "image/gif",
  png: "image/png",
}

const getContentType = (param) => {
  switch (param) {
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

const base64ToBlob = (base64Data, contentType) => {
  const sliceSize = 512;
  const byteCharacters = atob(base64Data);
  console.log("atob neeee", byteCharacters);
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
  console.log("byteArray neeee", byteArrays);
  return new Blob(byteArrays, { type: contentType });
};


export const TruncatedText = (text, type, maxLength) => {
  var textReturn = text;
  const lengthstr = text.length;
  if (text.length <= maxLength)
    return text;
  const substringLength = (maxLength % 2 != 0) ? (maxLength - 1) / 2 : maxLength / 2;

  console.log("substringLength", substringLength);
  switch (type) {
    case TRUNSCATE_TYPE.LEFT:
      //textReturn=str.substring(maxLength-substringLength,maxLength) + '...';      
      return text.substring(0, maxLength) + '...';

    case TRUNSCATE_TYPE.MIDDLE:
      let rightTemp = text.substring(lengthstr - substringLength, lengthstr - substringLength + substringLength);
      let leftTemp = text.substring(0, substringLength);
      console.log("rightTemp", rightTemp)
      console.log("leftTemp", leftTemp)

      return leftTemp + '...' + rightTemp;
    case TRUNSCATE_TYPE.RIGHT:
      return "..." + text.substring(lengthstr - maxLength, lengthstr - maxLength + maxLength);
    default:
      return textReturn;

  }
};

export const GetDanhMucNumber = (from = 1, to = 10, step = 1, labelExtra = "") => {
  let tempData = [];
  let tu = from > to ? to : from;
  let den = from > to ? from : to;
  for (var i = tu; i <= den; i += step) {
    let item = { value: i, label: `${labelExtra}${i}` };
    tempData.push(item);
  };
  if (from > to)
    tempData = tempData.reverse();
  return tempData;
}

export const CreateStringWithFixSize = (textCreate, size, txtDefault = '-') => {
  let text = textCreate + "";
  if (!text)
    return txtDefault.repeat(size);
  if (text.length >= size)
    return text.substring(0, size);
  return txtDefault.repeat(size - text.length) + text;
}

export const CreateFormFromDataSubmit = (dataSubmit, listNameFile = [], prefixData = "", prefixFile = "") => {
  var formData = new FormData();
  //Add Data KeHoachVon
  Object.entries(dataSubmit).forEach(([key, value]) => {
    //console.log(`KeHoachVon.${key}`,value)
    if (listNameFile.indexOf(key) > -1) {
      if (value) {
        value.fileList.forEach((content) => {
          if (!content.isDefault) {
            formData.append(`${prefixFile != "" ? (prefixFile + ".") : ""}${key}`, content.originFileObj ? content.originFileObj : content)
          }
        });
      }
    } else if (value != undefined)
      formData.append(`${prefixData != "" ? (prefixData + ".") : ""}${key}`, value);
  });
  return formData;
}



export const downloadFile = (FileName, FileBase64, Extension) => {
  const contentType = getContentType(Extension)
  const blob = base64ToBlob(FileBase64, contentType);
  saveAs(blob, FileName/*+"."+Extension*/);
};

export const convertMessageToHTML = (message) => {
  const sanitizedMessage = dompurify.sanitize(message);
  return <div dangerouslySetInnerHTML={{ __html: sanitizedMessage }} />;
};
export const generateRandomCode = (leng) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomCode = '';

  for (let i = 0; i < leng; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomCode += characters.charAt(randomIndex);
  }

  return randomCode;
}