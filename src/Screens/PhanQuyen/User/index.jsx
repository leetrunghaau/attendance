import React, { Fragment } from 'react';
import { Container, Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import TableUser from './TableUser';

const DanhSachUser = () => {
  return (
    <Fragment>
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>              
              <CardBody>
                <TableUser />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default DanhSachUser;
