import React, { Fragment, useContext, useState, useEffect } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';

const GroupBox = (props) => {
    const{title}=props;
    return (
        <Card className={'card-absolute'} style={{border:"1px solid #e3e3e3",marginBottom: 5}}>
            {title&&
            <CardHeader className={''} style={{padding: 2, top: -15,border: 'none',fontWeight: 'bold'}}>
                {title}
            </CardHeader>
}
            <CardBody style={{marginTop:0,paddingTop: 10,paddingBottom: 5}}>
                {props.children}
            </CardBody>
        </Card>
    )
}
export default GroupBox