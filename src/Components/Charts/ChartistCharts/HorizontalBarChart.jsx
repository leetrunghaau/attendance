import React, { Fragment } from "react";
import ChartistGraph from "react-chartist";
import { Col, Card, CardBody } from "reactstrap";
import { HorizontalBarChart } from "../../../Constant";
import HeaderCard from "../../Common/Component/HeaderCard";

const HorizontalBarChartClass = ({ chartData }) => {
    return (
        <Fragment>
            <Col xl="6" md="12" sm="12" >
                <Card>
                    <HeaderCard title={HorizontalBarChart} />
                    <CardBody>
                        <ChartistGraph
                            data={chartData.chart7Data}
                            options={chartData.chart7Options}
                            type={'Bar'}
                            className="ct-11 flot-chart-container" />
                    </CardBody>
                </Card>
            </Col>
        </Fragment>
    )
}

export default HorizontalBarChartClass;