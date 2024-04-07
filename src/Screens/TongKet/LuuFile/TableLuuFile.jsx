import React, { useState, useEffect, Fragment, useRef } from "react";
import { Table, Input,  Popover, Flex } from "antd";
import { Col } from "reactstrap";
import { IconDelete } from '../../../Components/IconButton';
import Loading from '../../../Components/Common/Loading';
import { Button } from "antd";
import { PlusOutlined, DownloadOutlined, DeleteOutlined, DragOutlined, EditOutlined, CloseOutlined, UploadOutlined  } from '@ant-design/icons';
import { FileWordOutlined, FileExcelOutlined, FilePdfOutlined, FolderOutlined, FileUnknownOutlined, FilePptOutlined } from '@ant-design/icons';
import { showSuccessToast, showErrorToast, showWarningToast } from '../../../Util/toast'
import {
    getDanhSachFile, themThuMuc, xoaFiles, suaTenFile, downloadFile
} from "../../../Services/TongKet.Service";
import { saveAs } from 'file-saver';
import { BASE_URL } from "../../../api/apiUrl";
import AddFile from "./Form/AddFile";
import MoveFile from "./Form/MoveFile";
const TableLuuFile = () => {
    const [showAddFileModal, setShowAddFileModal] = useState(false);
    const [showMoveFileModal, setShowMoveFileModal] = useState(false);
    const [isLoadData, setIsLoadData] = useState(false);
    const [listFile, setListFile] = useState([]);
    const [partFile, setPartFile] = useState([]);
    const [parent, setParent] = useState(null)
    const [itemRename, setItemRename] = useState(null)
    const [openPopover, setOpenPopover] = useState(false)
    const [litsSelected, setListSelected] = useState([])
    const inputTagRef = useRef(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    useEffect(() => {
        loadData();
    }, []);
    useEffect(() => {
    }, [inputTagRef.current]);
    const loadData = async () => {
        setIsLoadData(false)
        let result = await getDanhSachFile(null);
        if (result.status == "Ok") {
            uploadDisplay(result.data.tongKetFiles, result.data.partFileData)
        }
        else {
            showErrorToast(result.message);
            setListFile([]);
        }
        setIsLoadData(true)
    };

    const uploadDisplay = (fileDisplay, partDisplay) => {
        setListFile(fileDisplay);
        setPartFile(partDisplay);
    }
    const fileDoubleClick = async (item) => {
        setIsLoadData(false)
        let result = await getDanhSachFile(item.id);
        if (result.status == "Ok") {
            uploadDisplay(result.data.tongKetFiles, result.data.partFileData)

        }
        else {
            showErrorToast(result.message);
            setListFile([]);
        }
        setParent(item.id)
        setIsLoadData(true)
    }
    const renameClick = (item) => {
        setItemRename({
            id: item.id,
            name: item.ten
        })
        setOpenPopover(null)
        if (inputTagRef.current) {
            inputTagRef.current.focus();
        }
    }
    const inputOnBlur = async (val) => {
        if (itemRename) {
            setItemRename(null)
            setIsLoadData(false)
            let result = await suaTenFile(itemRename.id, val.target.value);
            if (result.status == "Ok") {
                uploadDisplay(result.data.tongKetFiles, result.data.partFileData)
                showSuccessToast("Cập Nhật Thành Công");
            }
            else {
                showErrorToast(result.message);
                setListFile([]);
            }
            setIsLoadData(true)
        }
    }
    const newFolderClick = async () => {
        setIsLoadData(false)
        let result = await themThuMuc(parent);
        if (result.status == "Ok") {
            uploadDisplay(result.data.tongKetFiles, result.data.partFileData)

        }
        else {
            showErrorToast(result.message);
            setListFile([]);
        }
        setIsLoadData(true)
    }
    const downloadFileHandle = async () => {
        setOpenPopover(false);
        let dataSubmit = {
            idParent: null,
            listFile: []
        };
        litsSelected.forEach(item => {
            dataSubmit.listFile.push({ id: item.id })
        })
        if (dataSubmit.listFile.length == 0) {
            showWarningToast("Vui lòng chọn file hoặc thư mục trước khi tải xuống");
            return
        }
        const result = await downloadFile(dataSubmit);
        if(result.status == "Ok"){
            alert(result.data)
            saveAs(`${BASE_URL}\\${result.data}`, 'filename.txt');

        }else{
            showErrorToast(result.message);
        }
    }
    const moveClickHandle = () => {

        setOpenPopover(false);
        if (litsSelected.length == 0) {
            showWarningToast("Vui lòng chọn file hoặc thư mục trước khi xóa");
            return
        }
        setShowMoveFileModal(true);
    }
    const xoaOneFileHandle = async (item) => {
        setIsLoadData(false);
        const result = await xoaFiles([
            {
                id: item.id
            }
        ]);
        if (result.status == "Ok") {
            showSuccessToast(`Đã xóa thành công !`)
            uploadDisplay(result.data.tongKetFiles, result.data.partFileData)
        }
        else {
            showErrorToast(result.message);
            setListFile([]);
        }
        setIsLoadData(true)
    }


    const xoaMultiFileshandle = async (item) => {

        let deleteItemsData = [];
        litsSelected.forEach(item => {
            deleteItemsData.push({ id: item.id })
        })
        if (deleteItemsData.length == 0) {
            showWarningToast("Vui lòng chọn file hoặc thư mục trước khi xóa");
            return
        }
        setIsLoadData(false)
        const result = await xoaFiles(deleteItemsData);
        if (result.status == "Ok") {
            showSuccessToast(`Đã xóa thành công !`)
            setListSelected([])
            setIsLoadData(true)
            setOpenPopover(false)
            uploadDisplay(result.data.tongKetFiles, result.data.partFileData)

        }
        else {
            showErrorToast(result.message);
            setListFile([]);
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
            render: (_, item) => {
                return (
                    <>
                        <Popover
                            placement="topLeft"
                            content={
                                <Flex
                                    align="start"
                                    vertical
                                >
                                    <Button type="text" onClick={() => downloadFileHandle()} className='d-block mb-2 pull-right' htmlType="button" icon={<DownloadOutlined />}>
                                        Tải xuống
                                    </Button>
                                    <Button type="text" onClick={() => moveClickHandle()} className='d-block mb-2 pull-right' htmlType="button" icon={<DragOutlined />}>
                                        Di chuyển
                                    </Button>
                                    <Button type="text" onClick={() => renameClick(item)} className='d-block mb-2 pull-right' htmlType="button" icon={<EditOutlined />}>
                                        Đổi tên
                                    </Button>
                                    <Button type="text" onClick={() => xoaMultiFileshandle()} className='d-block mb-2 pull-right' htmlType="button" icon={<DeleteOutlined />}>
                                        Xóa
                                    </Button>
                                    <Button type="text" onClick={() => { setOpenPopover(null) }} className='d-block mb-2 pull-right' htmlType="button" icon={<CloseOutlined />}>
                                        Thoát
                                    </Button>
                                </Flex>
                            }
                            arrow={false}
                            trigger="contextMenu"
                            open={openPopover == item.id ? true : false}
                            onOpenChange={() => { setOpenPopover(item.id) }}
                        >
                            <div >
                                <Input
                                    onBlur={(val) => inputOnBlur(val, item)}
                                    bordered={false}
                                    readOnly={(itemRename && itemRename.id == item.id) ? false : true}
                                    defaultValue={item.ten}
                                    ref={inputTagRef}
                                />
                            </div>
                        </Popover>
                    </>
                )
            }
        },
        {
            width: "100px",
            title: "Định dạng",
            dataIndex: "dinhDang",
            key: "dinhDang",
        },
        {
            title: "#",
            key: "#",
            width: "80px",
            align: "center",
            render: (_, item) => {
                return (
                    <>
                        <IconDelete
                            textContent={"Bạn có muốn xóa mục này?"}
                            callback={() => xoaOneFileHandle(item)}
                        />
                    </>
                );
            },
        },
    ];
    const partClickHandle = async (e, id) => {
        setIsLoadData(false)
        let result = await getDanhSachFile(id);
        if (result.status == "Ok") {
            uploadDisplay(result.data.tongKetFiles, result.data.partFileData)

            setParent(id)
        }
        else {
            showErrorToast(result.message);
            setListFile([]);
            setParent(id)
        }
        setIsLoadData(true)

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
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setListSelected(selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            name: record.name,
        }),
    };

    return (
        listFile ?
            <>
                <Fragment>
                    <Col sm="12">
                        <Button type="primary" onClick={() => { setShowAddFileModal(true) }} style={{ marginLeft: "10px" }} className='d-block mb-2 pull-right' htmlType="button" icon={<UploadOutlined   />}>
                            Tải lên
                        </Button>
                        <Button type="primary" onClick={() => newFolderClick()} style={{ marginLeft: "10px" }} className='d-block mb-2 pull-right' htmlType="button" icon={<PlusOutlined />}>
                            Tạo thư mục
                        </Button>
                        <ul style={{ display: "flex" }} >
                            <li
                                style={{ padding: "5px", borderRadius: "10px" }}
                                onClick={(e) => partClickHandle(e, null)}
                                onMouseOver={(e) => partMouseOverHandle(e)}
                                onMouseLeave={(e) => partMouseLeavHandle(e)}
                            >Thư mục gốc </li>
                            {renderPart(partFile)}
                        </ul>
                        {
                            isLoadData ?
                                <Table
                                    rowSelection={{
                                        type: "checkbox",
                                        ...rowSelection,
                                    }}
                                    columns={columns}
                                    dataSource={listFile}
                                    bordered
                                    size="middle"
                                    rowKey="id"
                                    pagination={{
                                        onChange(page, pageSize) {
                                            setPage(page);
                                            setPageSize(pageSize);
                                        },
                                    }}
                                /> : <Loading />}
                    </Col>
                </Fragment>
                <AddFile
                    showAddFileModal={showAddFileModal}
                    setShowAddFileModal={(value) => setShowAddFileModal(value)}
                    data={{ idParent: parent }}
                    onFinishUpdate={(rs) => {
                        uploadDisplay(rs.data.tongKetFiles, rs.data.partFileData)

                    }}
                />
                <MoveFile
                    showMoveFileModal={showMoveFileModal}
                    setShowMoveFileModal={(value) => setShowMoveFileModal(value)}
                    data={litsSelected}
                    onFinishUpdate={(rs) => {
                        uploadDisplay(rs.data.tongKetFiles, rs.data.partFileData)

                    }}
                />
            </> : <Loading />
    )
};

export default TableLuuFile;
