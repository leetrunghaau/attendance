import React, { Fragment } from 'react';
import HeaderCard from '../../Common/Component/HeaderCard';
import { Polygons } from '../../../Constant';
import { Col, Card, CardBody } from 'reactstrap';
import { GoogleMap, LoadScript, Polygon } from '@react-google-maps/api';

const containerStyle = {
  height: '500px',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const PolygonsComp = () => {
  const polygontriangleCoords = [
    { lat: 25.774, lng: -80.19 },
    { lat: 18.466, lng: -66.118 },
    { lat: 32.321, lng: -64.757 },
    { lat: 25.774, lng: -80.19 },
  ];

  return (
    <Fragment>
      <Col xl='6' md='12'>
        <Card>
          <HeaderCard title={Polygons} />
          <CardBody>
            <div className='map-js-height'>
              <div id='gmap-simple' className='map-block'>
                <LoadScript googleMapsApiKey='https://maps.googleapis.com/maps/api/js?key=AIzaSyAjbM21YRQrMP36xlY8CXSILIIUOdiP_lo&callback=initMap'>
                  <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
                    <Polygon paths={polygontriangleCoords} strokeColor='#FF0000' strokeOpacity={0.8} strokeWeight={2} fillColor='#FF0000' fillOpacity={0.35} />
                  </GoogleMap>
                </LoadScript>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Fragment>
  );
};

export default PolygonsComp;
