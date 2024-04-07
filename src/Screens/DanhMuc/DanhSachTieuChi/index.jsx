import React, { Fragment } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import TableTieuChi from './TableTieuChi';


const DanhSachTieuChi = () => {
  return (
    <Fragment>
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <TableTieuChi />
                {/* <AgTable /> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default DanhSachTieuChi;