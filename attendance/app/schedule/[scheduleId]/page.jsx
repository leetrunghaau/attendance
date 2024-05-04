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
import { showErrorToast, showSuccessToast, showWarningToast } from "../../../components/toast";
import { createClassRoom, deleteClassRoom, getListClassRoom, updateClassRoom } from "@/service/classRoom-service"
import { Card, CardBody, CardFooter, CardHeader, Divider, Select, SelectItem } from "@nextui-org/react";
import { createStudent, deleteStudent, getListStudent, updateStudent } from './../../../service/student-service';
import { getCurDateForSelectUi } from "@/Util/funstion";
import { getListLesson } from './../../../service/lesson-service';
import { getListTeacher } from "@/service/teacher-service";
import { createScheduleItem, deleteScheduleItem, getListScheduleItemBySchedule, updateScheduleItem } from '../../../service/schedule-item-service';
import { getSchedule, updateSchedule } from "@/service/schedule-service";

const dayInWeeks = [
    {
        key: "1",
        lable: "Thứ hai",
        value: 1
    },
    {
        key: "2",
        lable: "Thứ ba",
        value: 2
    },
    {
        key: "3",
        lable: "Thứ tư",
        value: 3
    },
    {
        key: "4",
        lable: "Thứ năm",
        value: 4
    },
    {
        key: "5",
        lable: "Thứ sáu",
        value: 5
    },
    {
        key: "6",
        lable: "Thứ bảy",
        value: 6
    }
]

