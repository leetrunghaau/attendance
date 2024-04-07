import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Table, Tag, Select, Button, Space } from "antd";
import { SaveOutlined, RollbackOutlined, CodepenOutlined ,PlusOutlined} from '@ant-design/icons';
import { showSuccessToast, showErrorToast } from '../../../Util/toast';
import Loading from '../../../Components/Common/Loading';
import { GetDanhMucKhoi,GetDanhMucDonVi } from "../../../Services/DanhMuc.service";
import {GetDanhSachTieuChiPhanCong,LuuTieuChiPhanCong} from "../../../Services/DanhGiaPhanCongTieuChi.service";
import { Checkbox } from "antd";
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../../../redux/actions/loadingAction';
import { IconDelete, IconEdit,IconThem } from '../../../Components/IconButton';
const CHECK = {
    THAM_DINH: "THAMDINH",
}

const updateDataInTreeDown = (data, dataDes, colUpdate, forceUpdateChild = false) => {
    data.forEach(item => {
        if (item.id == dataDes.id || forceUpdateChild == true) {
            console.log("TYPE==>", colUpdate);
            switch (colUpdate) {
                case CHECK.THAM_DINH:
                    item.isCheck = dataDes.isCheck;
                    break;                
            }
            if (item.children)
                updateDataInTreeDown(item.children, dataDes, colUpdate, true);
            return;
        }
        if (item.children)
            updateDataInTreeDown(item.children, dataDes, colUpdate, forceUpdateChild);
    });
}
const updateDataInTreeUp = (data) => {
    data.forEach(item => {
        if (item.children) {
                 updateDataInTreeUp(item.children);
            item.isCheck = false;
            if (item.children.length == item.children.reduce((acc, obj) => acc + (obj.isCheck?1:0), 0))
                item.isCheck = true;

            item.diemChuan = item.children.reduce((acc, obj) => acc + obj.diemChuan, 0);
        }
    });
}

const prepareDataTreeUpdate = (data, result) => {
    data.forEach(item => {
        if(item.children)
        {
            prepareDataTreeUpdate(item.children,result);            
        }
        else
        {
            if(item.isCheck)
                result.push({ IdTieuChi: item.id});
        }
    });
  }


const TablePhanCongDanhGia = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { dotSelected } = useSelector(state => state.dmDot);
    const [defaultData, setDefaultData] = useState(); //list data
    const [listData, setListData] = useState([]); //list data

   const [khoiData, setKhoiData] = useState();
    const [khoiSelected, setKhoiSelected] = useState("");  

    const [donViData, setDonViData] = useState();
    const [donViSelected, setDonViSelected] = useState("");  
    const [showSaveChange, setShowSaveChange] = useState(false);

    const generateData = (data) => {
        data.forEach(item => {
            if (item.inverseParent?.length > 0)
                item.children = item.inverseParent;
            item.isCheck = item.danhGiaPhanCongs?.length > 0 ? 
            item.danhGiaPhanCongs.filter(item => item.maDv == donViSelected && item.idloaiCham==2).length > 0?true:false : 
            false;

            if (item.inverseParent)
                generateData(item.inverseParent)
        });
        return data;
    };

    

    useEffect(() => {
        loadDanhMucKhoi();
        loadDanhMucDonVi();
    }, []);

    useEffect(async () => {
        loadDataTieuChi();
    }, [khoiSelected,donViSelected,dotSelected])
   

    useEffect(() => {
        if (defaultData) {
            initData();
        }
    }, [defaultData]);

    const loadDataTieuChi=async()=>{
        if (khoiSelected && dotSelected && donViSelected) {
            dispatch(showLoading());
            let result = await GetDanhSachTieuChiPhanCong({ idKhoi:khoiSelected,idDot:dotSelected.id,maDv:donViSelected });
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
        console.log("DATA GENERATE====>",data);
        updateDataInTreeUp(data);
        setListData(data);
        setShowSaveChange(false);
    }

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
            setDonViData([]);
            return;
        }
        else {
            let tempData = [];

            result.data.forEach(element => {
                if(element.khoiId==2)
                {
                let item = { value: element.maDv, label: element.maDv +' - '+ element.ten };
                tempData.push(item);
                }
            });
            setDonViData(tempData);
        }
    }


    const updateCheck = (item, type, val) => {
        switch (type) {
            case CHECK.THAM_DINH:
                item.isCheck = !item.isCheck;
                break;           
        }
        let dataUpdate = _.cloneDeep(listData);
        updateDataInTreeDown(dataUpdate, item, type);
        updateDataInTreeUp(dataUpdate);
        setListData(dataUpdate);
        setShowSaveChange(true);
    }

    const LuuThayDoi = async () => {
        dispatch(showLoading());
        const result = [];
        prepareDataTreeUpdate(listData, result);
        console.log("DATA PREPARE==>", result);
        let kq = await LuuTieuChiPhanCong({
            maDv:donViSelected,IdloaiCham:2,
            phancong:result
        });
        if (kq?.status == "Ok") {
            loadDataTieuChi();
            showSuccessToast("Cập nhật thành công");
        }
        else {
          showErrorToast(kq.message ? kq.message : "Lỗi khi gọi api");
          dispatch(hideLoading());
        }
      }
 
    const columns = [
       
       
        {
            title: 'Tên tiêu chí',
            dataIndex: 'ten',
            key: 'ten',
            render: (text, record,index) => 
            <div style={{ fontWeight: record.children ? 'bold' : 'normal',display:'flow-root',color:record.isCheck?'blue':'black'}}>
                <span style={{color:'blue'}}>{record.stt}. </span>
                <span style={{whiteSpace:'pre-wrap'}}>{text}   <br/>  
                <span style={{fontStyle:'italic'}}>{record.ghiChu}</span>   
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
            render: (text,record) => <div style={{textAlign:'right',fontWeight: record.children ? 'bold' : 'normal'}}>{text}</div>,
        },
        {
            title: "#",
            key: "#",
            width: 150,
            align: "center",
            render: (_, item) =>  
            <Checkbox
            onClick={(val) => updateCheck(item, CHECK.THAM_DINH)}
            checked={item.isCheck}/>,
          },
    ];


    return listData ? (
        <>
            <Fragment>
                <Row style={{ marginBottom: 25 }}>
                    <Col span={8}>
                        <div style={{ display: 'block' }}>
                            <div style={{ alignSelf: 'center', fontWeight: 'bold', marginRight: 5 }}>{"Chọn tiêu chí của"}</div>
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
                    <Col span={8}>
                        <div style={{ display: 'block', marginLeft:10 }}>
                            <div style={{ alignSelf: 'center', fontWeight: 'bold', marginRight: 5 }}>{"Chọn Ban phân công chấm thẩm định"}</div>
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
                    {
                        showSaveChange &&
                        <Col span={8} style={{paddingTop:10}}>
                        <Space style={{ float: 'right' }}>
                          <Button danger className='d-block mb-2 pull-right' htmlType="button" icon={<RollbackOutlined />} onClick={() => initData()}>
                            Revert
                          </Button>
                          <Button type="primary" className='d-block mb-2 pull-right' htmlType="button" icon={<SaveOutlined />} onClick={() => LuuThayDoi()}>
                            Lưu thay đổi
                          </Button>
                        </Space>
                        </Col>
                    }
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
export default TablePhanCongDanhGia;
