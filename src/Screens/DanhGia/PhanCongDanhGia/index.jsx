import React, { Fragment } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import TablePhanCongDanhGia from './TablePhanCongDanhGia';


const PhanCongDanhGia = () => {
  return (
    <Fragment>
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <TablePhanCongDanhGia />
                {/* <AgTable /> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default PhanCongDanhGia;