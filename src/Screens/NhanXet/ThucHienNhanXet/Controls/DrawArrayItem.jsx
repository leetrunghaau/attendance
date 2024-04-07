import React, { Fragment } from 'react';
import DrawTitle from './DrawTitle';
import DrawTieuChi from './DrawTieuChi';

const DrawArrayItem = ({ data, onChange,level }) => {
  const renderItem = () => {
    return data?.map((item, index) => {
      switch (item.idContentDisplay) {
        case "TITLE":
        case "TEXT":
          return(
            <>
          <DrawTitle stt={item.stt} text={item.ten} type={item.idContentDisplay} level={level+1}/>
          {item.inverseParent.length>0&& <DrawArrayItem data={item.inverseParent} onChange={(val)=>onChange(val)} level={level+1}/>}
          </>
          )
        case "TIEUCHI":
        case "TITLE_TIEUCHI":
          return(<DrawTieuChi data={item} stt={item.stt} text={item.ten} type={item.idContentDisplay} level={level+1} onChange={(val)=>onChange(val)}/>)
        // default:
        //   return(
        //     <>
        //   <DrawTitle stt={item.stt} text={item.ten} type={item.idContentDisplay} level={level+1}/>
        //   {item.inverseParent.length>0&& <DrawArrayItem data={item.inverseParent} onChange={onchange} level={level+1}/>}
        //   </>
        //   )
        }
    });
  }
  return (
    <>
      {renderItem()}
    </>
  );
};

export default DrawArrayItem;