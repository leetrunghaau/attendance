import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label } from 'reactstrap'
import { GetDanhMucNumber } from '../../Util/Utils';
import { Select, Row, Col } from 'antd';

export const DanhMucNumber = (props) => {
  const { from, to, step, title, labelExtra, selected, setSelected, defaultValue, addAll, labelPosition } = props;
  const [dataDanhMuc, setDataDanhMuc] = useState([]);

  useEffect(() => {
    let tempData = null;

   tempData = GetDanhMucNumber(from, to, step, labelExtra);
   if (addAll) {
      let item = { value: -1, label: `Tất cả` };
      tempData.unshift(item);
   }

    // let tu=from>to?to:from;
    // let den=from>to?from:to;
    // for(var i=tu;i<=den;i+=step)
    //  {
    //     let item={value:i,label:`${labelExtra}${i}`};
    //     tempData.push(item);
    //   };
    //   if(from>to)
    //     tempData=tempData.reverse();
    setDataDanhMuc(tempData);
    //setSelected(tempData[0].value);
   
    if(defaultValue == undefined)
    {
      console.log("defaultValue2==>");
      setSelected(tempData[0].value);
    }
    else
    {
      console.log("defaultValue3==>");
      setSelected(defaultValue);
    }
    console.log(labelPosition);

  }, []);

  return (
    <>
      {/* <FormGroup style={{ display: 'inline-block' }}>
        <Label className="form-label"><strong>{title}</strong></Label>
        <Select
          value={selected}
          onChange={(e) => setSelected(e)}
          options={dataDanhMuc}
          className="js-example-basic-single col-sm-12"
        />
      </FormGroup> */}
<div style={{display:labelPosition=='top'?'block':'flex'}}>
      <div style={{alignSelf:'center',fontWeight:'bold',marginRight:5}}>{title}</div>
      <div>
      <Select
          value={selected}
          onChange={(e) => setSelected(e)}
          options={dataDanhMuc}
          className="js-example-basic-single col-sm-12"
        />
      </div>
</div>
{/* <Row>
  <Col>
        <Label className="form-label"><strong>{title}</strong></Label>
        </Col>
        <Col>
        <Select
          value={selected}
          onChange={(e) => setSelected(e)}
          options={dataDanhMuc}
          className="js-example-basic-single col-sm-12"
        />
        </Col>
      </Row> */}

    </>
  );
};

DanhMucNumber.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number,
  step: PropTypes.number,
  title: PropTypes.string,
  labelExtra: PropTypes.string,
  labelPosition: PropTypes.string,
  setSelected: PropTypes.func,
  selected: PropTypes.number,
  defaultValue: PropTypes.number,
};

DanhMucNumber.defaultProps = {
  from: 1,
  to: 10,
  step: 1,
  title: "",
  labelExtra: "",
  setSelected: () => { },
  selected: 0,
  labelPosition:'top'
};

export default DanhMucNumber;
