import React, { Fragment } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import TableTongHop from './TableTongHop';


const TongHopNhanXet = () => {
  return (
    <Fragment>
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <TableTongHop/>
                {/* <AgTable /> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default TongHopNhanXet;