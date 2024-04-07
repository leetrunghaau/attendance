import React, { Fragment } from 'react';
import { Card, Col, CardBody } from 'reactstrap';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import HeaderCard from '../../Common/Component/HeaderCard';
import { BasicDemo } from '../../../Constant';

const containerStyle = {
  height: '500px',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};
const BasicMapComp = () => {
  return (
    <Fragment>
      <Col xl='6' md='12'>
        <Card>
          <HeaderCard title={BasicDemo} />
          <CardBody>
            <div className='map-js-height'>
              <div id='gmap-simple' className='map-block'>
                <LoadScript googleMapsApiKey='https://maps.googleapis.com/maps/api/js?key=AIzaSyAjbM21YRQrMP36xlY8CXSILIIUOdiP_lo&callback=initMap'>
                  <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}></GoogleMap>
                </LoadScript>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Fragment>
  );
};

export default React.memo(BasicMapComp);
