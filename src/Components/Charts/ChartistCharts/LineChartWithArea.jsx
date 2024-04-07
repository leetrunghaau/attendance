import React, { Fragment } from "react";
import ChartistGraph from "react-chartist";
import { Col, Card, CardBody } from "reactstrap";
import { LineChartWithArea } from "../../../Constant";
import HeaderCard from "../../Common/Component/HeaderCard";

const LineChartWithAreaClass = ({ chartData }) => {
    return (
        <Fragment>
            <Col xl="6" md="12" sm="12" >
                <Card>
                    <HeaderCard title={LineChartWithArea} />
                    <CardBody>
                        <ChartistGraph
                            data={chartData.chart4Data}
                            options={chartData.chart4Options}
                            type={'Line'}
                            className="ct-4 flot-chart-container" />
                    </CardBody>
                </Card>
            </Col>
        </Fragment>
    )
}

export default LineChartWithAreaClass;