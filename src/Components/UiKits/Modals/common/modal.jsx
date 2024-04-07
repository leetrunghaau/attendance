import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Close, SaveChanges } from '../../../../Constant';
import PropTypes from 'prop-types';
import { Button } from "antd";
import { SaveOutlined,CloseOutlined   } from '@ant-design/icons';
import { fi } from 'date-fns/locale';

const CommonModal = (props) => {
  const { isOpen, toggler, size, title, bodyClass, actionConfirm, showHeader, showFooter,fullScreen,showConfirm, zIndex,titleButtonConfirm } = props;
  return (
    <Modal isOpen={isOpen} toggle={toggler} size={size} centered
    fullscreen={fullScreen} backdrop="static" zIndex={zIndex ? zIndex: 'auto'}
    >
      {
        showHeader &&
        <ModalHeader toggle={toggler}>
          {title}
        </ModalHeader>
      }
      <ModalBody className={bodyClass}>
        {props.children}
      </ModalBody>
      {showFooter &&
        <ModalFooter>
          {/* <Btn attrBtn={{ color: 'secondary', onClick: toggler }} >Đóng</Btn>
          <Btn attrBtn={{ color: 'primary', onClick: actionConfirm }}>Đồng ý</Btn> */}
          {showConfirm &&
          <Button type="primary" htmlType="button" onClick={actionConfirm} icon={<SaveOutlined />}>
            {titleButtonConfirm}
          </Button>
            }
          <Button danger htmlType="button" onClick={toggler} icon={<CloseOutlined />}>
            Đóng
          </Button>
        </ModalFooter>
      }
    </Modal>
  );
};

CommonModal.propTypes = {
  isOpen: PropTypes.bool,
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool,
  showConfirm:PropTypes.bool,
  toggler: PropTypes.func,
  size: PropTypes.string,
  title: PropTypes.string,
  titleButtonConfirm: PropTypes.string,
  fullScreen:PropTypes.bool,
  bodyClass: PropTypes.string,
  actionConfirm: PropTypes.func,
  zIndex: PropTypes.string,
};

CommonModal.defaultProps = {
  isOpen: false,
  showHeader: true,
  showFooter: true,
  showConfirm:true,
  toggler: () => { },
  size: 'md',
  title: "",
  bodyClass: "",
  titleButtonConfirm:"Lưu",
  fullScreen:false,
  actionConfirm: () => { },
  zIndex: 'auto',
};

export default CommonModal;