export const BASE_URL = "http://localhost:5000"; //LOCAL
//export const BASE_URL = "http://172.30.58.231:5000"; //LOCAL
//export const BASE_URL = "http://10.137.121.34/QRCodeVTTB"; //DEBUG
//export const BASE_URL = "https://scl-api.hcmpc.com.vn"; //PRODUCTION
//export const BASE_URL = "https://vttb-api.hcmpc.com.vn"; //PRODUCTION

export const URL_API = {
  LOGIN: {
    GET_TOKEN: BASE_URL + "/api/Authenticate/getToken",
  },
  DANHMUC: {
    GET_DANHMUC_DONVI: BASE_URL + "/api/DanhMuc/getDMDonVi",
    GET_DANHMUC_KHOI: BASE_URL + "/api/DanhMuc/getDMKhoi",
    GET_DANHMUC_DOT: BASE_URL + "/api/DanhMuc/getDMDot",
    GET_DANHMUC_QUYEN: BASE_URL + "/api/DanhMuc/getDMQuyen", 
  },
  DOT: {
    GET_THOI_GIAN: BASE_URL + "/api/DanhGia/Dot/getThoiGian"
  },
  DMTIEUCHI:{
    GET_DANHMUC_TIEUCHI: BASE_URL + "/api/DanhGia/TieuChi/getDanhSachTieuChi",
    XOA_TIEUCHI: BASE_URL + "/api/DanhGia/TieuChi/xoaTieuChi",
    ADD_OR_UPDATE_TIEUCHI: BASE_URL + "/api/DanhGia/TieuChi/addOrUpdateTieuChi",
  },
  TIEUCHI_PHANCONG:{
    GET_DANHSACH_TIEUCHI_PHANCONG: BASE_URL + "/api/DanhGia/PhanCong/getDanhSachTieuChiPhanCong",
    LUU_TIEUCHI_PHANCONG: BASE_URL + "/api/DanhGia/PhanCong/luuPhanCong",

  },
  CHAM_DIEM:{
    GET_DANHSACH_TIEUCHI_CHAMDIEM: BASE_URL + "/api/DanhGia/ChamDiem/getDanhSachTieuChiChamDiem",
    SAVE_CHAM_DIEM: BASE_URL + "/api/DanhGia/ChamDiem/saveChamDiem",
  },
  NHAN_XET:{
    GET_DANHSACH_TIEUCHI_NHANXET: BASE_URL + "/api/NhanXet/ThucHien/getDanhSachTieuChiNhanXet",
    GET_TONG_HOP_NHANXET: BASE_URL + "/api/NhanXet/TongHop/getTongHopNhanXet",
    SAVE_NHAN_XET: BASE_URL + "/api/NhanXet/ThucHien/saveNhanXet",
  },
  PHANQUYEN: {
    //Danh mục 
    //User
    GET_DANH_SACH_USER: BASE_URL + '/api/User/getDanhSachUser',
    ADD_UPDATE_USER: BASE_URL + '/api/User/addOrUpdateUser',
    CHECK_USER_VALID: BASE_URL + '/api/User/checkUserValid',
   
    
  },
  LUU_FILE:{
    GET_DANH_SACH_LUU_FILE: BASE_URL + '/api/LuuFile/GetFiles',
    GET_DANH_SACH_THU_MUC: BASE_URL + '/api/LuuFile/GetThuMuc',
    THEM_THU_MUC: BASE_URL + '/api/LuuFile/NewFolder',
    XOA_FILES: BASE_URL + '/api/LuuFile/DeleteFiles',
    SUA_TEN_FILE: BASE_URL + '/api/LuuFile/RenameFile',
    UPLOAD_FILE: BASE_URL + '/api/LuuFile/UploadFile',
    GET_FULL_FILE: BASE_URL + '/api/LuuFile/GetAllFile',
    MOVE_FILES: BASE_URL + '/api/LuuFile/MoveFiles',
    DOWNLOAD_FILE: BASE_URL + '/api/LuuFile/Download'
  }

};
