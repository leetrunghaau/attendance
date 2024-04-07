import { Form, Table } from "antd";
import React, { Fragment, useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import { getFullFile, moveFiles } from "../../../../Services/TongKet.Service";
import { showSuccessToast, showErrorToast } from '../../../../Util/toast'
import CommonModal from '../../../../Components/UiKits/Modals/common/modal';
import {
  FileWordOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  FolderOutlined,
  FileUnknownOutlined,
  FilePptOutlined
} from '@ant-design/icons';

const MoveFile = (props) => {
  const [form] = Form.useForm();
  const { data, onFinishUpdate, showMoveFileModal, setShowMoveFileModal } = props;
  const toggleModal = () => setShowMoveFileModal(!showMoveFileModal);
  const [isValidUser, setIsValidUser] = useState(true);
  const [fileData, setFileData] = useState([])
  const [fileDataDisplay, setFileDataDisplay] = useState([])
  const [partFile, setPartFile] = useState([])
  const [parent, setParent] = useState(null)
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  useEffect(() => {
    loadData();
  }, [showMoveFileModal])

  const onFinishFailed = errorInfo => { };
  const onFinish = async (dataForm) => {
    let dataSubmit = {
      newParent: partFile ? partFile.id : null,
      listFile: []
    }
    data.forEach(item => {
      dataSubmit.listFile = [...dataSubmit.listFile, { id: item.id }]
    })
    const rs = await moveFiles(dataSubmit)
    if (rs.status == "Ok") {
      showSuccessToast("Di chuyển file thành công");
      setShowMoveFileModal(false);
      onFinishUpdate(rs);
    } else {
      showErrorToast(rs.message);
    }
  };

  const loadData = async () => {
    const rs = await getFullFile();
    if (rs.status == "Ok") {
      let tempdata = rs.data.filter(itemB => !data.some(itemA => itemA.id === itemB.id));
      setFileData(tempdata)
      updateState(tempdata, null);
    } else {
      showErrorToast(rs.message);
    }
  };
  function fillPartFile(rawData, idParent) {
    let rs = {
      id: null,
      ten: null,
      parent: null
    }
    const found = rawData.find(item => item.id == idParent);
    if (found) {
      rs.id = found.id;
      rs.ten = found.ten;
      rs.parent = fillPartFile(rawData, found.idParent);
    } else {
      return null;
    }
    return rs
  }
  const updateState = (rawData, idParent) => {
    const tempDataDisplay = rawData.filter(item => item.idParent == idParent)
    const tempPart = fillPartFile(rawData, idParent)
    setParent(idParent);
    setPartFile(tempPart);
    setFileDataDisplay(tempDataDisplay);
  }
  const fileDoubleClick = (item) => {
    updateState(fileData, item.id)
  }
  const partClickHandle = async (e, id) => {
    updateState(fileData, id);
  }
  const partMouseOverHandle = (e) => {
    e.target.style.background = '#f0f0f0';
    e.target.style.cursor = 'pointer';
  }
  const partMouseLeavHandle = (e) => {
    e.target.style.background = '#ffffff';
    e.target.style.cursor = 'default';
  }
  function renderPart(partFileParam) {
    let chillpart = null;
    if (partFileParam) {
      if (partFileParam.parent != null) {
        chillpart = renderPart(partFileParam.parent)
      }
      return (
        <>
          {chillpart ? chillpart : <></>}
          <li style={{ padding: "5px" }}> | </li>
          <li
            key={partFileParam.id}
            style={{
              padding: "5px",
              borderRadius: "10px"
            }}
            onClick={(e) => partClickHandle(e, partFileParam.id)}
            onMouseOver={(e) => partMouseOverHandle(e)}
            onMouseLeave={(e) => partMouseLeavHandle(e)}
          >
            {partFileParam.ten}
          </li>

        </>
      )
    }

  }
  const columns = [
    {
      title: " ",
      dataIndex: "dinhDang",
      key: "dinhDang",
      width: "80px",
      align: "center",
      render: (_, item) => {
        const iconRender = () => {
          switch (item.dinhDang.trim()) {

            case "folder": return <FolderOutlined onDoubleClick={() => fileDoubleClick(item)} style={{ fontSize: "40px", color: "#f7d671" }} />;
            case ".xls": return <FileExcelOutlined style={{ fontSize: "40px", color: "#217346" }} />;
            case ".xlsx": return <FileExcelOutlined style={{ fontSize: "40px", color: "#217346" }} />;
            case ".doc": return <FileWordOutlined style={{ fontSize: "40px", color: "#2b579a" }} />;
            case ".docx": return <FileWordOutlined style={{ fontSize: "40px", color: "#2b579a" }} />;
            case ".pdf": return <FilePdfOutlined style={{ fontSize: "40px", color: "#b30c00" }} />;
            case ".ppt": return <FilePptOutlined style={{ fontSize: "40px", color: "##b7472a" }} />;
            case ".pptx": return <FilePptOutlined style={{ fontSize: "40px", color: "##b7472a" }} />;
            default: return <FileUnknownOutlined style={{ fontSize: "40px", color: "#646464" }} />;
          }
        }
        return (
          <>
            {iconRender()}
          </>
        )
      }
    },
    {
      title: "Tên File",
      dataIndex: "ten",
      key: "ten",
    },
    {
      width: "100px",
      title: "Định dạng",
      dataIndex: "dinhDang",
      key: "dinhDang",
    }
  ];
  return (
    <>
      <CommonModal
        isOpen={showMoveFileModal}
        title={"Di chuyển file"}
        toggler={toggleModal}
        actionConfirm={() => isValidUser ? form.submit() : showErrorToast("Cần nhấn nút kiểm tra user hợp lệ trước")}
        size="lg"
      >
        <Fragment>
          <Form
            form={form}
            initialValues={{ remember: true }}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>
            <Row style={{ marginBottom: "10px" }}>
              <ul style={{ display: "flex" }} >
                <li
                  style={{ padding: "5px", borderRadius: "10px" }}
                  onClick={(e) => partClickHandle(e, null)}
                  onMouseOver={(e) => partMouseOverHandle(e)}
                  onMouseLeave={(e) => partMouseLeavHandle(e)}
                >Thư mục gốc </li>
                {renderPart(partFile)}
              </ul>
            </Row>
            <Row>
              <Table
                columns={columns}
                dataSource={fileDataDisplay}
                bordered
                size="middle"
                rowKey="id"
                pagination={{
                  onChange(page, pageSize) {
                    setPage(page);
                    setPageSize(pageSize);
                  },
                }}
              />
            </Row>
          </Form>
        </Fragment>
      </CommonModal>
    </>
  );
};

export default MoveFile;
