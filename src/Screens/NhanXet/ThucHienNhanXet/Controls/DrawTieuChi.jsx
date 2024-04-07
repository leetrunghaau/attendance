import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'antd'
import TieuChiNhanXet from '../TieuChiNhanXet';
import _ from 'lodash'
const { TextArea } = Input;

const DrawTieuChi = ({ data, stt, text, type, level,onChange }) => {
  const { details } = useSelector(state => state.login);

  const updateData=(val)=>{
    var temp=_.cloneDeep(data);
    temp.idDonViDanhGia=details.DonVi;
    temp.noiDung=val;
    onChange(temp);
  }

  const drawInput = () => {
    const noidung=data.nhanXetKetQuas?.find(x=>x.idDonViDanhGia==details.DonVi || data.showAll);
    console.log("NOIDUNG==>",noidung);
   var title=<></>;
   var listKQ=<></>;
   if(data.idContentStyle=="LIST")
   {
    console.log("LIST==>",data);
    var stt=1;
      if(noidung)
      {        
        title=<div style={{fontWeight:'bold',fontStyle:'italic'}}>{stt}. {noidung?.idDonViDanhGiaNavigation?(noidung.idDonViDanhGiaNavigation.ten):details.TenDonVi}</div>
    
      }
      //For List KetQua
      if(data.showAll)
      {
      listKQ=data.nhanXetKetQuas?.map((element,index) => {
        if(noidung?.idDonViDanhGia==element.idDonViDanhGia)
          return;
        return(
          <>
          <div style={{fontWeight:'bold',fontStyle:'italic'}}>{stt+index}. {element.idDonViDanhGiaNavigation?.ten}</div>
          <div style={{fontWeight:'normal',marginLeft:5}}>{element.noiDung}</div>
          </>
        )
      });
    }

   }
    switch (data.idTypeInput) {
      case "TEXT":
        return (
          <> 
            {title}           
            {
              data.canEdit?
            <Input placeholder="Nhập nội dung" value={noidung?.noiDung} onChange={(val) => updateData(val.target.value)} />
            :<div style={{fontWeight:'normal'}}>{noidung?.noiDung}</div>
          }
          {listKQ}
          </>
        )
      case "AREA":
        return (
          <>
           {title}  
           {
              data.canEdit?
            <TextArea
              rows={"4"}
              placeholder="Nhập nội dung"
              value={noidung?.noiDung} onChange={(val) => updateData(val.target.value)} 
            />
            :<div style={{fontWeight:'normal'}}>{noidung?.noiDung}</div>
          }
           {listKQ}
          </>
        )
      default:
        return (
          <></>
        )
    }
  }

  return (
    <>
      <div style={{ fontWeight: type == "TITLE_TIEUCHI" ? "bold" : "normal", marginLeft: level * 20,marginBottom:5 }}>
        <div style={{ display: 'flex'
        ,alignItems:data.idContentStyle=="NGANG"?'center':'start'
        ,flexDirection:data.idContentStyle=="NGANG"?'row':'column' }}>
          <div>{stt} {text} </div>
          <div style={{marginLeft:data.idContentStyle=="NGANG"?10:0, width:'100%',flex:1}}>{drawInput()}</div>
        </div>
      </div>

    </>
  );
};

export default DrawTieuChi;