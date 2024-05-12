"use client";
import  { useEffect, useMemo, useState } from "react";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { getCurDateForSelectUi } from "@/Util/funstion"
import { EyeIcon, GithubIcon } from "@/components/icons";
import { Pagination } from "@nextui-org/pagination";
import { Tabs, Tab } from '@nextui-org/tabs';
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/react";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from '@nextui-org/table';
import { getListTeacher } from './../../service/teacher-service';
import { getTeacherAttendence } from './../../service/attendence-service';
import { Button } from "@nextui-org/button";
import { showErrorToast, showWarningToast } from "@/components/toast";
import { ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';
import { Modal } from '@nextui-org/modal';


export default function TeacherAttendencePage() {
    const [listTeacher, setlistTeacher] = useState([]);
    const [teacherSelected, setTeacherSelected] = useState(null);
    const [dateSelected, SetDateSelected] = useState(getCurDateForSelectUi());

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [listData, setListData] = useState([]);
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;
    const pages = Math.ceil(listData.length / rowsPerPage);
    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return listData.slice(start, end);
    }, [page, listData]);

    const columns = [
        {
            key: "lessonName",
            label: "Tiết",
        },
        {
            key: "classRoomName",
            label: "Lớp",
        },
        {
            key: "lessonStart",
            label: "Tiết bắt đầu",
        },
        {
            key: "lessonEnd",
            label: "Tiết kết thúc",
        }, {
            key: "attendenceStatus",
            label: "Điểm danh",
        },
        {
            key: "checkinTime",
            label: "Thời gian vào lớp",
        },
        {
            key: "checkoutTime",
            label: "Thời gian ra lớp",
        }
    ];
    useEffect(() => {
        // loadData();
        loadTeacher();
    }, []);
    useEffect(() => {
    }, [teacherSelected])
    useEffect(() => {
    }, [dateSelected])

    const loadData = async () => {

        let getRs = await getTeacherAttendence({
            teacherId: teacherSelected.currentKey,
            indexDate: dateSelected
        });
        if (getRs) {
            if (getRs.status == 200) {
                setListData(getRs.data)
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
    const rendermodel = () => {
        const teacher = listTeacher.find((item) => item.teacherId == teacherSelected.currentKey)
        return (
            <div>
                <h2 class="text-xl mb-5">{teacher.fullName}</h2>
                <div>
                    <p class="mb-3">Số điện thoại: {teacher.phone}</p>
                    <p class="mb-3">Email: {teacher.email}</p>
                    <p class="mb-3">Giới tính: {teacher.gender}</p>
                    <p class="mb-3">Ngày sinh: {teacher.birthDate}</p>
                    <p>Địa chỉ: {teacher.placeOfOrigin}</p>
                </div>
            </div>
        )
    }
    return (
        <section className="flex flex-col items-start justify-start gap-4 py-8 md:py-10">

            <div>
                <h1 className={title()}>Báo cáo điểm danh giáo viên</h1>
            </div>
            <div className="flex w-full justify-between gap-8 items-end my-4">

                <Select
                    color="secondary"
                    label="Chọn giáo viên"
                    labelPlacement="outside"
                    variant="bordered"
                    // className="max-w-xs"
                    selectedKeys={teacherSelected}
                    onSelectionChange={setTeacherSelected}
                >
                    {listTeacher.map((teacher) => (
                        <SelectItem key={teacher.teacherId} value={teacher.teacherId}>
                            {teacher.fullName}
                        </SelectItem>
                    ))}
                </Select>
                <Input

                    color="secondary"
                    type="date"
                    label="Chọn ngày"
                    value={dateSelected}
                    onValueChange={SetDateSelected}
                    labelPlacement="outside"
                    variant="bordered" />
                <Button
                    fullWidth={true}
                    color="secondary"
                    startContent={<EyeIcon></EyeIcon>}
                    variant="ghost"
                    onPress={(event) => {
                        if (teacherSelected) {
                            loadData();
                        } else {
                            showWarningToast("Vui lòng chọn giáo viên")
                        }
                    }}
                >Xem báo cáo</Button>
                <Button
                    fullWidth={true}
                    color="secondary"
                    startContent={<EyeIcon />}
                    variant="ghost"
                    onPress={(event) => {
                        if (teacherSelected) {
                            onOpen();
                        } else {
                            showWarningToast("Vui lòng chọn giáo viên")
                        }

                    }}
                >Thông tin GV</Button>

            </div>
            <div className="w-full">
                <Table
                    selectionMode="single"
                    color="secondary"
                    className="w-full"
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
                >
                    <TableHeader columns={columns}>
                        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                    </TableHeader>
                    <TableBody items={items}>
                        {(item) => (
                            <TableRow key={item.teacherAttendanceId}>
                                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
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
                            <ModalHeader className="flex flex-col gap-1">Thông tin giáo viên</ModalHeader>
                            <ModalBody>
                                {rendermodel()}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Đóng
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </section>
    );
}
