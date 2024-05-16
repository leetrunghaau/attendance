"use client";
import React, { useCallback, useMemo, useState } from "react";
import { useEffect } from 'react'
import { title } from "@/components/primitives";
import { Pagination } from "@nextui-org/pagination";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/table";
import { Button } from "@nextui-org/button";
import { DeleteIcon, EditIcon, EyeIcon, LockIcon, MailIcon, PlusIcon } from "@/components/icons";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { Checkbox } from "@nextui-org/checkbox";
import { Link } from "@nextui-org/link";
import { Tooltip } from "@nextui-org/tooltip";
import { showErrorToast, showSuccessToast, showWarningToast } from "../../components/toast";
import { createClassRoom, deleteClassRoom, getListClassRoom, updateClassRoom } from "@/service/classRoom-service"
import { image, Image, Select, SelectItem } from "@nextui-org/react";
import { getListImgLink } from './../../service/reportImgLink-service';
import { getCurDateForSelectUi } from "@/Util/funstion";
import moment from 'moment';



export default function ReportImgPage() {
	const [listClassRoom, setListClassRoom] = useState([]);
	const [classRoomSeleted, setClassRoomSelected] = useState(null);
	const [listData, setlistData] = useState([]);
	const [modalData, setModalData] = useState({	});
	// for table
	const [page, setPage] = useState(1);
	const rowsPerPage = 10;
	const pages = Math.ceil(listData.length / rowsPerPage);
	const items = useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;
		return listData.slice(start, end);
	}, [page, listData]);
	// for model
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const columns = [

		{
			key: "classRoomName",
			label: "Lớp",
		},
		{
			key: "imgStatus",
			label: "Trạng thái",
		}, {
			key: "imgTime",
			label: "Thời gian",
		},
		{
			key: "thumnal",
			label: "Hình ảnh",
		}
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
				// setListClassRoom(getRs.data)
				setListClassRoom([{
					"classRoomId": "ALL",
					"classRoomName": "Tất cả"
				}].concat(getRs.data))
			}
		} else {

			showErrorToast("Lỗi kết nối máy chủ")
		}

	}
	const loadData = async () => {

		if (classRoomSeleted) {
			let getRs = await getListImgLink(classRoomSeleted.currentKey);
			if (getRs) {
				if (getRs.status == 200) {
					setlistData(getRs.data)
					console.log("id: ", classRoomSeleted)
					console.log("res: ", getRs.data)
				}
			} else {

				showErrorToast("Lỗi kết nối máy chủ")
			}

		}

	};
	const viewOnClick = (item) => {
		if(item.linkValue){

			onOpen();
			setModalData(item)
		}
			
    };
	const renderCell = useCallback((dataItem, columnKey) => {
		const cellValue = dataItem[columnKey];

		switch (columnKey) {
			case "actions":
				return (
					<div className="relative flex items-center  gap-5">
						<Tooltip content="Thay đổi thông tin học sinh">
							<span className="text-lg text-default-400 cursor-pointer active:opacity-50"
								onClick={() => editOnClick(dataItem)}
							>
								<EditIcon />
							</span>
						</Tooltip>
						<Tooltip color="danger" content="Xóa học sinh">
							<span className="text-lg text-danger cursor-pointer active:opacity-50"
								onClick={() => deleteOnClick(dataItem)}
							>
								<DeleteIcon />
							</span>
						</Tooltip>
					</div>
				);
			case "classRoomName":
				return dataItem?.ClassRoom?.classRoomName ?? "Không xác định";
			case "imgTime":
				return moment(cellValue).utcOffset('+07:00').format('HH:mm:ss, DD-MM-YYYY');
			case "thumnal":
				return (
					<Image
						isZoomed
						width={240}
						alt="lỗi link"
						src={dataItem?.linkValue ?? ""}
						onClick={() => viewOnClick(dataItem)}
					>
					</Image>
				)

			default:
				return cellValue;
		}
	}, []);
	
	return (
		<div>

			<h1 className={title()}>Danh sách hình ảnh phát hiện bạo lực học đường</h1>

			<div className="flex flex-col justify-center items-center ">
				<div className="flex w-10/12 justify-between  items-end my-4">
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

				</div>


				<Table aria-label="Example table with dynamic content"
					selectionMode="single"
					color="secondary"
					className=" w-10/12 "
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
							<TableRow key={item.imgLinkId}>
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
				size="5xl"
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">Chi tiết hình ảnh</ModalHeader>
							<ModalBody>
								<Image
									 width={1000}
									alt="lỗi link"
									src={modalData?.linkValue ?? ""}
								>
								</Image>
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
		</div>
	);
}
