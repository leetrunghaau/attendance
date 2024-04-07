import { toast } from 'react-toastify';
import {convertMessageToHTML} from './Utils'

export const showSuccessToast = (message) => {
    toast.success(convertMessageToHTML(message), {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        allowHtml: true
      });
};

export const showErrorToast = (message) => {
    toast.error(convertMessageToHTML(message), {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        allowHtml: true
      });
};

export const showWarningToast = (message) => {
    toast.warn(convertMessageToHTML(message), {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        allowHtml: true
      });
};