export default function ScheduleItemPage({ params }) {

    const [listLesson, setlistLesson] = React.useState([]);
    const [listTeacher, setlistTeacher] = React.useState([]);
    const [schedule, setSchedule] = React.useState({
        scheduleId: "",
        classRoomId: "",
        applyStart: "",
        applyEnd: "",
        ClassRoom: {
            classRoomId: "",
            classRoomName: ""
        }
    });


    const [listData, setlistData] = React.useState([]);
    const [modalData, setModalData] = React.useState({
        scheduleItemId: "",
        teacherId: "",
        subject: "",
        lessonId: "",
        dayOfWeek: 1,
        scheduleId: ""

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
            key: "lessonId",
            label: "Tiết",
        },
        {
            key: 1,
            label: "Thứ 2",
        },
        {
            key: 2,
            label: "Thứ 3",
        },
        {
            key: 3,
            label: "Thứ 4",
        }, {
            key: 4,
            label: "Thứ 5",
        },
        {
            key: 5,
            label: "Thứ 6",
        },
        {
            key: 6,
            label: "Thứ 7",
        }
    ];
    //init  	##############################################################3
    useEffect(() => {
        loadData();
        loadLesson();
        loadTeacher();
        loadSchedule();
    }, []);
    const loadData = async () => {

        let getRs = await getListScheduleItemBySchedule(params.scheduleId);
        if (getRs) {
            if (getRs.status == 200) {
                setlistData(getRs.data)
            }
        } else {

            showErrorToast("Lỗi kết nối máy chủ")
        }

    };
    const loadSchedule = async () => {

        let getRs = await getSchedule(params.scheduleId);
        if (getRs) {
            if (getRs.status == 200) {
                setSchedule(getRs.data)
            }
        } else {

            showErrorToast("Lỗi kết nối máy chủ")
        }

    };
    const loadLesson = async () => {

        let getRs = await getListLesson();
        if (getRs) {
            if (getRs.status == 200) {
                setlistLesson(getRs.data)
            }
        } else {

            showErrorToast("Lỗi kết nối máy chủ")
        }

    };

    const loadTeacher = async () => {

        let getRs = await getListTeacher();
        if (getRs) {
            if (getRs.status == 200) {
                setlistTeacher(getRs.data)
            }
        } else {

            showErrorToast("Lỗi kết nối máy chủ")
        }

    };

    //tạo	##############################################################
    const createItem = async (item) => {
        if (item.lessonId == "") {
            showWarningToast("Không được để trống tiết học");
        } else if (item.teacherId == "") {
            showWarningToast("Không được để trống giáo viên");
        }
        else {
            // kiểm tra trùng
            const findLesson = listData.find((a) => a.lessonId === item.lessonId);
            let findDayOfWeek = null;
            
            if (findLesson) {
                findDayOfWeek = findLesson.listSchedule.find((b) => b.dayOfWeek == item.dayOfWeek);
            }
            if (findDayOfWeek) {
                showWarningToast("Trùng tiết");
            }else{
                onClose();
                let getRs = await createScheduleItem(item);
                if (getRs) {
                    if (getRs.status == 200) {
                        loadData()
                    }
                } else {

                    showErrorToast("Lỗi kết nối máy chủ")
                }
            }
        }
    };
    //sữa	##############################################################
    const editOnClick = (item) => {
        onOpen();
        setIsNewItem(false);
        setModalData({
            scheduleItemId: item.scheduleItemId,
            teacherId: item.teacherId,
            subject: item.subject,
            lessonId: item.lessonId,
            dayOfWeek: "" + item.dayOfWeek,
            scheduleId: item.scheduleId
        })

    };

    const updateItem = async (item) => {
      
            // kiểm tra trùng
            const findLesson = listData.find((a) => a.lessonId === item.lessonId);
            let findDayOfWeek = null;
            
            if (findLesson) {
                findDayOfWeek = findLesson.listSchedule.find((b) => b.dayOfWeek == item.dayOfWeek && b.scheduleItemId != item.scheduleItemId);
            }
            if (findDayOfWeek) {
                showWarningToast("Trùng tiết");
            }else{
                onClose();
                let getRs = await updateScheduleItem(item);
                if (getRs) {
                    if (getRs.status == 200) {
                        loadData()
                    }
                } else {

                    showErrorToast("Lỗi kết nối máy chủ")
                }
            }
    };
    //xóa	##############################################################

    const deleteItem = async (item) => {
        let getRs = await deleteScheduleItem(item.scheduleItemId);
        if (getRs) {
            if (getRs.status == 200) {

                // superLoadData(item.classRoomId)
                loadData()
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
            case "lessonId":
                return (
                    dataItem.lessonName
                );
            default:
                const schTtem = dataItem.listSchedule.find((item) => item.dayOfWeek == columnKey)
                if (schTtem) {
                    return (
                        <Card >
                            <CardBody>
                                <p>Môn: {schTtem.subject}</p>
                                <Divider className="my-1" />
                                <p>GV: {schTtem.Teacher.fullName}</p>
                            </CardBody>
                            <Divider />
                            <CardFooter>
                                <div className="relative flex items-center  gap-5">
                                    <Tooltip content="Sửa tiết học">
                                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                            onClick={() => editOnClick(schTtem)}
                                        >
                                            <EditIcon />
                                        </span>
                                    </Tooltip>
                                    <Tooltip color="danger" content="Xóa tiết học">
                                        <span className="text-lg text-danger cursor-pointer active:opacity-50"
                                            onClick={() => deleteOnClick(schTtem)}
                                        >
                                            <DeleteIcon />
                                        </span>
                                    </Tooltip>
                                </div>
                            </CardFooter>
                        </Card>
                    )
                } else {
                    return " "
                }
        }
    }, []);
    const modalOnChange = (event) => {
        const { name, value } = event.target;
        setModalData({
            ...modalData,
            [name]: value
        });
    };
    const dayOfWeekSelectOnChange = (event) => {
        setModalData({
            ...modalData,
            dayOfWeek: event.currentKey
        });

    };
    const lessonIdSelectOnChange = (event) => {
        setModalData({
            ...modalData,
            lessonId: event.currentKey
        });

    };
    const teacherIdSelectOnChange = (event) => {
        setModalData({
            ...modalData,
            teacherId: event.currentKey
        });

    };
    return (
        <div>

            <h1 className={title()}>Thời khóa biểu lớp {schedule.ClassRoom.classRoomName}</h1>
            <h1 className="mt-5">Bắt đầu từ: {schedule.applyStart}</h1>
            <h1 >Kết thúc: {schedule.applyEnd}</h1>
            <div className="flex flex-col justify-center items-center ">
                <div className="flex w-full justify-end  items-end my-4">
                    <Button
                        color="secondary"
                        variant="light"
                        startContent={<PlusIcon></PlusIcon>}
                        onPress={(event) => {

                            onOpen();
                            setIsNewItem(true);
                            setModalData({
                                scheduleItemId: "Auto",
                                teacherId: "",
                                subject: "",
                                lessonId: "",
                                dayOfWeek: "1",
                                scheduleId: schedule.scheduleId
                            })


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
                            <TableRow key={item.lessonId}>
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
                                <p>Lớp học: {schedule.ClassRoom.classRoomName}</p>
                                <Input
                                    autoFocus
                                    color="secondary"
                                    label="Mã tiết học"
                                    name="scheduleItemId"
                                    value={modalData.scheduleItemId}
                                    onChange={modalOnChange}
                                    labelPlacement="outside"
                                    variant="bordered"
                                    readOnly={true}
                                />
                                <Input
                                    autoFocus
                                    isRequired
                                    color="secondary"
                                    label="Môn học"
                                    name="subject"
                                    value={modalData.subject}
                                    onChange={modalOnChange}
                                    labelPlacement="outside"
                                    variant="bordered"

                                />

                                <Select
                                    isRequired
                                    color="secondary"
                                    label="Chọn thứ"
                                    name='dayOfWeek'
                                    labelPlacement="outside"
                                    variant="bordered"
                                    selectedKeys={[modalData.dayOfWeek]}
                                    onSelectionChange={dayOfWeekSelectOnChange}
                                >
                                    {dayInWeeks.map((dayInWeek) => (
                                        <SelectItem key={dayInWeek.value} value={dayInWeek.value}>
                                            {dayInWeek.lable}
                                        </SelectItem>
                                    ))}
                                </Select>
                                <Select
                                    isRequired
                                    color="secondary"
                                    label="Chọn tiết"
                                    name='lessonId'
                                    labelPlacement="outside"
                                    variant="bordered"
                                    selectedKeys={[modalData.lessonId]}
                                    onSelectionChange={lessonIdSelectOnChange}
                                >
                                    {listLesson.map((lesson) => (
                                        <SelectItem key={lesson.lessonId} value={lesson.lessonId}>
                                            {lesson.lessonName}
                                        </SelectItem>
                                    ))}
                                </Select>

                                <Select
                                    isRequired
                                    color="secondary"
                                    label="Chọn giáo viên"
                                    name='teacherId'
                                    labelPlacement="outside"
                                    variant="bordered"
                                    selectedKeys={[modalData.teacherId]}
                                    onSelectionChange={teacherIdSelectOnChange}
                                >
                                    {listTeacher.map((teacher) => (
                                        <SelectItem key={teacher.teacherId} value={teacher.teacherId}>
                                            {teacher.fullName}
                                        </SelectItem>
                                    ))}
                                </Select>

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
