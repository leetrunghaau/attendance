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
import { showErrorToast, showSuccessToast } from "../../components/toast";
import { createClassRoom, deleteClassRoom, getListClassRoom, updateClassRoom } from "@/service/classRoom-service"



export default function ClassRoomPage() {

	const [listData, setlistData] = React.useState([]);
	const [modalData, setModalData] = React.useState({
		classRoomId: "",
		classRoomName: ""
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
			key: "classRoomId",
			label: "Mã lớp học",
		},
		{
			key: "classRoomName",
			label: "Tên lớp học",
		},
		{
			key: "actions",
			label: " ",
		},
	];
	//init  	##############################################################3
	useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
		let getRs = await getListClassRoom();
		if (getRs) {
            if (getRs.status == 200) {
			setlistData(getRs.data)
		}
        } else {

            showErrorToast("Lỗi kết nối máy chủ")
        }
		
	};
	//tạo	##############################################################
	const createItem = async (item) => {
		let getRs = await createClassRoom(item);
		if (getRs) {
            if (getRs.status == 200) {
			showSuccessToast("Thêm lớp học hành công")
			
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
			classRoomId: item.classRoomId,
			classRoomName: item.classRoomName
		})

	};

	const updateItem = async (item) => {
		let getRs = await updateClassRoom(item);
		if (getRs) {
            if (getRs.status == 200) {
			showSuccessToast("Cập nhật lớp học thành công")
			loadData()
		}
        } else {

            showErrorToast("Lỗi kết nối máy chủ")
        }
		
	};
	//xóa	##############################################################

	const deleteItem = async (item) => {
		let getRs = await deleteClassRoom(item.classRoomId);
		if (getRs) {
            if (getRs.status == 200) {
			showSuccessToast("Xóa lớp học hành công")
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
			<h1 className={title()}>Quản lý danh sách lớp học</h1>
			<div className="flex flex-col justify-center items-center">
				<div className="flex w-8/12 justify-end items-end mb-2">
					<Button
						color="secondary"
						variant="light"
						startContent={<PlusIcon></PlusIcon>}
						onPress={(event) => {
							onOpen();
							setIsNewItem(true);
							setModalData({
								classRoomId: "Auto",
								classRoomName: ""
							})
						}}
					>thêm mới</Button>
				</div>

				<Table aria-label="Example table with dynamic content"
					selectionMode="single"
					color="secondary"
					className="w-8/12 "
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
							<ModalHeader className="flex flex-col gap-1">{isNewItem ? "Thêm lớp mới" : "Chỉnh sửa lớp học"}</ModalHeader>
							<ModalBody>
								<Input
									autoFocus
									label="Mã lớp học"
									name="classRoomId"
									value={modalData.classRoomId}
									onChange={modalOnChange}
									labelPlacement="outside"
									variant="bordered"
									readOnly={true}
								/>
								<Input
									autoFocus
									label="Tên lớp"
									name="classRoomName"
									value={modalData.classRoomName}
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
