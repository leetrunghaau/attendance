import React, { Fragment, useState, useEffect } from "react";
import CommonModal from '../../../../Components/UiKits/Modals/common/modal';
import {
  Row,
  Col,
} from "reactstrap";
import { AddOrUpdateTieuChi } from '../../../../Services//DanhGiaDMTieuChi.service'
import { Form, Input, InputNumber } from "antd";
import { showSuccessToast, showErrorToast } from '../../../../Util/toast'
import { showLoading, hideLoading } from '../../../../redux/actions/loadingAction';
import { useDispatch, useSelector } from 'react-redux';


const {TextArea}=Input;
const UpdateNhaSanXuat = (props) => {
  const dispatch = useDispatch();
  const { data, onFinishUpdate, showModal, setShowModal } = props;
  const [itemUpdate, setItemUpdate] = useState({});
  const toggleModal = () => setShowModal(!showModal);
  const [form] = Form.useForm();

  useEffect(() => {
    //console.log("UPDATE ITEM", data);
    form.resetFields();
    setItemUpdate(data);
  }, [data]);

  const onFinishFailed = errorInfo => { };

  const onFinish = async (data) => {
    dispatch(showLoading());
    let isAdd = itemUpdate.id == 0 ? true : false;
    let dataSubmit = { ...itemUpdate, ...data };

    console.log('data submit', dataSubmit);
    let result = await AddOrUpdateTieuChi(dataSubmit);
    if (result.status == "Ok") {
      isAdd ? showSuccessToast('Đã thêm item thành công !') : showSuccessToast('Đã cập nhật item thành công !');
      toggleModal();
      onFinishUpdate(isAdd, result.data);
    } else {
      showErrorToast('Lỗi khi lưu: ' + result.message)
    }
    dispatch(hideLoading());

  };

  return (
    <>
      <CommonModal
        isOpen={showModal}
        title={itemUpdate?.id == 0 ? "Thêm mới Nhà sản xuất" : "Cập nhật Nhà sản xuất"}
        toggler={toggleModal}
        actionConfirm={() => form.submit()}
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
              <Col md="12">
                <Form.Item
                  label="Tên tiêu chí"
                  initialValue={itemUpdate?.ten}
                  rules={[{ required: true, message: 'Phải nhập tên tiêu chí' }]} name="ten">
                  <TextArea
                    rows={"4"}
                    placeholder="Nhập tên tiêu chí"
                  />
                </Form.Item>
              </Col>              
            </Row>
            <Row>
              <Col md="12">
                <Form.Item
                  label="Ghi chú"
                  initialValue={itemUpdate?.ghiChu}
                  name="ghiChu"
                >
                  <TextArea
                    rows={"4"}
                    placeholder="Nhập ghi chú"
                  />
                </Form.Item>
              </Col>              
            </Row>
            <Row>
              <Col md="6">
                <Form.Item
                  label="STT"
                  initialValue={itemUpdate?.stt}
                  name="stt">
                  <Input placeholder="Nhập số thứ tự" />
                </Form.Item>
              </Col>
              <Col md="6">
              <Form.Item
                  label="Điểm chuẩn"
                  initialValue={itemUpdate?.diemChuan}
                  name="diemChuan">
                  <InputNumber
                    style={{ width: '100%' }}                   
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    onKeyDown={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        //console.log("KEY PRESS=",event.key)
                        if(event.key!='Tab'
                          && event.key!='Delete'
                          && event.key!='Backspace'
                          && event.key!='ArrowRight'
                          && event.key!='ArrowLeft'
                          )
                        event.preventDefault();
                      }
                    }}
                    min={0}
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

export default UpdateNhaSanXuat;
