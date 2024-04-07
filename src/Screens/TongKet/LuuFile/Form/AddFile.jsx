import { Form } from "antd";
import React, { Fragment, useState, useEffect } from "react";
import { Row, Col, } from "reactstrap";
import { uploadFiles } from "../../../../Services/TongKet.Service";
import { showSuccessToast, showErrorToast, showWarningToast } from '../../../../Util/toast'
import CommonModal from '../../../../Components/UiKits/Modals/common/modal';
import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
const { Dragger } = Upload;

const AddFile = (propsC) => {
    const [form] = Form.useForm();
    const { data, onFinishUpdate, showAddFileModal, setShowAddFileModal } = propsC;
    const toggleModal = () => setShowAddFileModal(!showAddFileModal);
    const [fileList, setFileList] = useState([])
    useEffect(() => {

    }, [data]);
    useEffect(() => {
        loadData();
      }, [showAddFileModal])
    const loadData = async () => {
        setFileList([])
      };
    const onFinishFailed = errorInfo => { };
    const onFinish = async () => {
        if (fileList.length != 1) {
            showWarningToast("Vui lòng tải lên file trước khi lưu !");
            return;
        }
        var formData = new FormData();
        formData.append("idParent", data.idParent);
        formData.append("file", fileList[0].originFileObj);
        const rs = await uploadFiles(formData)
        if (rs.status == "Ok") {
            showSuccessToast("Đã tải lên thành công");
            setShowAddFileModal(false);
            onFinishUpdate(rs);
        } else {
            showErrorToast(rs.message)
        }
    };

    const propsUpload = {
        name: 'file',
        multiple: true,
        maxCount: 1,
        accept: ".doc,.docx,.xls,.xlsx,.ppt,.pptx,.pdf",
        customRequest: ({ file, onSuccess, onError }) => {
            onSuccess();
        },
        onChange: ({ fileList }) => {
            setFileList(fileList);
        },
    };
    return (
        <>
            <CommonModal
                zIndex={"100"}
                isOpen={showAddFileModal}
                title={"Tải lên file"}
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
                            <Form.Item>
                                <Dragger {...propsUpload}>
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">Click hoặc kéo thả file tại khu vực này để tải lên.</p>
                                    <p className="ant-upload-hint">
                                        Hỗ trợ tải file đơn. Các định dạng cho phép: .doc, .docx, .xls, .xlsx, .ppt, .pptx, .pdf
                                    </p>
                                </Dragger>
                            </Form.Item>
                        </Row>
                    </Form>
                </Fragment>
            </CommonModal>
        </>
    );
};

export default AddFile;
