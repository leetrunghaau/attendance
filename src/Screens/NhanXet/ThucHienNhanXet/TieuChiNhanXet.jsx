import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Table, Tag, Select, Button, Space, Popover, Form, InputNumber } from "antd";
import { SaveOutlined, RollbackOutlined, CodepenOutlined, PlusOutlined } from '@ant-design/icons';
import { showSuccessToast, showErrorToast } from '../../../Util/toast';
import Loading from '../../../Components/Common/Loading';
import { GetDanhMucDonVi } from "../../../Services/DanhMuc.service";
import { GetDanhSachTieuChiNhanXet, SaveNhanXet } from "../../../Services/NhanXet.service";
import { Checkbox } from "antd";
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../../../redux/actions/loadingAction';
import DrawArrayItem from "./Controls/DrawArrayItem";

import { CellStyle, ExportExcel } from '../../../Util/ExportExcel';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { saveAs } from 'file-saver';
import PizZipUtils from 'pizzip/utils/index.js';

const TYPE = { TUNHANXET: 1, NHANXETCHODONVI: 2 };



const TieuChiNhanXet = ({ type }) => {

    const dispatch = useDispatch();
    const { dotSelected } = useSelector(state => state.dmDot);
    const { details } = useSelector(state => state.login);
    const [defaultData, setDefaultData] = useState(); //list data
    const [listData, setListData] = useState([]); //list data

    const [originDataDonVi, setOriginDataDonVi] = useState(null);
    const [donViData, setDonViData] = useState();
    const [donViSelected, setDonViSelected] = useState("");
    const [hasUpdate, setHasUpdate] = useState(false);

    const updateDataInTreeUp = (data) => {
        data.forEach(item => {
            if (item.inverseParent.length > 0) {
                item.inverseParent = updateDataInTreeUp(item.inverseParent);
                item.canEdit = item.inverseParent.reduce((acc, obj) => acc + obj.canEdit, 0) > 0 ? 1 : 0;
            }
        });
        if (type == TYPE.NHANXETCHODONVI)
            data = data.filter(s => s.canEdit == 1);
        // console.log("AFTER LOOP==>", data);

        return data;
    }
    const generateData = (data) => {
        data.forEach(item => {
            if (item.inverseParent?.length <= 0) {
                item.canEdit = 0;
                if (type == TYPE.TUNHANXET) {
                    item.showAll = true;
                    if (item.nhanXetPhanCongs.length <= 0 && donViSelected == details.DonVi)
                        item.canEdit = 1;
                }
                else if (type == TYPE.NHANXETCHODONVI) {
                    item.showAll = false;
                    let find = item.nhanXetPhanCongs.find(x => x.maDv == details.DonVi);
                    if (find) {
                        item.canEdit = 1;
                    }
                }
            }
            else
                generateData(item.inverseParent)
        });
        return data;
    };

    const updateChange = (data, update) => {
        data.forEach(element => {
            if (element.id == update.id) {
                var find = element.nhanXetKetQuas.find(x => x.idDonViDanhGia == update.idDonViDanhGia)
                if (!find) {
                    find = {
                        idTieuChi: update.id,
                        idDonViDuocDanhGia: donViSelected,
                        idDonViDanhGia: update.idDonViDanhGia,
                        noiDung: update.noiDung,
                        isUpdate: true
                    }
                    element.nhanXetKetQuas.push(find);
                }
                else {
                    find.isUpdate = true;
                    find.noiDung = update.noiDung;
                }

                return;
            }
            if (element.inverseParent) updateChange(element.inverseParent, update);
        });
    }

    const prepareDataForSave = (data, dataForSave) => {
        data.forEach(element => {
            element.nhanXetKetQuas?.forEach(nhanxet => {
                if (nhanxet.isUpdate == true) {
                    dataForSave.push(nhanxet);
                }
            });
            if (element.inverseParent) prepareDataForSave(element.inverseParent, dataForSave);
        });
    }



    useEffect(() => {
        loadDanhMucDonVi();
    }, []);

    useEffect(async () => {
        loadDataTieuChi();
    }, [donViSelected, dotSelected])

    useEffect(() => {
        if (defaultData) {
            initData();
        }
    }, [defaultData]);

    useEffect(() => {
        if (originDataDonVi) {
            console.log("DATA DON VI==>", originDataDonVi);
            let tempData = [];

            originDataDonVi.forEach(element => {
                if (element.khoiId == 1 && (((type == TYPE.TUNHANXET && details.DonVi == element.maDv)
                    || type == TYPE.NHANXETCHODONVI) || details.Role == "ADMIN")

                ) {
                    let item = { value: element.maDv, label: element.maDv + ' - ' + element.ten };
                    tempData.push(item);
                }
            });
            setDonViData(tempData);
        }
    }, [originDataDonVi]);

    const loadDataTieuChi = async () => {
        if (donViSelected && dotSelected) {
            dispatch(showLoading());
            let result = await GetDanhSachTieuChiNhanXet({ maDv: donViSelected, idDot: dotSelected.id, idKhoi: 1 });
            console.log("AFTER CALL API==>", result);
            if (result.status == "Ok") {
                setDefaultData(result.data)
            }
        } else {
            setDefaultData([])
        }
        dispatch(hideLoading());
    }

    const initData = () => {
        var data = generateData(_.cloneDeep(defaultData));
        var temp = updateDataInTreeUp(data);
        console.log("DATA GENERATE====>", data);

        setListData(temp);
    }

    const loadDanhMucDonVi = async () => {
        let result = await GetDanhMucDonVi();
        if (result.status != 'Ok') {
            setOriginDataDonVi([]);
            return;
        }
        else {

            setOriginDataDonVi(result.data);
        }
    }




    const handleChange = (val) => {
        console.log("HANDLE CHANGE VALUE==>", val);
        setHasUpdate(true);
        var temp = _.cloneDeep(listData);
        updateChange(temp, val);
        console.log("AFTER HANDLE CHANGE VALUE==>", temp);
        setListData(temp);
    }

    const Luu = async () => {
        dispatch(showLoading());
        var dataForSave = [];
        prepareDataForSave(listData, dataForSave);
        let result = await SaveNhanXet(dataForSave);
        if (result.status == "Ok") {
            showSuccessToast("Lưu thành công");
            setHasUpdate(false);
        }
        else
            showErrorToast(result.message);
        dispatch(hideLoading());
    }

    const xuatWord = async () => {
        const htmlContent = "<p>Your HTML content here</p>";
        const zip = new PizZip(htmlContent);
        const doc = new Docxtemplater();
        doc.loadZip(zip);

        const generatedDoc = doc.getZip().generate({ type: 'blob' });
        saveAs(generatedDoc, 'document.docx');

    };
    function formatDataForWord(dataInput) {
        return dataInput.map(item => {
            let rs = {
                B: (item.idContentDisplay == 'TITLE_TIEUCHI' || item.idContentDisplay == 'TITLE') ? true : false,
                b: (item.idContentDisplay == 'TITLE_TIEUCHI' || item.idContentDisplay == 'TITLE') ? false : true,
                n: `${item.stt} ${item.ten} `,
                v: (item.idContentDisplay != 'TITLE_TIEUCHI' && item.nhanXetKetQuas.length != 0) ? item.nhanXetKetQuas[0].noiDung : ""
            }
            if (item.idContentDisplay == 'TITLE_TIEUCHI') {
                let indexForMap = 0;
                rs.c = item.nhanXetKetQuas.map(sItem => {
                    indexForMap++;
                    return {
                        B: true,
                        b: false,
                        n: `${String(indexForMap)}. ${sItem.idDonViDanhGiaNavigation.ten}`,
                        v: "\n" + sItem.noiDung,
                        l: false,
                        c: []
                    }
                })
                rs.l = indexForMap == 0 ? false : true;
            } else if (item.inverseParent.length !== 0) {
                rs.l = true;
                rs.c = formatDataForWord(item.inverseParent);
            } else {
                rs.l = false;
            }
            return rs;
        });
    }
    const getFileName = () => {
        const donvi = originDataDonVi.find(item => item.maDv == donViSelected);
        const fileName = "NhanXet_" + _.upperFirst(_.camelCase(donvi.ten)) + ".docx"
        return fileName;
    }
    function loadFile(url, callback) {
        PizZipUtils.getBinaryContent(url, callback);
    }
    const generateDocument = () => {
        if (donViSelected) {
            loadFile(
                '/docx/nhanXetTemplate.docx',
                function (error, content) {
                    const wordData = formatDataForWord(listData)
                    console.log("don vi data: ", donViData);
                    console.log("don vi select: ", donViSelected)
                    if (error) {
                        throw error;
                    }
                    var zip = new PizZip(content);
                    var doc = new Docxtemplater(zip, {
                        paragraphLoop: true,
                        linebreaks: true,
                    });
                    doc.setData({
                        nhanXet: wordData
                    });
                    try {
                        doc.render();
                    } catch (error) {
                        function replaceErrors(key, value) {
                            if (value instanceof Error) {
                                return Object.getOwnPropertyNames(value).reduce(function (
                                    error,
                                    key
                                ) {
                                    error[key] = value[key];
                                    return error;
                                },
                                    {});
                            }
                            return value;
                        }
                        console.log(JSON.stringify({ error: error }, replaceErrors));

                        if (error.properties && error.properties.errors instanceof Array) {
                            const errorMessages = error.properties.errors
                                .map(function (error) {
                                    return error.properties.explanation;
                                })
                                .join('\n');
                            console.log('errorMessages', errorMessages);
                        }
                        throw error;
                    }
                    var out = doc.getZip().generate({
                        type: 'blob',
                        mimeType:
                            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    });
                    saveAs(out, getFileName());
                }
            );
        }

    };

    return (
        <>
            <Fragment>
                <Row style={{}}>
                    <Col span={8}>
                        <div style={{ display: 'block' }}>
                            <div style={{ alignSelf: 'center', fontWeight: 'bold', marginRight: 5 }}>{"Tiêu chí của đơn vị"}</div>
                            <div>
                                <Select style={{ width: '100%' }}

                                    showSearch
                                    placeholder="Nhập để tìm kiếm..."
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={donViData}
                                    onChange={(val) => { setDonViSelected(val) }}
                                    className="js-example-basic-single col-sm-12"
                                />
                            </div>
                        </div>
                    </Col>
                    <Col span={16} style={{ paddingTop: 20 }}>
                        <Space style={{ float: 'right' }}>
                            {
                                hasUpdate &&
                                <Button type="primary" className='d-block mb-2 pull-right' icon={<SaveOutlined />} onClick={() => Luu()}>
                                    Lưu
                                </Button>
                            }
                            <Button type="primary" className='d-block mb-2 pull-right' htmlType="button" icon={<SaveOutlined />} onClick={() => generateDocument()}>
                                Xuất word
                            </Button>
                        </Space>

                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <DrawArrayItem data={listData} onChange={(val) => handleChange(val)} level={-1} />
                    </Col>
                </Row>

            </Fragment>

        </>
    );

};
export default TieuChiNhanXet;
