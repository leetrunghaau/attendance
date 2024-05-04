"use client"
import { useEffect } from 'react'
import { DeleteIcon, EditIcon, EyeIcon, PlusIcon } from "@/components/icons";
import { title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Pagination } from "@nextui-org/pagination";
import { Tooltip } from "@nextui-org/tooltip";
import React from "react";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import { Input } from "@nextui-org/input";
import { createDriver, deleteDriver, getListDriver, updateDriver } from './../../service/driver-service';
import { Select, SelectItem } from '@nextui-org/react';
import { createTeacher, deleteTeacher, getListTeacher, updateTeacher } from '@/service/teacher-service';
import { getCurDateForSelectUi } from '@/Util/funstion';
import { showErrorToast } from '../../components/toast';

export default function TeacherPage() {
	const [listData, setlistData] = React.useState([])
	const [modalData, setModalData] = React.useState({
		teacherId: "",
		fullName: "",
		phone: "",
		gender: "",
		birthDate: "",
		placeOfOrigin: "",
		email: ""



	});
	const [isNewItem, setIsNewItem] = React.useState(true);


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
			key: "teacherId",
			label: "Mã giáo viên",
		},
		{
			key: "fullName",
			label: "Họ và tên",
		},
		{
			key: "phone",
			label: "Số điện thoại",
		},
		{
			key: "email",
			label: "Email",
		},
		{
			key: "gender",
			label: "Giới tính",
		},
		{
			key: "birthDate",
			label: "Ngày sinh",
		},
		{
			key: "placeOfOrigin",
			label: "Địa chỉ",
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
		let getRs = await getListTeacher();
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
		let getRs = await createTeacher(item);
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
			teacherId: item.teacherId,
			fullName: item.fullName,
			phone: item.phone,
			gender: item.gender,
			birthDate: item.birthDate,
			placeOfOrigin: item.placeOfOrigin,
			email: item.email
		})

	};
	const updateItem = async (item) => {
		let getRs = await updateTeacher(item);
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
		let getRs = await deleteTeacher(item.teacherId);
		if (getRs) {
            if (getRs.status == 200) {
			loadData()
		}
        } else {

            showErrorToast("Lỗi kết nối máy chủ")
        }
		
	};

	const deleteOnClick = (item) => {
		deleteItem(item)
	};
	// -------------
	const renderCell = React.useCallback((dataItem, columnKey) => {
		const cellValue = dataItem[columnKey];

		switch (columnKey) {
			case "actions":
				return (
					<div className="relative flex items-center  gap-5">
						<Tooltip content="sửa thiết bị">
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
	return (
		<div>
			<h1 className={title()}>Quản lý danh sách giáo viên</h1>
			<div className="flex flex-col justify-center items-center">
				<div className="flex w-full justify-end items-end mb-2">
					<Button
						color="secondary"
						variant="light"
						startContent={<PlusIcon></PlusIcon>}
						onPress={(event) => {
							onOpen();
							setIsNewItem(true);
							setModalData({
								teacherId: "Auto",
								fullName: "",
								phone: "",
								gender: "",
								birthDate: getCurDateForSelectUi(),
								placeOfOrigin: "",
								email: ""

							})
						}}
					>thêm mới</Button>
				</div>

				<Table aria-label="Example table with dynamic content"
					selectionMode="single"
					color="secondary"
					className="w-full "
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
						{(column) => <TableColumn key={column.teacherId}>{column.label}</TableColumn>}
					</TableHeader>
					<TableBody items={items}>
						{(item) => (
							<TableRow key={item.teacherId}>
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
							<ModalHeader className="flex flex-col gap-1">{isNewItem ? "Thêm mới giáo viên" : "Chỉnh sửa thông tin giáo viên"}</ModalHeader>
							<ModalBody>
								<Input
									autoFocus
									label="Mã giáo viên"
									name="teacherId"
									value={modalData.teacherId}
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
									label="Email"
									name="email"
									value={modalData.email}
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
									label="Ngày sinh"
									name="birthDate"
									type="date"
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
