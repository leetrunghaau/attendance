import { FunctionsID } from '../Constant/FunctionsID';
import DanhSachUser from '../Screens/PhanQuyen/User';
import DanhSachTieuChi from '../Screens/DanhMuc/DanhSachTieuChi';
import PhanCongDanhGia from '../Screens/DanhGia/PhanCongDanhGia';
import TuCham from '../Screens/ChamDiem/TuCham';
import ThamDinh from '../Screens/ChamDiem/ThamDinh';
import Dashboard from '../Screens/Dashboard';
import TuNhanXet from '../Screens/NhanXet/ThucHienNhanXet/TuNhanXet';
import NhanXetChoDonVi from '../Screens/NhanXet/ThucHienNhanXet/NhanXetChoDonVi';
import TongHopNhanXet from '../Screens/NhanXet/TongHopNhanXet';
import LuuFile from '../Screens/TongKet/LuuFile';

export const routesDanhGiaCanBo = [
  { path: `${process.env.PUBLIC_URL}/dashboard/default/:layout`, Component: <Dashboard /> },
  { ROLE:'ADMIN', path: `${process.env.PUBLIC_URL}/QuanTri/DanhSachUser/:layout`, Component: <DanhSachUser /> },
  { ROLE:'ADMIN', path: `${process.env.PUBLIC_URL}/DanhMuc/DanhSachTieuChi/:layout`, Component: <DanhSachTieuChi /> },
  { ROLE:'ADMIN', path: `${process.env.PUBLIC_URL}/DanhGia/PhanCongDanhGia/:layout`, Component: <PhanCongDanhGia /> },
  { ROLE:'ADMIN', path: `${process.env.PUBLIC_URL}/ChamDiem/TheoDoiChamDiem/:layout`, Component: <TuCham /> },
  { ROLE:'1', path: `${process.env.PUBLIC_URL}/ChamDiem/TuCham/:layout`, Component: <TuCham /> },
  { ROLE:'2', path: `${process.env.PUBLIC_URL}/ChamDiem/ChamThamDinh/:layout`, Component: <ThamDinh /> },
  { ROLE:'ADMIN', path: `${process.env.PUBLIC_URL}/NhanXet/TongHopNhanXet/:layout`, Component: <TongHopNhanXet /> },
  { ROLE:'ADMIN', path: `${process.env.PUBLIC_URL}/NhanXet/TheoDoiNhanXet/:layout`, Component: <TuNhanXet /> },
  { ROLE:'1', path: `${process.env.PUBLIC_URL}/NhanXet/TuNhanXet/:layout`, Component: <TuNhanXet /> },
  { ROLE:'2', path: `${process.env.PUBLIC_URL}/NhanXet/NhanXetChoDonVi/:layout`, Component: <NhanXetChoDonVi /> },
  {  path: `${process.env.PUBLIC_URL}/TongKet/LuuFile/:layout`, Component: <LuuFile /> },

];
  