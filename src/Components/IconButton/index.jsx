










import React, { useEffect, useState } from "react";
// import CommonModal from '../UiKits/Modals/common/modal'
import SweetAlert from "sweetalert2";
import { Grey } from "../../Constant";
import { Button, Popover, Space } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { DivideCircle } from "react-feather";
import styles from './overideclass.css'

export const IconDelete = ({ callback, textContent }) => {
    // const [modal, setModal] = useState(false);
    const deleteItem = () => {
        SweetAlert.fire({
            title: 'Xác nhận?',
            text: textContent ? textContent : "Bạn có muốn xóa?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Không',
            reverseButtons: true,
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-secondary',
            }
        }).then((result) => {
            if (result.value) {
                callback();
            }
        });
    }
    return (
        <>
            <div
                className={'icon-button'}
                onClick={() => deleteItem()}
            >
                <i className={`icofont icofont-delete-alt icon-delete`}></i>
            </div>
            {/* <CommonModal isOpen={modal} title={"Xóa"} toggler={()=>setModal(!modal)} 
        actionConfirm={()=>callback()} >{textContent?textContent:"Bạn có muốn xóa?"}</CommonModal> */}
        </>

    )
}

export const IconEdit = ({ callback }) => {

    return (
        <>
            <div
                className={'icon-button'}
                onClick={callback}
            >
                <i className={`icofont icofont-ui-edit icon-edit`}></i>
            </div>
        </>

    )
}

export const IconThem = ({ callback }) => {

    return (
        <>
            <div
                className={'icon-button'}
                onClick={callback}
            >
                <i className={`icofont icofont-ui-add icon-edit`}></i>
            </div>
        </>

    )
}

export const IconMore = ({ listMenu }) => {
 
    const content = () => {
        return (
            <ul className="menuMore">
                {
                listMenu.map((item,index) => (
                    <li key={index}>
                        <a onClick={item.onClick}>
                        <Space>
                        {item.icon}
                        {item.title}
                        </Space>
                        </a>
                    </li>
                ))
                }
            </ul>
        )
    }
    return (
        <>
            <Popover content={content} trigger="hover" placement="bottomRight">
                <div
                    className={'icon-button'}
                >
                    <MoreOutlined />
                </div>
            </Popover>
        </>

    )
}

