import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedAsnc, LoadDanhMucNam } from '../../redux/actions/dmNamAction';
import {Select} from 'antd'; 
import dayjs from 'dayjs';

export const DanhMucNam = () => {
  const dispatch = useDispatch();
  const [dataDanhMuc,setDataDanhMuc]=useState([]);
  const {data,namSelected} = useSelector(state => state.namKeHoachTong);
  console.log("DATA DANH MUC NAM==>");
  useEffect(()=>{   
    if(data.length<=0) 
      dispatch(LoadDanhMucNam());
  },[]);
  useEffect(()=>{
    if(data.length<=0)
    { 
      return;
    
    }
    else
    { 
      setDataDanhMuc(data);  
      if(namSelected==null)
        dispatch(setSelectedAsnc(dayjs().year()));
    }
  },[data]);
 
  return (
     <> 
    <Select  style={{width:80}}
            value={namSelected}
            onChange={(e)=>dispatch(setSelectedAsnc(e))}
                    options={dataDanhMuc}
                    className="js-example-basic-single"
                     />
                     
                     </>
  );
};

export default DanhMucNam;
