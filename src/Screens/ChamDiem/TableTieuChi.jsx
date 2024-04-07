import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Table, Tag, Select, Button, Space, Popover, Form, InputNumber } from "antd";
import { SaveOutlined, RollbackOutlined, CodepenOutlined, PlusOutlined } from '@ant-design/icons';
import { showSuccessToast, showErrorToast } from '../../Util/toast';
import Loading from '../../Components/Common/Loading';
import { GetDanhMucDonVi } from "../../Services/DanhMuc.service";
import { GetDanhSachTieuChiChamDiem, SaveChamDiem } from "../../Services/ChamDiem.service";
import { Checkbox } from "antd";
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/actions/loadingAction';

import { CellStyle,ExportExcel } from '../../Util/ExportExcel';

const TYPE = { TUCHAM: 1, THAMDINH: 2 };
const updateDataInTreeUp = (data) => {
    data.forEach(item => {
        if (item.children) {
            item.children = updateDataInTreeUp(item.children);
            item.diemChuan = item.children.reduce((acc, obj) => acc + obj.diemChuan, 0);
            item.diemTuDanhGia = item.children.reduce((acc, obj) => acc + obj?.diemTuDanhGia, 0);
            item.diemThamDinh = item.children.reduce((acc, obj) => acc + obj?.diemThamDinh, 0);
            item.duocChamDiem = item.children.reduce((acc, obj) => acc + obj?.duocChamDiem, 0) > 0;

        }
        else
            item.duocChamDiem = item.duocChamDiem == 1 ? true : false;


    });
    console.log("AFTER LOOP==>", data);
    data = data.filter(s => s.duocChamDiem == true);
    return data;
}
const prepareDataExportExcel = (data, result,isRoot=true) => {
    data.forEach(item => {
        const BOLD=item.children?CellStyle.BOLD:{};
        var row = []
        row.push({ v: item.stt.trim(),t:'s', s: { ...CellStyle.BORDER,...BOLD,...CellStyle.ALIGN.V_CENTER,...CellStyle.ALIGN.H_CENTER } });
        row.push({ v: item.ten +"\n" + item?.ghiChu,t:'s', s: { ...CellStyle.BORDER,...BOLD,...CellStyle.WRAP } });
        row.push({ v: item.diemChuan,t:'s', s: { ...CellStyle.BORDER,...BOLD,...CellStyle.ALIGN.RIGHT } });
        row.push({ v: item.diemTuDanhGia?item.diemTuDanhGia:"",t:'s', s: { ...CellStyle.BORDER,...BOLD,...CellStyle.ALIGN.RIGHT } });
        row.push({ v: item.diemThamDinh?item.diemThamDinh:"",t:'s', s: { ...CellStyle.BORDER,...BOLD,...CellStyle.ALIGN.RIGHT } });
        result.push(row);
        if (item.children) {
            prepareDataExportExcel(item.children,result,false);
        }      
    });
    if(isRoot)
    {
        var row = [];
        row.push({ v: "",t:'s', s: { ...CellStyle.BORDER,...CellStyle.BOLD,...CellStyle.BG_COLOR("8bb4f7") } });
        row.push({ v: "Tổng",t:'s', s: { ...CellStyle.BORDER,...CellStyle.BOLD,...CellStyle.FONTSIZE(16),...CellStyle.BG_COLOR("8bb4f7") } });
        row.push({ v:data.reduce((acc, obj) => acc + obj?.diemChuan, 0),t:'s', s: { ...CellStyle.BORDER,...CellStyle.BOLD,...CellStyle.ALIGN.RIGHT,...CellStyle.FONTSIZE(16),...CellStyle.BG_COLOR("8bb4f7")  } });
        row.push({ v:data.reduce((acc, obj) => acc + obj?.diemTuDanhGia, 0),t:'s', s: { ...CellStyle.BORDER,...CellStyle.BOLD,...CellStyle.ALIGN.RIGHT,...CellStyle.FONTSIZE(16),...CellStyle.BG_COLOR("8bb4f7")  } });
        row.push({ v:data.reduce((acc, obj) => acc + obj?.diemThamDinh, 0),t:'s', s: { ...CellStyle.BORDER,...CellStyle.BOLD,...CellStyle.ALIGN.RIGHT,...CellStyle.FONTSIZE(16),...CellStyle.BG_COLOR("8bb4f7")  } });
        result.push(row);
    }
    
}

