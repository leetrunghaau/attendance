import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload,Form } from 'antd';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';


const UploadFile = (props) => {
    const {name,label,maxCount,listHoSoDefault,setListHoSoDefaultDelete, rules}=props;
  const [fileList, setFileList] = useState([]);
  const [defaultFiles,setDefaultFiles]=useState([]);
  const [deleteFiles,setDeleteFiles]=useState([]);
  // useEffect(()=>{
  //   console.log("SET FILE LIST===>",fileList);
  //   setListFile(fileList);
  // },[fileList])

  useEffect(()=>{
    //console.log("DELETE FILES===>",deleteFiles);
    if(deleteFiles.length>0)
    setListHoSoDefaultDelete(deleteFiles);
  },[deleteFiles])

  useEffect(()=>{
    if(deleteFiles.length>0)return;
    //console.log("LIST HO SO DEFAULT============>",listHoSoDefault);
    let temp=[];
    if(listHoSoDefault.length>0)
    listHoSoDefault?.forEach(element => {
      if(!element) return;
    let item={
            uid: element.id+"",
            name: element.fileNameOrg,
            status: 'done',
            url: element.fileUrl,
            isDefault:true,
          };
          temp.push(item);
    });

    setFileList(temp);

  },[listHoSoDefault])

  const handlePreview = (file) => {
    console.log("THong tin file==>",file);
  };

  const propsUpload = {
    defaultFileList:defaultFiles,
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      if(file.isDefault)
      {
        let tempRemove=[...deleteFiles];
        tempRemove.push(file.uid);
        setDeleteFiles(tempRemove);
      }
        newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      //Add to remove if reach max
      if(fileList.length>=maxCount)
      {
        let itemMax=fileList[maxCount-1];
        if(itemMax.isDefault)
        {
          let tempRemove=[...deleteFiles];
          tempRemove.push(itemMax.uid);
          setDeleteFiles(tempRemove);
        }
      }
      if(maxCount>1)
        setFileList([...fileList, file]);
      else
        setFileList([file]);
      return false;
    },
    fileList,
    // previewFile(file) {
    //   alert("AAAAAAAAAa")
    // },
  };

  return (
    <>
     <Form.Item
     noStyle={label==""?true:false}
                    label={label}
                    name={name}
                    rules={rules}
                    >
      <Upload {...propsUpload}
      maxCount={maxCount}
      //multiple
      >
        <Button icon={<UploadOutlined />}>Chọn files</Button>
      </Upload>
      </Form.Item>
    </>
  );
};

UploadFile.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    maxCount: PropTypes.number,
    listHoSoDefault: PropTypes.array,
    setListHoSoDefaultDelete: PropTypes.func,
    rules: PropTypes.object,
    // setListFile: PropTypes.func,
    
  };
  
  UploadFile.defaultProps = {
    name: "file",
    label: " ",
    maxCount: 10,
    listHoSoDefault:[],
    rules:null,
    setListHoSoDefaultDelete:()=>{},
    // setListFile:()=>{}
  };
export default UploadFile;