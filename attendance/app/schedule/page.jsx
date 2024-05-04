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
import { createSchedule, deleteSchedule, getListSchedule, getListScheduleByClassRoom, updateSchedule } from './../../service/schedule-service';
import { getCurDateForSelectUi, isScheduleValid } from "@/Util/funstion";



export default function SchedulePage() {
    const [listClassRoom, setListClassRoom] = React.useState([]);
    const [classRoomSeleted, setClassRoomSelected] = React.useState(null);
    const [classRoomNameSeleted, setClassRoomNameSelected] = React.useState(null);
    const [listData, setlistData] = React.useState([]);
    const [modalData, setModalData] = React.useState({
        scheduleId: "",
        applyStart: "",
        applyEnd: "",
        classRoomId: "",
        ClassRoom: {
            classRoomName: ""
        }
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
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const columns = [
        {
            key: "scheduleId",
            label: "Mã thời khóa biểu",
        },
        {
            key: "classRoomName",
            label: "Lớp học",
        },
        {
            key: "applyStart",
            label: "Ngày áp dụng",
        },
        {
            key: "applyEnd",
            label: "Ngày kết thúc",
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
        listClassRoom.forEach((item) => {
            if (item.classRoomId == classRoomSeleted.currentKey) {
                setClassRoomNameSelected(item.classRoomName)
            }
        })
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
            let getRs = await getListScheduleByClassRoom(classRoomSeleted.currentKey);
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
        let getRs = await getListScheduleByClassRoom(classRoomId);
        if (getRs) {
            if (getRs.status == 200) {
                setlistData(getRs.data)
            }
        } else {

            showErrorToast("Lỗi kết nối máy chủ")
        }



    };
    // xem #############################################################3
    const viewOnClick = (item) => {
        onOpen();
        setIsNewItem(false);
        setModalData(item)

    };
    //tạo	##############################################################
    const createItem = async (item) => {
        const listTime = listData.map((a) => ({ startDate: a.applyStart, endDate: a.applyEnd }));
        const chectTime = isScheduleValid({
            startDate: item.applyStart,
            endDate: item.applyEnd
        }, listTime)
        if (chectTime.value) {
            onClose();
            let getRs = await createSchedule(item);
            if (getRs) {
                if (getRs.status == 200) {
                    loadData()
                }
            } else {

                showErrorToast("Lỗi kết nối máy chủ")
            }
        } else {
            showWarningToast(chectTime.message)

        }


    };
    //sữa	##############################################################
    const editOnClick = (item) => {
        onOpen();
        setIsNewItem(false);
        setModalData(item)

    };

    const updateItem = async (item) => {
        const listTime = listData.map((a) => {
            if (a.scheduleId == item.scheduleId) {
                return null;
            }
            return {
                startDate: a.applyStart,
                endDate: a.applyEnd
            };
        }).filter((b) => b !== null);
        const chectTime = isScheduleValid({
            startDate: item.applyStart,
            endDate: item.applyEnd
        }, listTime)
        if (chectTime.value) {
            onClose();
            let getRs = await updateSchedule(item);
            if (getRs) {
                if (getRs.status == 200) {
                    loadData()
                }
            } else {
    
                showErrorToast("Lỗi kết nối máy chủ")
            }
        } else {
            showWarningToast(chectTime.message)

        }

        

    };
    //xóa	##############################################################

    const deleteItem = async (item) => {
        let getRs = await deleteSchedule(item.scheduleId);
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

                        <Link href={`/schedule/${dataItem.scheduleId}`}>
                            <Tooltip content="Xem chi tiết">
                                <span className="text-lg text-default-400 cursor-pointer active:opacity-50"

                                >
                                    <EyeIcon />
                                </span>
                            </Tooltip>
                        </Link>

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
            case "classRoomName":
                return (

                    dataItem.ClassRoom ? dataItem.ClassRoom.classRoomName : " - "
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

            <h1 className={title()}>Quản lý danh sách thời khóa biểu</h1>

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
                                    scheduleId: "Auto",
                                    classRoomId: classRoomSeleted.currentKey,
                                    applyStart: getCurDateForSelectUi(),
                                    applyEnd: getCurDateForSelectUi(),
                                    ClassRoom: {
                                        classRoomName: classRoomNameSeleted
                                    }
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
                        {(column) => <TableColumn key={column.key}>{column.label} </TableColumn>}
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
                            <ModalHeader className="flex flex-col gap-1">{isNewItem ? "Thêm lớp mới" : "Chỉnh sửa lớp học"}</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    label="Mã thòi khóa biểu"
                                    name="scheduleId"
                                    value={modalData.scheduleId}
                                    onChange={modalOnChange}
                                    labelPlacement="outside"
                                    variant="bordered"
                                    readOnly={true}
                                />
                                <Input
                                    autoFocus
                                    label="Lớp"
                                    value={modalData.ClassRoom.classRoomName}
                                    labelPlacement="outside"
                                    variant="bordered"
                                    readOnly={true}

                                />
                                <Input
                                    autoFocus
                                    label="Ngày áp dụng"
                                    name="applyStart"
                                    type="date"
                                    value={modalData.applyStart}
                                    onChange={modalOnChange}
                                    labelPlacement="outside"
                                    variant="bordered"

                                />
                                <Input
                                    autoFocus
                                    label="Ngày kết thúc"
                                    name="applyEnd"
                                    type="date"
                                    value={modalData.applyEnd}
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
