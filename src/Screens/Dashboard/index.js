import React, { Fragment, useEffect, useState } from 'react';
import { Container, Card, CardBody } from 'reactstrap';
import { useSelector } from 'react-redux';
import { Calendar, theme, Col, Row, Typography, Space, List, Progress, Image } from 'antd';
import moment from 'moment';
import { loadCauHinhThoiGianByIdDot } from '../../redux/actions/dmDotAction';

const Dashboard = () => {
    const { dotSelected } = useSelector(state => state.dmDot);
    const { Title, Text } = Typography;
    const [khungThoiGian, setKhungThoiGian] = useState([]);
    var images = require.context('../../assets/images', true);
    const dynamicImage = (image) => {
        return images(`./${image}`);
    };

    const { token } = theme.useToken();

    const wrapperStyle = {
        padding: '5px 20px',
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
        height: 'fit-content',
    };

    const onPanelChange = (value, mode) => {
        console.log(value.format('DD-MM-YYYY'), mode);
    };

    useEffect(async () => {
        if (!dotSelected) return;
        let result = await loadCauHinhThoiGianByIdDot({ idDot: dotSelected.id });
        setKhungThoiGian(result);
    }, [dotSelected]);

    const isTakePlace = (ngayBatDau, ngayKetThuc) => {
        const ngayHienTai = moment(new Date);
        return moment(ngayBatDau) <= ngayHienTai && ngayHienTai <= moment(ngayKetThuc);
    };

    const getDateProgressPercent = (ngayBatDau, ngayKetThuc) => {
        const ngayHienTai = moment(new Date);
        const totalDate = moment(ngayKetThuc) - moment(ngayBatDau);
        const datePassed = ngayHienTai - moment(ngayBatDau);
        return datePassed < 0 ? 0 : datePassed / totalDate * 100;
    }

    const renderItem = (lastIndex, item, index) => {
        console.log('index ' + index)
        console.log('lastIndex ' + lastIndex)

        let isTakePlaced = isTakePlace(item.ngayBatDau, item.ngayKetThuc);
        return (
            <Row>
                <Col style={{ height: 'auto', width: '30px' }}>
                    <div style={{ height: '20%', display: 'flex', justifyContent: 'center' }}>
                        <div style={{ height: '100%', backgroundColor: index != 0 ? '#184785' : 'transparent', width: '4px' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div
                            style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '50px',
                                backgroundColor: '#184785',
                                position: 'absolute',
                                top: '10px',
                                outline: '3px solid #184785',
                                outlineOffset: '3px',
                            }}
                        ></div>
                    </div>
                    <div style={{ height: '80%', display: 'flex', justifyContent: 'center' }}>
                        <div style={{ height: '100%', backgroundColor: index != lastIndex ? '#184785' : 'transparent', width: '4px' }} />
                    </div>
                </Col>
                <Col span={3} style={{ justifyContent: 'center', marginLeft: '20px' }}>
                    <Text
                        strong={true}
                        style={{ opacity: isTakePlaced ? '1' : '0.7',  }}>
                        {item?.ten}:
                    </Text>
                </Col>
                <Col span={15} style={{ paddingBottom: '20px', marginLeft: '10px' }}>
                    <Progress
                        style={{ marginTop: '10px', marginBottom: '0', paddingInline: '25px', opacity: isTakePlaced ? '1' : '0.5' }}
                        percent={getDateProgressPercent(item.ngayBatDau, item.ngayKetThuc)}
                        showInfo={false} />
                    <Row style={{ justifyContent: 'space-between' }}>
                        <Text
                            strong={true}
                            style={{ color: '#333333',  }}>
                            {moment(item?.ngayBatDau).format('DD/MM/YYYY')}
                        </Text>
                        <Text
                            strong={true}
                            style={{ color: '#333333',  }}>
                            {moment(item?.ngayKetThuc).format('DD/MM/YYYY')}
                        </Text>
                    </Row>
                </Col>
            </Row>
        )
    }

    return (
        <Fragment>
            <Container fluid={true}>
                <Row>
                    <Card>
                        <CardBody style={{ padding: '40px' }}>
                            <Row>
                                <Col span={18}>
                                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                                        <Row>
                                            <Title style={{ color: '#184785' }}>{dotSelected?.ten}</Title>
                                        </Row>
                                        <Row gutter={{ xs: 6, sm: 14, md: 22, lg: 30 }}>
                                            <Col
                                                span={4}
                                                style={{ display: 'flex', justifyContent: 'end' }}>
                                                <Text
                                                    strong={true}
                                                    style={{ color: '#898989',  textAlign: 'end' }}>
                                                    Trạng thái
                                                </Text>
                                            </Col>
                                            <Col span={19}>
                                                <Text
                                                    strong={true}
                                                    style={{ color: '#333333',  }}>
                                                    {dotSelected?.active ? 'Đang diễn ra' : 'Sắp diễn ra'}
                                                </Text>
                                            </Col>
                                        </Row>
                                        <Row gutter={{ xs: 6, sm: 14, md: 22, lg: 30 }}>
                                            <Col
                                                span={4}
                                                style={{ display: 'flex', justifyContent: 'end' }}>
                                                <Text
                                                    strong={true}
                                                    style={{ color: '#898989',  textAlign: 'end' }}>
                                                    Thời gian
                                                </Text>
                                            </Col>
                                            <Col span={19}>
                                                {khungThoiGian.length ?
                                                    <List
                                                        dataSource={khungThoiGian}
                                                        renderItem={(thoiGian, index) => renderItem(khungThoiGian.length - 1, thoiGian, index)}
                                                    />
                                                    :
                                                    <Text
                                                        strong={true}
                                                        style={{ color: '#333333',  }}>
                                                        Chưa có thời gian cụ thể
                                                    </Text>}
                                            </Col>
                                        </Row>
                                        <Row gutter={{ xs: 6, sm: 14, md: 22, lg: 30 }}>
                                            <Col
                                                span={4}
                                                style={{ display: 'flex', justifyContent: 'end' }}>
                                                <Text
                                                    strong={true}
                                                    style={{ color: '#898989',textAlign: 'end' }}>
                                                    Mô tả
                                                </Text>
                                            </Col>
                                            <Col span={19}>
                                                <Text
                                                    strong={true}
                                                    style={{ color: '#333333'}}>
                                                    {dotSelected?.ghiChu}
                                                </Text>
                                            </Col>
                                        </Row>
                                    </Space>
                                </Col>
                                <Col span={6} style={wrapperStyle}>
                                    <Text
                                        strong={true}
                                        style={{ color: '#333333' }}>
                                        Lịch
                                    </Text>
                                    <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Row>
            </Container>
        </Fragment>
    );
};

const image = {
    position: 'absolute',
    top: '15px',
};

export default Dashboard;