import React, { Fragment } from 'react';
import ChartistGraph from 'react-chartist';
import { Col, Card, CardBody } from 'reactstrap';
import { AnimatingDonutWithSvg } from '../../../Constant';
import HeaderCard from '../../Common/Component/HeaderCard';

const AnimatedDotedClass = ({ chartData }) => {
    return (
        <Fragment>
            <Col xl="6" md="12" sm="12" >
                <Card>
                    <HeaderCard title={AnimatingDonutWithSvg} />
                    <CardBody>
                        <ChartistGraph
                            data={chartData.chart2Data}
                            options={chartData.chart2Option}
                            type={'Pie'}
                            className="fct-8 flot-chart-container" />
                    </CardBody>
                </Card>
            </Col>
        </Fragment>
    );
};

export default AnimatedDotedClass;