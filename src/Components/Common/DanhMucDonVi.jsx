import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadDanhMucDonVi,setSelectedAsnc } from '../../redux/actions/dmDonViAction';
import {Select} from 'antd';

export const DanhMucDonVi = () => {
  const dispatch = useDispatch();
  const [dataDanhMuc,setDataDanhMuc]=useState([]);
  const {data,donViSelected} = useSelector(state => state.dmDonVi);
  useEffect(()=>{   
      if(data.length<=0) 
        dispatch(LoadDanhMucDonVi());
  },[]);
  useEffect(()=>{
    if(data.length<=0)
    {
      return;
    }
    else
    {
      let tempData=[];
      data.forEach(element => {
        let item={value:element.id,label:element.tenDonVi};
        tempData.push(item);
      });
      setDataDanhMuc(tempData);
      if(donViSelected==null|| tempData.findIndex(x => x.value === donViSelected)<=0)
        dispatch(setSelectedAsnc(tempData[0].value));
    }
  },[data]);
  return (
     <>
    <Select
     showSearch
     placeholder="Nhập để tìm kiếm..."
     optionFilterProp="children"
     filterOption={(input, option) => (option?.label ?? '').includes(input)}
     filterSort={(optionA, optionB) =>
       (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
     }
            value={donViSelected}
            onChange={(e)=>{dispatch(setSelectedAsnc(e))}}
                    options={dataDanhMuc}
                    className="js-example-basic-single col-sm-12"
                     />
                     </>
  );
};

export default DanhMucDonVi;
