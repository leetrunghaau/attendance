import React, { Fragment } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import TieuChiNhanXet from '../TieuChiNhanXet';

const DrawTitle = ({stt,text,type,level}) => {
  return (
    <>
      <div style={{fontWeight:type=="TITLE"?"bold":"normal",marginLeft:level*20}}>{stt} {text}</div>
    </>
  );
};

export default DrawTitle;