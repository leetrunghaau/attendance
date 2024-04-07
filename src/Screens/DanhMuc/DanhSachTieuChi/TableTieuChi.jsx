import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Table, Tag, Select, Button, Space } from "antd";
import { SaveOutlined, RollbackOutlined, CodepenOutlined ,PlusOutlined} from '@ant-design/icons';
import { showSuccessToast, showErrorToast } from '../../../Util/toast';
import Loading from '../../../Components/Common/Loading';
import { GetDanhMucKhoi } from "../../../Services/DanhMuc.service";
import { GetDanhSachTieuChi,XoaTieuChi,AddOrUpdateTieuChi } from "../../../Services/DanhGiaDMTieuChi.service";
import { Checkbox } from "antd";
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../../../redux/actions/loadingAction';
import { IconDelete, IconEdit,IconThem } from '../../../Components/IconButton';
import UpdateTieuChi from './Forms/UpdateTieuChi';
import {convertMessageToHTML} from '../../../Util/Utils';

const updateDataInTreeUp = (data) => {
    data.forEach(item => {
        if (item.children) {
                 updateDataInTreeUp(item.children);
            item.diemChuan = item.children.reduce((acc, obj) => acc + obj.diemChuan, 0);
           
        }
    });
}


const TableTieuChi = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { dotSelected } = useSelector(state => state.dmDot);
    const [defaultData, setDefaultData] = useState(); //list data
    const [listData, setListData] = useState([]); //list data
   const [khoiData, setKhoiData] = useState();
    const [khoiSelected, setKhoiSelected] = useState("");  

    const [itemUpdate, setItemUpdate] = useState(null);
    const [showModal, setShowModal] = useState(false);


    const generateData = (data) => {
        data.forEach(item => {
            if (item.inverseParent?.length > 0)
                item.children = item.inverseParent;
            if (item.inverseParent)
                generateData(item.inverseParent)
        });
        return data;
    };

    

    useEffect(() => {
        loadDanhMuc();
    }, []);

    useEffect(async () => {
        loadDataTieuChi();
    }, [khoiSelected])

    useEffect(() => {
        if (defaultData) {
            initData();
        }
    }, [defaultData]);

    const loadDataTieuChi=async()=>{
        if (khoiSelected && dotSelected) {
            dispatch(showLoading());
            let result = await GetDanhSachTieuChi({ idKhoi:khoiSelected,idDot:dotSelected.id });
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
    }

    const loadDanhMuc = async () => {
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

    const themTieuChi = (parentId) => {
        if(!dotSelected || !khoiSelected)
        {
          showErrorToast('Bạn phải chọn đợt và khối trước');
            return;
        }
        let itemInsert = {
          id: 0,
          stt: "",
          ten: "",
          parentId: parentId,
          idDot: dotSelected.id,
          diemChuan: 0,
          idKhoi: khoiSelected,
          ghiChu: ""
        };
        setItemUpdate(itemInsert); 
        setShowModal(true); 
      };
    
      const capNhatTieuChi = (item) => {
        setItemUpdate(item);
        setShowModal(true);
      };

    const xoaTieuChi = async (item) => {
        let result = await XoaTieuChi(item.id );
        if (result.status == "Ok") {
          showSuccessToast('Đã xóa item thành công !');
           loadDataTieuChi();
        } else {
          showErrorToast('Lỗi khi xóa: ' + result.message);
        }
      };
    

 
    const columns = [
       
       
        {
            title: 'Tên tiêu chí',
            dataIndex: 'ten',
            key: 'ten',
            render: (text, record,index) => 
            <div style={{ fontWeight: record.children ? 'bold' : 'normal',display:'flow-root'}}>
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
            render: (_, item) => {
              return (
                <>
                  <IconDelete
                    textContent={"Bạn có muốn xóa tiêu chí này?"}
                    callback={() => xoaTieuChi(item)}
                  />
                  <IconEdit callback={() => capNhatTieuChi(item)} />
                  <IconThem callback={() => themTieuChi(item.id)} />
                </>
              );
            },
          },
    ];


    return listData ? (
        <>
            <Fragment>
                <Row style={{ marginBottom: 25 }}>
                    <Col span={12}>
                        <div style={{ display: 'block' }}>
                            <div style={{ alignSelf: 'center', fontWeight: 'bold', marginRight: 5 }}>{"Tiêu chí của"}</div>
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
                    <Col span={12}>
                        <Button style={{marginTop:21}} type="primary" className='d-block mb-2 pull-right' htmlType="button" onClick={(e) => themTieuChi(null)} icon={<PlusOutlined />}>
                            Thêm tiêu chí
                        </Button>           
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
            <UpdateTieuChi
        showModal={showModal}
        setShowModal={(value) => setShowModal(value)}
        data={itemUpdate}
        onFinishUpdate={(isAdd, data) => {
            loadDataTieuChi();
        }}
      />
        </>
    ) : (
        <Loading />
    );
};
export default TableTieuChi;
