import { Form, Input, Select, Checkbox, Space, Button } from "antd";
import { CheckOutlined, SearchOutlined, PrinterOutlined } from '@ant-design/icons';
import React, { Fragment, useState, useEffect } from "react";
import {
  Row,
  Col,
} from "reactstrap";
import { GetDanhMucDonVi, GetDanhMucQuyen } from "../../../../Services/DanhMuc.service";
import { addOrUpdateUser,checkUserValid } from "../../../../Services/User.service";
import { showSuccessToast, showErrorToast } from '../../../../Util/toast'
import CommonModal from '../../../../Components/UiKits/Modals/common/modal';
import { showLoading, hideLoading } from '../../../../redux/actions/loadingAction';
import { useDispatch, useSelector } from 'react-redux';
import { async } from "q";

const AddUpdateUser = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { data, onFinishUpdate, showModal, setShowModal } = props;
  const toggleModal = () => setShowModal(!showModal);

  const [dmDonVi, setDMDonVi] = useState([]);
  const [dmQuyen, setDMQuyen] = useState([]);
  const [itemUpdate, setItemUpdate] = useState({});
  const [isValidUser, setIsValidUser] = useState(true);

  useEffect(() => {
    loadData();
  }, [])
  useEffect(() => {
    form.resetFields();
    console.log("ITEM UPDATE==>",data);
    setItemUpdate(data);
    setIsValidUser(data?.userName!=""?true:false);
  }, [data]);

  const onFinishFailed = errorInfo => { };

  const onFinish = async (dataForm) => {
    dispatch(showLoading());
    let isAdd = itemUpdate.userName == "" ? true : false;
    let dataSubmit = { ...itemUpdate, ...dataForm, status: dataForm.status ? 1 : 0 };

    console.log('data submit', dataSubmit);
    let result = await addOrUpdateUser(dataSubmit);
    if (result?.status == "Ok") {
      isAdd ? showSuccessToast('Thêm user thành công !') : showSuccessToast('Cập nhật user thành công!');
      toggleModal();
      onFinishUpdate(isAdd, result.data);
    } else {
      showErrorToast('Lỗi khi lưu: ' + result.message)
    }
    dispatch(hideLoading());
  };

  const loadData = () => {
    loadDanhMucDonVi();
    loadDanhMucQuyen();
  };
  const loadDanhMucDonVi = async () => {
    let result = await GetDanhMucDonVi();
    if (result.status != 'Ok') {
      setDMDonVi([]);
      return;
    }
    else {
      let tempData = [];

      result.data.forEach(element => {
        let item = { value: element.maDv, label: element.maDv + ' - ' + element.ten };
        tempData.push(item);
      });
      setDMDonVi(tempData);
    }
  }
  const loadDanhMucQuyen = async () => {
    let result = await GetDanhMucQuyen();
    if (result.status != 'Ok') {
      setDMQuyen([]);
      return;
    }
    else {
      let tempData = [];

      result.data.forEach(element => {
        let item = { value: element.id, label: element.shortName + ' - ' + element.ten };
        tempData.push(item);
      });
      setDMQuyen(tempData);
    }
  }

  const checkValidUser=async(text)=>{
    dispatch(showLoading());
    let result = await checkUserValid(form.getFieldValue("userName"));
    if (result?.status == 'Ok') {
      setIsValidUser(true);
      showSuccessToast("User hợp lệ");
    }
    else {
     setIsValidUser(false);
     showErrorToast("Lỗi: "+result?.message);
    }
    dispatch(hideLoading());
  }
  return (
    <>
      <CommonModal
        zIndex={10}
        isOpen={showModal}
        title={itemUpdate?.userName == "" ? "Thêm mới user" : "Cập nhật user"}
        toggler={toggleModal}
        actionConfirm={() => isValidUser? form.submit():showErrorToast("Cần nhấn nút kiểm tra user hợp lệ trước")}
        size="lg"
      >
        <Fragment>
          <Form
            form={form}
            initialValues={{ remember: true }}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>

            <Row>
              <Col md="6">
                <Form.Item
                  label="Tên đăng nhập"
                  initialValue={itemUpdate?.userName}
                  rules={[{ required: true, message: 'Phải nhập Tên đăng nhập' }]} name="userName">
                  {
                    <Space.Compact block>
                      <Input placeholder="Nhập tên đăng nhập" defaultValue={itemUpdate?.userName} disabled={itemUpdate?.userName ? true : false} onChange={()=>setIsValidUser(false)} />
                      {
                        !itemUpdate?.userName &&
                        <Button htmlType="button" type="primary" shape="circle" icon={isValidUser?<CheckOutlined />: <SearchOutlined />} onClick={() =>!isValidUser?checkValidUser():{}} />
                      }
                    </Space.Compact>
                  }
                </Form.Item>
              </Col>
              <Col md="6">
                <Form.Item
                  label="Hoạt động"
                  valuePropName="checked"
                  initialValue={itemUpdate?.active}
                  name="active">
                  <Checkbox defaultChecked={itemUpdate?.active} disabled={!isValidUser}/>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <Form.Item
                  label="Mật khẩu"
                  initialValue={itemUpdate?.password}
                  rules={[{ required: true, message: 'Phải nhập Mật khẩu' }]} name="password">
                  <Input placeholder="Nhập mật khẩu" disabled={!isValidUser}/>
                </Form.Item>
              </Col>
              <Col md="6">
              <Form.Item
                  label="Họ tên"
                  initialValue={itemUpdate?.hoTen}
                  rules={[{ required: true, message: 'Phải nhập họ tên' }]} name="hoTen">
                 <Input placeholder="Nhập họ tên" disabled={itemUpdate?.hoTen ? true : false} />
                     
                </Form.Item>
              </Col>

            </Row>
            <Row>
              <Col md="6">
                <Form.Item
                  label="Đơn vị"
                  initialValue={itemUpdate?.maDv}
                  name="maDv">
                  <Select style={{ width: '100%' }}
                    showSearch
                    placeholder="Nhập để tìm kiếm..."
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    disabled={!isValidUser}
                    options={dmDonVi}
                    className="js-example-basic-single col-sm-12"
                  />
                </Form.Item>

              </Col>
              <Col md="6">
                <Form.Item
                  label="Quyền"
                  initialValue={itemUpdate?.idQuyen}
                  name="idQuyen">
                  <Select style={{ width: '100%' }}                                       
                    disabled={!isValidUser}
                    options={dmQuyen}
                    className="js-example-basic-single col-sm-12"
                  />
                </Form.Item>

              </Col>
            </Row>
          </Form>
        </Fragment>
      </CommonModal>
    </>
  );
};

export default AddUpdateUser;
