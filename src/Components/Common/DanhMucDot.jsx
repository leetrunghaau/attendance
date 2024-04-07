import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadDanhMucDot, setSelectedAsnc } from '../../redux/actions/dmDotAction';
import { Select, Form, Input, InputNumber, message, Space, DatePicker , Row, Col, Text} from 'antd';
import { Bold } from 'react-feather'; 

const DanhMucDot = () => {
  const dispatch = useDispatch();
  const [dataDot, setDataDot] = useState([]);
  const { data, dotSelected } = useSelector(state => state.dmDot);


  useEffect(() => {   
    if(data.length<=0)  
      dispatch(LoadDanhMucDot());
  }, []);

  useEffect(() => {
    if (data.length <= 0) {
      setDataDot([]);
      dispatch(setSelectedAsnc(""));

      return;
    }
    else {
      let tempData = [];
      data.forEach(element => {
        let item = { value: element.id, label:  element.ten };
        tempData.push(item);
      });
      setDataDot(tempData);
      if(dotSelected==null || data.findIndex(x => x.value === dotSelected.id)<=0)
        setSelectedDot(tempData[0].value);
    }
  }, [data]);

  const setSelectedDot=(val)=>{
    var temp=data.find(s=>s.id==val);
    console.log("SELECT===>",temp,val,data);
    dispatch(setSelectedAsnc(temp));
  }

  return (
        <Select style={{width:'100%'}}
          showSearch
          placeholder="Nhập để tìm kiếm..."
          optionFilterProp="children"
             filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          value={dotSelected?.id}
          onChange={(e) => setSelectedDot(e)}
          options={dataDot}
          className="js-example-basic-single col-sm-12"
        /> 
   // </Form.Item>
  );
};

export default DanhMucDot;
