import React, { Fragment } from 'react';
import { Container, Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import TableLuuFile from './TableLuuFile';

const DanhSachUser = () => {
  return (
    <Fragment>
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>              
              <CardBody>
                <TableLuuFile />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default DanhSachUser;
