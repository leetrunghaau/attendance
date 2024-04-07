import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Table, Tag, Select, Button, Space, Popover, Form, InputNumber } from "antd";
import { SaveOutlined, RollbackOutlined, CodepenOutlined, PlusOutlined } from '@ant-design/icons';
import { showSuccessToast, showErrorToast } from '../../../Util/toast';
import Loading from '../../../Components/Common/Loading';
import { GetDanhMucKhoi, GetDanhMucDonVi } from "../../../Services/DanhMuc.service";
import { GetTongHopNhanXet } from "../../../Services/NhanXet.service";
import { Checkbox } from "antd";
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../../../redux/actions/loadingAction';

import { CellStyle, ExportExcel,GetHeaderFromAntTableColumn,GetMergeHeaderFromAntTableColumn,GetMergeTitle,GetWidthColumn } from '../../../Util/ExportExcel';

const generate = (data, result) => {
    data.forEach(item => {
        if (item.showReport) {
            item.children = [];
            result.push(item);
            generate(item.inverseParent, item.children);
        }
        else if (item.inverseParent.length > 0) {
            generate(item.inverseParent, result);
        }
    });
}

const TableTongHop = () => {
    const dispatch = useDispatch();
    const { dotSelected } = useSelector(state => state.dmDot);
    const { details } = useSelector(state => state.login);
    const [listData, setListData] = useState(null); //list data

    const [khoiData, setKhoiData] = useState();
    const [khoiSelected, setKhoiSelected] = useState("");
    const [originDataDonVi, setOriginDataDonVi] = useState([]);
    const [columnTable, setColumnTable] = useState([]);
    const [maxLevel, setMaxLevel] = useState(0);



    useEffect(() => {
        loadDanhMucKhoi();
        loadDanhMucDonVi();
    }, []);

    useEffect(async () => {
        loadDataTongHop();
    }, [khoiSelected, dotSelected, originDataDonVi])



    const loadDanhMucKhoi = async () => {
        let result = await GetDanhMucKhoi();
        if (result.status != 'Ok') {
            setKhoiData([]);
            return;
        }
        else {
            let tempData = [];

            result.data.forEach(element => {
                let item = { value: element.id, label: element.ten };
                tempData.push(item);
            });
            console.log("DANH MUC KHOI==>", tempData);
            setKhoiData(tempData);
        }
    }

    const loadDanhMucDonVi = async () => {
        let result = await GetDanhMucDonVi();
        if (result.status != 'Ok') {
            setOriginDataDonVi([]);
            return;
        }
        else {
            setOriginDataDonVi(result.data);
            console.log("DanhMucDonVi");
        }
    }

    const loadDataTongHop = async () => {
        if (khoiSelected && dotSelected && originDataDonVi.length > 0) {
            dispatch(showLoading());
            let result = await GetTongHopNhanXet({ idKhoi: khoiSelected, idDot: dotSelected.id });
            if (result.status == "Ok") {
                const temp = [];
                generate(_.cloneDeep(result.data), temp);
                console.log("DATA AFTER GENERAL==>", temp);

                var columns = [
                    { title: "STT", dataIndex: "row_STT", key: "row_STT",level:1,mergeCol:1,maxLevelChild:0 }, { title: "Đơn vị", dataIndex: "row_DonVi", key: "row_DonVi",level:1,mergeCol:1,maxLevelChild:0 }
                ]
                var maxRow=[];  
                maxRow[0]=0;              
                createColumnTable(_.cloneDeep(temp), columns,1,maxRow);
                setColumnTable(columns);
                setMaxLevel(maxRow[0]);

                console.log("HEADER COLUMN==>",maxRow[0], columns);

                
                var dataTable = [];
                var stt = 0;
                originDataDonVi.forEach(element => {
                    if (element.khoiId != khoiSelected)
                        return;
                    stt++;
                    var item={row_STT:stt,row_DonVi:element.ten};
                    createDataTable(element.maDv,_.cloneDeep(temp),item);
                    dataTable.push(item);
                });
                console.log("DATA TABLE=======>",dataTable);
                 setListData(dataTable);
            }
        }
        dispatch(hideLoading());
    }

    const createColumnTable = (data, result,level,maxLevel) => {
        maxLevel[0]=Math.max(level,maxLevel[0]);
        console.log("MAX LEVEL==>",maxLevel[0]);

        data.forEach(element => {
            let column = {
                title: element.ten,
                level:level
            }
            result.push(column);
            if (element.children && element.children.length > 0) {
                column.children = [];
                createColumnTable(element.children, column.children,level+1,maxLevel)
                column.mergeCol = column.children.reduce((acc, obj) => acc + obj.mergeCol, 0);         
                column.maxLevelChild=column.children.reduce((a,b)=>a.maxLevelChild>b.maxLevelChild?a:b).maxLevelChild +1 ;      
            }
            else {
                column.dataIndex = "row_" + element.id;
                column.key = "row_" + element.id;
                column.mergeCol=1;
                column.maxLevelChild=0;
            }
        });
    }

    const createDataTable = (idDonVi, data, item) => {
        data.forEach(element => {
            var KQ=element.nhanXetKetQuas?.find(x=>x.idDonViDuocDanhGia==idDonVi);
            if(!element.children || element.children.length <= 0)
            {
                item['row_'+element.id]=KQ?.noiDung?KQ.noiDung:"";
            }
            if(element.children && element.children.length > 0)
                createDataTable(idDonVi,element.children,item);
        });
    }

    const prepareDataExportExcel = (data, result) => {
        data.forEach(item => {
            var row = [];
            Object.entries(item).forEach(([key, value]) => {
                row.push({ v: value,t:'s', s: { ...CellStyle.BORDER} });
              });
            result.push(row);
                
        });       
        
    }

    const getDataExportExcel = () => {
        var result = {};      
        //FOR TITLE       
        result.title ={
            format:{ origin: 'A1' }
            ,data: [
            [{
                v: "TỔNG HỢP NHẬN XÉT"
                , s: { ...CellStyle.TIEUDE }
            }]
        ]};
        // //FOR HEADER
        result.header ={
            format:{ origin: 'A5' }
            ,data: GetHeaderFromAntTableColumn(columnTable,maxLevel)            
            };
        //FOR DATA
        result.data={
            format:{ origin: 'A'+(5+maxLevel) }
            ,data:[]};
        prepareDataExportExcel(listData,result.data.data);

        //FOR MERGE
        //Merge Title
        result.merge=GetMergeTitle(columnTable,0,0);
        //MergeRowColumnHeader
        result.merge=result.merge.concat(GetMergeHeaderFromAntTableColumn(columnTable,4,0,maxLevel)); 
       
        //FOR WIDTH COLUMN
        result.cols= [
            {wch:5},          
        ];
        result.cols=result.cols.concat(GetWidthColumn(columnTable,30,1))
        return result;
    }

    const xuatExcel = async () => {
        var data = getDataExportExcel();
        ExportExcel(data,"TieuChi");
    };




    return (
        <>
            <Fragment>
                <Row style={{}}>
                    <Col span={8}>
                        <div style={{ display: 'block' }}>
                            <div style={{ alignSelf: 'center', fontWeight: 'bold', marginRight: 5 }}>{"Chọn tổng hợp khối"}</div>
                            <div>
                                <Select style={{ width: '100%' }}

                                    showSearch
                                    placeholder="Nhập để tìm kiếm..."
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={khoiData}
                                    onChange={(val) => { setKhoiSelected(val) }}
                                    className="js-example-basic-single col-sm-12"
                                />
                            </div>
                        </div>
                    </Col>
                    <Col span={16} style={{ paddingTop: 20 }}>
                        <Space style={{ float: 'right' }}>
                            <Button type="primary" className='d-block mb-2 pull-right' htmlType="button" icon={<SaveOutlined />} onClick={() => xuatExcel()}>
                                Xuất excel
                            </Button>
                        </Space>

                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        {listData &&
                            <Table
                                scroll={{
                                    x: '150vw',
                                }}
                                style={{ fontSize: 10 }}
                                columns={columnTable}
                                dataSource={listData}
                                bordered
                                size="middle"
                                rowKey="thuTu"
                                pagination={false}
                            />
                        }
                    </Col>
                </Row>

            </Fragment>

        </>
    );

};
export default TableTongHop;