// const filterData = (data,result) => {
//     data.forEach(item => {
//        if(item.)
//     });
// }


const TableTieuChi = ({ type }) => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { dotSelected } = useSelector(state => state.dmDot);
    const { details } = useSelector(state => state.login);
    const [defaultData, setDefaultData] = useState(); //list data
    const [listData, setListData] = useState([]); //list data

    const [originDataDonVi, setOriginDataDonVi] = useState(null);
    const [donViData, setDonViData] = useState();
    const [donViSelected, setDonViSelected] = useState("");

    const [valueUpdate, setValueUpdate] = useState(0);
    const [open, setOpen] = useState(false);


    const generateData = (data) => {
        data.forEach(item => {
            if (item.inverseParent?.length > 0)
                item.children = item.inverseParent;
            else {
                const listTuCham = item.danhGiaChamDiems.filter(s => s.idLoaiCham == TYPE.TUCHAM);
                var listThamDinh = item.danhGiaChamDiems.filter(s => s.idLoaiCham == TYPE.THAMDINH);
                item.duocChamDiem = 1;
                if (type == TYPE.THAMDINH) {
                    const listPhanCong = item.danhGiaPhanCongs.filter(s => s.idloaiCham == TYPE.THAMDINH);
                    item.duocChamDiem = listPhanCong.length > 0;
                    listThamDinh = listThamDinh?.filter(s => s.idDonViCham == details.DonVi);

                }
                const averageTuCham = listTuCham.length > 0 ? listTuCham.reduce((total, next) => total + next.diem, 0) / listTuCham.length : null;
                const averageThamDinh = listThamDinh.length > 0 ? listThamDinh.reduce((total, next) => total + next.diem, 0) / listThamDinh.length : null;
                item.diemTuDanhGia = averageTuCham;
                item.diemThamDinh = averageThamDinh;
            }
            if (item.inverseParent)
                generateData(item.inverseParent)
        });
        return data;
    };



    useEffect(() => {
        loadDanhMucDonVi();
    }, []);

    useEffect(async () => {
        loadDataTieuChi();
    }, [donViSelected, dotSelected])

    useEffect(() => {
        if (defaultData) {
            initData();
        }
    }, [defaultData]);

    useEffect(() => {
        if (originDataDonVi) {
            console.log("DATA DON VI==>",originDataDonVi);
            let tempData = [];

            originDataDonVi.forEach(element => {
                if (element.khoiId == 1 && (((type == TYPE.TUCHAM && details.DonVi == element.maDv)
                    || type == TYPE.THAMDINH) || details.Role == "ADMIN")
                   
                ) {
                    let item = { value: element.maDv, label: element.maDv + ' - ' + element.ten };
                    tempData.push(item);
                }
            });
            setDonViData(tempData);
        }
    }, [originDataDonVi]);

    const loadDataTieuChi = async () => {
        if (donViSelected && dotSelected) {
            dispatch(showLoading());
            let result = await GetDanhSachTieuChiChamDiem({ maDv: donViSelected, idDot: dotSelected.id, idKhoi: 1 });
            if (result.status == "Ok") {
                setDefaultData(result.data)
            }
        } else {
            setDefaultData([])
        }
        dispatch(hideLoading());
    }

    const initData = () => {
        var data = generateData(_.cloneDeep(defaultData));
        console.log("DATA GENERATE====>", data);
        var temp = updateDataInTreeUp(data);
        console.log("DATA TREE UP====>", temp);

        setListData(temp);
    }

    const loadDanhMucDonVi = async () => {
        let result = await GetDanhMucDonVi();
        if (result.status != 'Ok') {
            setOriginDataDonVi([]);
            return;
        }
        else {
           
            setOriginDataDonVi(result.data);
        }
    }

    const luuChamDiem = async (item) => {
        if (valueUpdate > item.diemChuan) {
            showErrorToast("Điểm đánh giá không được lớn hơn điểm chuẩn");
            return;
        }
        dispatch(showLoading());
        let kq = await SaveChamDiem({
            IdTieuChi: item.id,
            IdDonViDuocCham: donViSelected,
            IdLoaiCham: type,
            Diem: valueUpdate
        });
        if (kq?.status == "Ok") {
            loadDataTieuChi();
            showSuccessToast("Cập nhật thành công");
            setOpen(false);
        }
        else {
            showErrorToast(kq.message ? kq.message : "Lỗi khi gọi api");
            dispatch(hideLoading());
        }
    }

    const getDataExportExcel = () => {
        var result = {};      
        //FOR TITLE       
        var tenDV=originDataDonVi.find(s=>s.maDv==donViSelected)?.ten;  
        result.title ={
            format:{ origin: 'A1' }
            ,data: [
            [{
                v: "TIÊU CHÍ XẾP LOẠI CHẤT LƯỢNG NGƯỜI ĐỨNG ĐẦU ĐƠN VỊ"
                , s: { ...CellStyle.TIEUDE }
            }],
            [{
                v: tenDV
                , s: { ...CellStyle.TIEUDE }
            }],
        ]};
        //FOR HEADER
        result.header ={
            format:{ origin: 'A5' }
            ,data: [
            [
                { v: "TT",t:'s', s: { ...CellStyle.TIEUDE, ...CellStyle.BORDER } }
                , { v: "Nội dung đánh giá",t:'s', s: { ...CellStyle.HEADER_COLUMN, ...CellStyle.BORDER } }
                , { v: "Điểm chuẩn",t:'s', s: { ...CellStyle.HEADER_COLUMN, ...CellStyle.BORDER } }
                , { v: "Điểm đánh giá",t:'s', s: { ...CellStyle.HEADER_COLUMN, ...CellStyle.BORDER } }
                , { v: "Điểm thẩm định",t:'s', s: { ...CellStyle.HEADER_COLUMN, ...CellStyle.BORDER } }
            ]
        ]};
        //FOR DATA
        result.data={
            format:{ origin: 'A6' }
            ,data:[]};
        prepareDataExportExcel(listData,result.data.data);

        //FOR MERGE
        result.merge = [
            { s: { r: 0, c: 0 }, e: { r: 0, c: 4 } },
            { s: { r: 1, c: 0 }, e: { r: 1, c: 4 } }
        ];
        //FOR WIDTH COLUMN
        result.cols= [
            {wch:5},
            {wch:80},
            {wch:15},
            {wch:15},
            {wch:15}
        ];
        return result;
    }

    const xuatExcel = async () => {
        var data = getDataExportExcel();
        ExportExcel(data,"TieuChi");
    };

    // const xuatExcel = async () => {
    //     const worksheet = XLSX.utils.json_to_sheet(MYdata);
    //     const workbook = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    //     XLSX.writeFile(workbook, "MYSavedData.xlsx");
    //   };





    const content = (item) => {
        return (
            <Form layout="vertical" style={{ padding: 10 }}>
                <Form.Item
                    label="Nhập điểm"
                    rules={[{ required: true, message: 'Phải nhập điểm' }]}>
                    {
                        <Space.Compact block>
                            <InputNumber
                                onChange={(val) => setValueUpdate(val)}
                                value={valueUpdate}
                                style={{ width: '100%' }}
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                onKeyDown={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        if (event.key != 'Tab'
                                            && event.key != 'Delete'
                                            && event.key != 'Backspace'
                                            && event.key != 'ArrowRight'
                                            && event.key != 'ArrowLeft'
                                        )
                                            event.preventDefault();
                                    }
                                }}
                            />
                            <Button htmlType="button" type="primary" shape="circle" icon={<SaveOutlined />} onClick={() => luuChamDiem(item)} />
                        </Space.Compact>
                    }
                </Form.Item>
            </Form>
        )
    };

    const columns = [


        {
            title: 'Tên tiêu chí',
            dataIndex: 'ten',
            key: 'ten',
            render: (text, record, index) =>
                <div style={{ fontWeight: record.children ? 'bold' : 'normal', display: 'flow-root' }}>
                    <span style={{ color: 'blue' }}>{record.stt}. </span>
                    <span style={{ whiteSpace: 'pre-wrap' }}>{text}   <br />
                        <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>{record.ghiChu}</span>
                    </span>
                </div>
            ,
        },
        {
            title: 'Điểm chuẩn',
            dataIndex: 'diemChuan',
            key: 'diemChuan',
            align: 'center',
            width: 150,
            render: (text, record) => <div style={{ textAlign: 'right', fontWeight: record.children ? 'bold' : 'normal' }}>{text}</div>,
        },
        {
            title: 'Tự chấm',
            dataIndex: 'diemTuDanhGia',
            key: 'diemTuDanhGia',
            align: 'center',
            width: 150,
            render: (text, record) =>
                <div style={{ textAlign: 'right', fontWeight: record.children ? 'bold' : 'normal' }}>
                    {
                        (!record.children && type == TYPE.TUCHAM && details.DonVi == donViSelected) &&
                        <Popover open={open} content={content(record)} trigger="click" onOpenChange={(open) => { setOpen(open); if (open) setValueUpdate(record.diemTuDanhGia) }}>

                            <div style={{ float: 'left' }}
                                className={'icon-button'}
                            >
                                <i className={`icofont icofont-ui-edit icon-edit`}></i>
                            </div>
                        </Popover>
                    }
                    {text}
                </div>,
        },
        {
            title: 'Thẩm định',
            dataIndex: 'diemThamDinh',
            key: 'diemThamDinh',
            align: 'center',
            width: 150,
            render: (text, record) =>
                <div style={{ textAlign: 'right', fontWeight: record.children ? 'bold' : 'normal' }}>
                    {
                        (!record.children && type == TYPE.THAMDINH) &&
                        <Popover content={content(record)} trigger="click" onOpenChange={(open) => { setOpen(open); if (open) setValueUpdate(record.diemThamDinh) }}>

                            <div style={{ float: 'left' }}
                                className={'icon-button'}
                            >
                                <i className={`icofont icofont-ui-edit icon-edit`}></i>
                            </div>
                        </Popover>
                    }
                    {text}
                </div>,
        },


    ];


    return listData ? (
        <>
            <Fragment>
                <Row style={{ }}>
                    <Col span={8}>
                        <div style={{ display: 'block'}}>
                            <div style={{ alignSelf: 'center', fontWeight: 'bold', marginRight: 5 }}>{"Tiêu chí của đơn vị"}</div>
                            <div>
                                <Select style={{ width: '100%' }}

                                    showSearch
                                    placeholder="Nhập để tìm kiếm..."
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={donViData}
                                    onChange={(val) => { setDonViSelected(val) }}
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
                        <Table
                            columns={columns}
                            dataSource={listData}
                            bordered
                            rowKey={"id"}
                            size="middle"
                            pagination={{
                                onChange(page, pageSize) {
                                    setPage(page);
                                    setPageSize(pageSize);
                                },
                            }}
                        />
                    </Col>
                </Row>

            </Fragment>

        </>
    ) : (
        <Loading />
    );
};
export default TableTieuChi;
