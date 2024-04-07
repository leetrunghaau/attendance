import React, { useState, useEffect, Fragment } from "react";
import { Table, Tag } from "antd";
import { Col } from "reactstrap";
import { IconDelete, IconEdit } from '../../../Components/IconButton';
import Loading from '../../../Components/Common/Loading';
import AddUpdateUser from "./Forms/AddUpdateUser";
import { Button } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { showSuccessToast, showErrorToast } from '../../../Util/toast'
import {
  getDanhSachUser,
} from "../../../Services/User.service";
import { resourceUsage } from "process";
const TableUser = () => {
  const [showModal, setShowModal] = useState(false);
  const [listUser, setListUser] = useState(null);
  const [itemUpdate, setItemUpdate] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    let result = await getDanhSachUser();
    console.log("DSUSER===>",result);
    if (result.status == "Ok") {
      setListUser(result.data);
    }
    else{
      showErrorToast(result.message);
      setListUser([]);
    }
  };
  const themUser = () => {
    let itemInsert = {
      userName: "",
      password: "",
      hoTen: "",
      active: true,
      idDonVi: null,
      idQuyen: null,
      ngayTao: null,
      ngaySua: null
    };
    setItemUpdate(itemInsert); 
    setShowModal(true); 
  };

  const udpateUser = (item) => {
    setItemUpdate(item);
    setShowModal(true);
  }
  
  const columns = [
    {
      title: "STT",
      key: "index",
      width: "30px",
      align: "center",
      render: (text, record, index) =>
        page === 1 ? index + 1 : (page - 1) * pageSize + (index + 1),
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Quyền",
      dataIndex: "idQuyenNavigation",
      key: "idQuyenNavigation",
      render: (data) => data.ten,
    },
    {
      title: "Đơn vị",
      dataIndex: "maDvNavigation",
      key: "maDvNavigation",
      render: (data) => data?.ten,
    },
    {

      title: 'Trạng thái',
      dataIndex: 'active',
      key: 'active',
      align: 'center',
      render: (active) => <Tag color={active ? 'green' : "red"}>{active ? "Hoạt động" : "Khoá"}</Tag>,
    },
    {
      title: "#",
      key: "#",
      width: "80px",
      align: "center",
      render: (_, item) => {
        return (
          <>
            <IconEdit callback={() => udpateUser(item)} />
          </>
        );
      },
    },
  ];
  return ( 
    listUser?
    <>
     
      <Fragment>
        <Col sm="12">

          <Button type="primary" className='d-block mb-2 pull-right' htmlType="button" onClick={(e) => themUser()} icon={<PlusOutlined />}>
            Thêm User
          </Button>
        
          <Table
            columns={columns}
            dataSource={listUser}
            bordered            
            size="middle"
            rowKey="userName"
            pagination={{
              onChange(page, pageSize) {
                setPage(page);
                setPageSize(pageSize);
              },
            }}
          />
        </Col>
      </Fragment>
      <AddUpdateUser
      showModal={showModal}
      setShowModal={(value) => setShowModal(value)}
      data={itemUpdate}
      onFinishUpdate={(isAdd, data) => {
        let dataUpdate = null;
        if (isAdd) {
            dataUpdate = [...listUser];
            dataUpdate.push(data);
        }
        else{
          dataUpdate = listUser.map((item) => {
            if (item.userName == data.userName) {
              return data;
            }
            return item;
          });
        } 
        setListUser(dataUpdate);
      }}
    />
   
      </>
      :<Loading/>
    
  )
  
};

export default TableUser;
