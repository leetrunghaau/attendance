"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { getListTeacher } from '@/service/teacher-service';
import { getStudentAttendence, getTeacherAttendence } from '@/service/attendence-service';
import { Button } from "@nextui-org/button";
import { showErrorToast, showWarningToast } from "@/components/toast";
import { ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal';
import { Modal } from '@nextui-org/modal';
import { getListClassRoom } from "@/service/classRoom-service";
import { Tooltip } from '@nextui-org/tooltip';


export default function Home() {
  const [listClassRoom, setlistClassRoom] = useState([]);
  const [classRoomSelected, setClassRoomSelected] = useState(null);
  const [dateSelected, setDateSelected] = useState(getCurDateForSelectUi());

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalData, setModalData] = useState();

  const [listData, setListData] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const pages = Math.ceil(listData.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return listData.slice(start, end);
  }, [page, listData]);

  const [columns, setColumes] = useState([{
    lessonId: "studentName",
    lessonName: "Họ và tên",
  },
  {
    lessonId: "actions",
    lessonName: " ",
  }]);

  useEffect(() => {
    // loadData();
    loadClassRoom();
  }, []);

  const loadData = async () => {
    const inputParam = {
      classRoomId: classRoomSelected.currentKey,
      indexDate: dateSelected
    }
    let getRs = await getStudentAttendence(inputParam);
    if (getRs) {
      if (getRs.status == 200) {
        console.log("LOAD DATA RS =>")
        console.log(inputParam)
        console.log(getRs)
        setListData(getRs.data.attdence)
        setColumes(getRs.data.lesson)
      }
      console.log(columns)
    } else {

      showErrorToast("Lỗi kết nối máy chủ")
    }

  };
  const loadClassRoom = async () => {

    let getRs = await getListClassRoom();

    if (getRs) {
      if (getRs.status == 200) {
        setlistClassRoom(getRs.data)
      }
    } else {
      showErrorToast("Lỗi kết nối máy chủ")
    }

  };
  const rendermodel = () => {
    return (
      <div>
        <h2 class="text-xl mb-5">{modalData.fullName}</h2>
        <div>
          <p class="mb-3">Số điện thoại: {modalData.phone}</p>
          <p class="mb-3">Giới tính: {modalData.gender}</p>
          <p class="mb-3">Ngày sinh: {modalData.birthDate}</p>
          <p>Địa chỉ: {modalData.placeOfOrigin}</p>
        </div>
      </div>
    )
  }
  const viewOnClick = (item) => {
    setModalData(item)
    onOpen();
  };
  const renderColume = (column) => {
    if (column.lessonId != "studentName" && column.lessonId != "actions") {
      return (
        <TableColumn key={column.lessonId}>{column.lessonName} <br />{column.timeStart} - {column.timeEnd}</TableColumn>
      )
    }
    return (
      <TableColumn key={column.lessonId}>{column.lessonName} </TableColumn>
    )
  }
  const renderCell = useCallback((dataItem, columnKey) => {
    const cellValue = dataItem[columnKey];

    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex items-center  gap-5">

            <Tooltip content="Xem chi tiết">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => viewOnClick(dataItem)}
              >
                <EyeIcon />
              </span>
            </Tooltip>
          </div>
        );
      case "studentName":
        return (
          dataItem.fullName
        );
      default:
        let conten = "";
        conten = cellValue.checkinTime ?? " ";
        conten += " - "
        conten += cellValue.checkoutTime ?? " ";
        return (
          <Tooltip content={conten}>
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50"
            >
              {cellValue.attendenceStatus}
            </span>
          </Tooltip>
        );
    }
  }, []);
  return (
    <section className="flex flex-col items-start justify-start gap-4 py-8 md:py-10">

      <div>
        <h1 className={title()}>Báo cáo điểm danh học sinh</h1>
      </div>
      <div className="flex w-full justify-between gap-8 items-end my-4">

        <Select
          color="secondary"
          label="Chọn lớp"
          labelPlacement="outside"
          variant="bordered"
          // className="max-w-xs"
          selectedKeys={classRoomSelected}
          onSelectionChange={setClassRoomSelected}
        >
          {listClassRoom.map((classRoom) => (
            <SelectItem key={classRoom.classRoomId} value={classRoom.classRoomId}>
              {classRoom.classRoomName}
            </SelectItem>
          ))}
        </Select>
        <Input

          color="secondary"
          type="date"
          label="Chọn ngày"
          value={dateSelected}
          onValueChange={setDateSelected}
          labelPlacement="outside"
          variant="bordered" />
        <Button
          fullWidth={true}
          color="secondary"
          startContent={<EyeIcon></EyeIcon>}
          variant="ghost"
          onPress={(event) => {
            if (classRoomSelected) {
              loadData();
            } else {
              showWarningToast("Vui lòng chọn lớp")
            }
          }}
        >Xem báo cáo</Button>


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
            {(column) => renderColume(column)}
          </TableHeader>
          <TableBody items={items}>
            {(item) => (
              <TableRow key={item.studentId}>
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
              <ModalHeader className="flex flex-col gap-1">Thông tin học sinh</ModalHeader>
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
