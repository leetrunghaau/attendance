"use client";
import React from "react";
import { useEffect } from 'react'
import { title } from "@/components/primitives";
import { Pagination } from "@nextui-org/pagination";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/Table";
import { Button } from "@nextui-org/button";
import { DeleteIcon, EditIcon, EyeIcon, LockIcon, MailIcon, PlusIcon } from "@/components/icons";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { Checkbox } from "@nextui-org/checkbox";
import { Link } from "@nextui-org/link";
import { Tooltip } from "@nextui-org/tooltip";
import { showErrorToast, showSuccessToast, showWarningToast } from "../../components/toast";
import { createClassRoom, deleteClassRoom, getListClassRoom, updateClassRoom } from "@/service/classRoom-service"
import { Select, SelectItem } from "@nextui-org/react";
import { createStudent, deleteStudent, getListStudent, updateStudent } from './../../service/student-service';
import { getCurDateForSelectUi } from "@/Util/funstion";



export default function StudentPage() {
    const [listClassRoom, setListClassRoom] = React.useState([]);
    const [classRoomSeleted, setClassRoomSelected] = React.useState(null);
    const [listData, setlistData] = React.useState([]);
    const [modalData, setModalData] = React.useState({
        studentId: "",
        fullName: "",
        phone: "",
        gender: "",
        birthDate: "",
        placeOfOrigin: "",
        classRoomId: ""
    });
    const [isNewItem, setIsNewItem] = React.useState(false);
    // for table
    const [page, setPage] = React.useState(1);
    const rowsPerPage = 10;
    const pages = Math.ceil(listData.length / rowsPerPage);
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return listData.slice(start, end);
    }, [page, listData]);
    // for model
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const columns = [
        {
            key: "studentId",
            label: "Mã học sinh",
        },
        {
            key: "fullName",
            label: "Họ và tên",
        },
        {
            key: "phone",
            label: "Sđt",
        }, {
            key: "gender",
            label: "Giới tính",
        },
        {
            key: "birthDate",
            label: "ngày sinh",
        },
        {
            key: "placeOfOrigin",
            label: "địa chỉ",
        },
        {
            key: "actions",
            label: " ",
        },
    ];
    //init  	##############################################################3
    useEffect(() => {
        loadListClassRooom();
    }, []);

    useEffect(() => {
        loadData();

    }, [classRoomSeleted]);

    const loadListClassRooom = async () => {
        let getRs = await getListClassRoom();
        if (getRs) {
            if (getRs.status == 200) {
            setListClassRoom(getRs.data)
        }
        } else {

            showErrorToast("Lỗi kết nối máy chủ")
        }
        
    }
    const loadData = async () => {

        if (classRoomSeleted) {
            let getRs = await getListStudent(classRoomSeleted.currentKey);
            if (getRs) {
             if (getRs.status == 200) {
                setlistData(getRs.data)
            }
            } else {
    
                showErrorToast("Lỗi kết nối máy chủ")
            }
           
        }

    };
    const superLoadData = async (classRoomId) => {
        let getRs = await getListStudent(classRoomId);
        if (getRs) {
            if (getRs.status == 200) {
            // setListNhaSanXuat(getRs.data);
            setlistData(getRs.data)
        }
        } else {

            showErrorToast("Lỗi kết nối máy chủ")
        }
        


    };
    //tạo	##############################################################
    const createItem = async (item) => {
        let getRs = await createStudent(item);
        if (getRs) {
            if (getRs.status == 200) {
            loadData()
        }
        } else {

            showErrorToast("Lỗi kết nối máy chủ")
        }
        
    };
    //sữa	##############################################################
    const editOnClick = (item) => {
        onOpen();
        setIsNewItem(false);
        setModalData({
            studentId: item.studentId,
            fullName: item.fullName,
            phone: item.phone,
            gender: item.gender,
            birthDate: item.birthDate,
            placeOfOrigin: item.placeOfOrigin,
            classRoomId: item.classRoomId
        })

    };

    const updateItem = async (item) => {
        let getRs = await updateStudent(item);
        if (getRs) {
            if (getRs.status == 200) {
            loadData()
        }
        } else {

            showErrorToast("Lỗi kết nối máy chủ")
        }
        
    };
    //xóa	##############################################################

    const deleteItem = async (item) => {
        let getRs = await deleteStudent(item.studentId);
        if (getRs) {
            if (getRs.status == 200) {
       
            superLoadData(item.classRoomId)
        }
        } else {

            showErrorToast("Lỗi kết nối máy chủ")
        }
        
    };

    const deleteOnClick = (item) => {
        deleteItem(item)
    };




    const renderCell = React.useCallback((dataItem, columnKey) => {
        const cellValue = dataItem[columnKey];

        switch (columnKey) {
            case "actions":
                return (
                    <div className="relative flex items-center  gap-5">
                        <Tooltip content="sửa lớp học">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                onClick={() => editOnClick(dataItem)}
                            >
                                <EditIcon />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Xóa lớp học">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50"
                                onClick={() => deleteOnClick(dataItem)}
                            >
                                <DeleteIcon />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);
    const modalOnChange = (event) => {
        const { name, value } = event.target;
        setModalData({
            ...modalData,
            [name]: value
        });
    };
    return (
        <div>

            <h1 className={title()}>Quản lý danh sách học sinh</h1>

            <div className="flex flex-col justify-center items-center ">
                <div className="flex w-full justify-between  items-end my-4">
                    <Select
                        color="secondary"
                        label="Chọn lớp"
                        labelPlacement="outside"
                        variant="bordered"
                        className="max-w-xs"
                        selectedKeys={classRoomSeleted}
                        onSelectionChange={setClassRoomSelected}
                    >
                        {listClassRoom.map((classRoom) => (
                            <SelectItem key={classRoom.classRoomId} value={classRoom.classRoomId}>
                                {classRoom.classRoomName}
                            </SelectItem>
                        ))}
                    </Select>
                    <Button
                        color="secondary"
                        variant="light"
                        startContent={<PlusIcon></PlusIcon>}
                        onPress={(event) => {
                            if (classRoomSeleted) {
                                onOpen();
                                setIsNewItem(true);
                                setModalData({
                                    studentId: "Auto",
                                    fullName: "",
                                    phone: "",
                                    gender: "",
                                    birthDate: getCurDateForSelectUi(),
                                    placeOfOrigin: "",
                                    classRoomId: classRoomSeleted.currentKey
                                })
                            } else {
                                showWarningToast("Vui lòng chọn lớp")
                            }

                        }}
                    >thêm mới</Button>
                </div>


                <Table aria-label="Example table with dynamic content"
                    selectionMode="single"
                    color="secondary"
                    className=" w-full "
                    // onRowAction={(key) => alert(`Opening item ${key}...`)}
                    bottomContent={
                        <div className="flex w-full justify-center">
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="secondary"
                                page={page}
                                total={pages}
                                onChange={(page) => setPage(page)}
                            />
                        </div>
                    }
                    classNames={{
                        wrapper: "min-h-[222px]",
                    }}
                >
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={items}>
                        {(item) => (
                            <TableRow key={item.classRoomId}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                backdrop="blur"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{isNewItem ? "Thêm mới học sinh" : "Chỉnh sửa thông tin học sinh"}</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="Mã học sinh"
                                    name="studentId"
                                    value={modalData.studentId}
                                    onChange={modalOnChange}
                                    labelPlacement="outside"
                                    variant="bordered"
                                    readOnly={true}
                                />
                                <Input
                                    autoFocus
                                    label="Họ và tên"
                                    name="fullName"
                                    value={modalData.fullName}
                                    onChange={modalOnChange}
                                    labelPlacement="outside"
                                    variant="bordered"

                                />
                                <Input
                                    autoFocus
                                    label="Số điện thoại"
                                    name="phone"
                                    value={modalData.phone}
                                    onChange={modalOnChange}
                                    labelPlacement="outside"
                                    variant="bordered"

                                />
                                <Input
                                    autoFocus
                                    label="Giới tính"
                                    name="gender"
                                    value={modalData.gender}
                                    onChange={modalOnChange}
                                    labelPlacement="outside"
                                    variant="bordered"
                                />
                                <Input
                                    autoFocus
                                    type="date"
                                    label="ngày sinh"
                                    name="birthDate"
                                    value={modalData.birthDate}
                                    onChange={modalOnChange}
                                    labelPlacement="outside"
                                    variant="bordered"

                                />
                                <Input
                                    autoFocus
                                    label="Địa chỉ"
                                    name="placeOfOrigin"
                                    value={modalData.placeOfOrigin}
                                    onChange={modalOnChange}
                                    labelPlacement="outside"
                                    variant="bordered"

                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Đóng
                                </Button>
                                <Button color="secondary" variant="light" onPress={() => {
                                    onClose();
                                    if (isNewItem) {
                                        createItem(modalData)
                                    } else {
                                        updateItem(modalData)
                                    }


                                }}>
                                    Lưu lại
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
