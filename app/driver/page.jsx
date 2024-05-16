"use client"
import  { useCallback, useEffect, useMemo, useState } from "react";
import { DeleteIcon, EditIcon, EyeIcon, PlusIcon } from "@/components/icons";
import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Pagination } from "@nextui-org/pagination";
import { Tooltip } from "@nextui-org/tooltip";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import { Input } from "@nextui-org/input";
import { createDriver, deleteDriver, getListDriver, updateDriver } from './../../service/driver-service';
import { Select, SelectItem } from '@nextui-org/react';
import { getListClassRoom } from '@/service/classRoom-service';
import { showErrorToast, showSuccessToast } from '@/components/toast';

export default function DriverPage() {
	const [listData, setlistData] = useState([])
	const [modalData, setModalData] = useState({
		driverId: "d2",
		driverName: "thiết bị 2",
		classRoomId: "c2"


	});
	const [isNewItem, setIsNewItem] = useState(true);

	//re
	const [listClassRoom, setListClassRoom] = useState([]);


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
			key: "driverId",
			label: "Mã thiết bị",
		},
		{
			key: "driverName",
			label: "Tên thiết bị",
		},
		{
			key: "classRoomName",
			label: "Tên phòng",
		},
		{
			key: "actions",
			label: " ",
		},
	];




	//init  	##############################################################3
	useEffect(() => {
		loadData();
		loadClassRoom();
	}, []);

	const loadData = async () => {
		let getRs = await getListDriver();
		if (getRs) {
            if (getRs.status == 200) {
				setlistData(getRs.data)
			}
        } else {

            showErrorToast("Lỗi kết nối máy chủ")
        }
		
	};
	const loadClassRoom = async () => {
		let getRs = await getListClassRoom();
		if (getRs) {
            if (getRs.status == 200) {
				setListClassRoom(getRs.data)
			}
        } else {

            showErrorToast("Lỗi kết nối máy chủ")
        }
		
	};
	//tạo	##############################################################
	const createItem = async (item) => {
		if(item.classRoomId == ""){
			item.classRoomId = null
		}
		let getRs = await createDriver(item);
		if (getRs) {
            if (getRs.status == 200) {
			loadData()
			showSuccessToast("Tạo thiết bị thành công")

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
			driverId: item.driverId,
			driverName: item.driverName,
			classRoomId: item.classRoomId
		})

	};
	const updateItem = async (item) => {
		if(item.classRoomId == ""){
			item.classRoomId = null
		}
		let getRs = await updateDriver(item);
		if (getRs) {
            if (getRs.status == 200) {
				loadData()
				showSuccessToast("Sửa thiết bị thành công")

			}
        } else {

            showErrorToast("Lỗi kết nối máy chủ")
        }
		
	};
	//xóa	##############################################################

	const deleteItem = async (item) => {
		let getRs = await deleteDriver(item.driverId);
		if (getRs) {
            if (getRs.status == 200) {
				loadData()
				showSuccessToast("Xóa thiết bị thành công")

			}
        } else {

            showErrorToast("Lỗi kết nối máy chủ")
        }
		
	};

	const deleteOnClick = (item) => {
		deleteItem(item)
	};
	// -------------
	const renderCell = useCallback((dataItem, columnKey) => {
		const cellValue = dataItem[columnKey];

		switch (columnKey) {
			case "actions":
				return (
					<div className="relative flex items-center  gap-5">
	
						<Tooltip content="Sửa thiết bị">
							<span className="text-lg text-default-400 cursor-pointer active:opacity-50"
							onClick={() => editOnClick(dataItem)}
							
							>
								<EditIcon />
							</span>
						</Tooltip>
						<Tooltip color="danger" content="Xóa thiết bị">
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
	const selectOnChange = (event) => {
		setModalData({
			...modalData,
			classRoomId: event.currentKey
		});

	};
	return (
		<div>
			<h1 className={title()}>Quản lý danh sách thiết bị</h1>
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
								driverId: "Auto",
								driverName: "",
								classRoomId: ""

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
						{(column) => <TableColumn key={column.driverId}>{column.label}</TableColumn>}
					</TableHeader>
					<TableBody items={items}>
						{(item) => (
							<TableRow key={item.driverId}>
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
							<ModalHeader className="flex flex-col gap-1">{isNewItem ? "Thêm thiết bị mới" : "Chỉnh sửa thiết bị"}</ModalHeader>
							<ModalBody>
								<Input
									autoFocus
									label="Mã thiết bị"
									name="driverId"
									value={modalData.driverId}
									onChange={modalOnChange}
									labelPlacement="outside"
									variant="bordered"
									readOnly={true}
								/>
								<Input
									autoFocus
									label="Tên thiết bị"
									name="driverName"
									value={modalData.driverName}
									onChange={modalOnChange}
									labelPlacement="outside"
									variant="bordered"

								/>
								<Select
									color="secondary"
									label="Chọn lớp"
									name='classRoomId'
									labelPlacement="outside"
									variant="bordered"
									className="max-w-xs"
									selectedKeys={[modalData.classRoomId]}
									onSelectionChange={selectOnChange}
								>
									{listClassRoom.map((classRoom) => (
										<SelectItem key={classRoom.classRoomId} value={classRoom.classRoomId}>
											{classRoom.classRoomName}
										</SelectItem>
									))}
								</Select>
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
