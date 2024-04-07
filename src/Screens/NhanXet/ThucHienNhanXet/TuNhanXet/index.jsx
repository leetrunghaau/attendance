import React, { Fragment } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import TieuChiNhanXet from '../TieuChiNhanXet';


const TuNhanXet = () => {
  return (
    <Fragment>
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <TieuChiNhanXet type={1}/>
                {/* <AgTable /> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default TuNhanXet;