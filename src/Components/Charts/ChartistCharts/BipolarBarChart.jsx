import React, { Fragment } from "react";
import ChartistGraph from "react-chartist";
import { Col, Card, CardBody } from "reactstrap";
import { BipolarBarChart } from "../../../Constant";
import HeaderCard from "../../Common/Component/HeaderCard";

const BipolarBarChartClass = ({ chartData }) => {
    return (
        <Fragment>
            <Col xl="6" md="12" sm="12" >
                <Card>
                    <HeaderCard title={BipolarBarChart} />
                    <CardBody>
                        <ChartistGraph
                            data={chartData.chart5Data}
                            options={chartData.chart5Options}
                            type={'Bar'}
                            className="ct-9 flot-chart-container" />
                    </CardBody>
                </Card>
            </Col>
        </Fragment>
    )
}

export default BipolarBarChartClass;