import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./layouts/header-footer/NarBar";
import HomePage from "./layouts/homePage/hompage";
import About from "./layouts/about/About";
import ChiTietSanPham from "./layouts/products/chiTietSanPham";
import DangKyNguoiDung from "./layouts/nguoiDung/dangKyNguoiDung";
import KichHoatTaiKhoan from "./layouts/nguoiDung/kichHoatTaiKhoan";
import DangNhap from "./layouts/nguoiDung/dangNhap";
import Test from "./layouts/nguoiDung/text";
import SachForm from "./layouts/admin/sachForm";
import Footer from "./layouts/header-footer/Footer";
import ADPage from "./layouts/admin/ADPage";
import DanhSachDonHang from "./layouts/admin/danhSachDonHang";
import NavBarAD from "./layouts/admin/NarBarAD";
import DanhSachSanPhamAD from "./layouts/admin/DanhSachSanPhamAD";
import ChiTietSanPhamAD from "./layouts/admin/chiTietSanPhamAD";
import ChiTietDonHang from "./layouts/admin/chiTietDonHang";

function AppContent() {
    const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');
    const location = useLocation();  // Lấy đường dẫn hiện tại
    const isAdminPath = location.pathname.startsWith("/admin"); // Kiểm tra có phải trang admin không

    return (
        <div className='App'>

            {/*NavbarAdmin*/}
            {isAdminPath&&<NavBarAD tuKhoaTimKiem={tuKhoaTimKiem} setTuKhoaTimKiem={setTuKhoaTimKiem}/>}
            {/* Ẩn Navbar nếu là trang admin */}
            {!isAdminPath && <Navbar tuKhoaTimKiem={tuKhoaTimKiem} setTuKhoaTimKiem={setTuKhoaTimKiem} />}

            <Routes>
                <Route path='/' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
                <Route path='/:maTheLoai' element={<HomePage tuKhoaTimKiem={tuKhoaTimKiem} />} />
                <Route path='/about' element={<About />} />
                <Route path='/sach/:maSach' element={<ChiTietSanPham />} />
                <Route path='/dang-ky' element={<DangKyNguoiDung />} />
                <Route path='/kich-hoat/:email/:maKichHoat' element={<KichHoatTaiKhoan />} />
                <Route path='/dang-nhap' element={<DangNhap />} />
                <Route path='/test' element={<Test />} />

                {/* Trang admin */}

                <Route path='/admin' element={<ADPage tuKhoaTimKiem={tuKhoaTimKiem} />} />
                <Route path='/admin/them-sach' element={<SachForm />} />
                <Route path='/admin/sach/:maSach' element={<ChiTietSanPhamAD />} />
                <Route path='/admin/donhang' element={<DanhSachDonHang tuKhoaTimKiem={tuKhoaTimKiem} setTuKhoaTimKiem={setTuKhoaTimKiem} />} />
                <Route path='/admin/donHang/:maDonHang' element={<ChiTietDonHang />} />

            </Routes>

            {/* Ẩn Footer nếu là trang admin */}
            {!isAdminPath && <Footer />}
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}