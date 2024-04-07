import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { showHideFile,setData } from '../../redux/actions/showFileAction';
import {
    XemFileHoSo
  } from "../../Services/PhuongAnKyThuat.service";
  import { PlusOutlined,FileDoneOutlined,FilePdfOutlined,FileExcelOutlined,FileWordOutlined,FilePptOutlined,FileImageOutlined,FileUnknownOutlined  } from '@ant-design/icons';
  import { Button } from "antd";
import {TruncatedText} from "../../Util/Utils"
import { TRUNSCATE_TYPE } from "../../Util/define";
import { toast } from 'react-toastify';
import { showLoading, hideLoading } from '../../redux/actions/loadingAction';
const ListFile = (props) => {
    const dispatch = useDispatch();
  const {  showModal, FileBase64,Extension,FileName } = useSelector(state => state.showFile); //showFile nay nằm trong reducers/index

    const { listHoSo } = props;
  
    const loadData=async(data)=>{
        dispatch(showLoading());
        console.log("dataaaaaa",data);
        console.log("ID HO SO==>",data.id);
        let result = await XemFileHoSo(data.fileUrl);
        console.log("ID HO SO==>",result);
        if (result?.status === "Ok") {
        //   setBase64File(result.data);
        //   setExtension(data.hoSo.fileType);
        //   setFileName(data.hoSo.fileNameOrg);
            dispatch(setData({FileBase64:result.data,
            Extension:data.fileType,
            FileName:data.fileNameOrg}));
            if(data.fileType=="pdf" || data.fileType=="jpe" || data.fileType=="jpeg" || data.fileType=="jpg" || data.fileType=="gif" || data.fileType=="png"){
                dispatch(showHideFile(true));
            }
        }
        else
        {
            toast.error('Không load được file ' + result?.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 5000
            });
        }
        dispatch(hideLoading());
    }
    return (
        <>
            <ul>
                {
                    listHoSo?.map((item) => {
                        return (
                            <div>
                            <Button type="link" href="javascript:void(0)" onClick={()=>loadData(item)}
                            icon={item.fileType=="pdf"?<FilePdfOutlined />
                            :item.fileType=="xls" ||item.fileType=="xlsx" ?<FileExcelOutlined />
                            :item.fileType=="doc" ||item.fileType=="docx" ?<FileWordOutlined  />
                            :item.fileType=="ppt" ||item.fileType=="pptx" ?<FilePptOutlined    />
                            :item.fileType=="png" || item.fileType=="jpe" ||item.fileType=="jpeg" ||item.fileType=="jpg" ||item.fileType=="gif" ?<FileImageOutlined />
                            : <FileUnknownOutlined/>
                          } >{TruncatedText(item.fileNameOrg,TRUNSCATE_TYPE.MIDDLE,20)}</Button>
                          </div>
                            // <a>
                            //     <div onClick={()=>loadData(item)}>
                            //         {item.fileNameOrg}
                            //     </div>
                            // </a>
                        )
                    })
                }
            </ul>
        </>
    );
};

ListFile.propTypes = {
    listHoSo: PropTypes.array,
};

ListFile.defaultProps = {
    listHoSo: [],
};
export default ListFile;