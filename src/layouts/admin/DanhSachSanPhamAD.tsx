import React, { useEffect, useState } from "react";
import SachModel from "../../models/sachModel";
import {laySachTheoMaSach, layToanBoSach, timKiemSach} from "../../API/sachAPI";
import { error } from "console";
import { PhanTrang} from "../Utils/PhanTrang";
import {NavLink} from "react-router-dom";
interface DanhSachSanPhamProps {
    tuKhoaTimKiem: string;
    maTheLoai:number;

}

function DanhSachSanPhamAD({ tuKhoaTimKiem ,maTheLoai}: DanhSachSanPhamProps) {

    const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);
    const [trangHienTai, setTrangHienTai] = useState(1);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [tongSoSach, setSoSach] = useState(0);

    useEffect(() => {
        if (tuKhoaTimKiem === '' &&maTheLoai==0 ) {
            layToanBoSach(trangHienTai - 1).then(
                kq => {
                    setDanhSachQuyenSach(kq.ketQua);
                    setTongSoTrang(kq.tongSoTrang);
                    setDangTaiDuLieu(false);
                }
            ).catch(
                error => {
                    setDangTaiDuLieu(false);
                    setBaoLoi(error.message);
                }
            );
        }else{
            timKiemSach(tuKhoaTimKiem,maTheLoai).then(
                kq => {
                    setDanhSachQuyenSach(kq.ketQua);
                    setTongSoTrang(kq.tongSoTrang);
                    setDangTaiDuLieu(false);
                }
            ).catch(
                error => {
                    setDangTaiDuLieu(false);
                    setBaoLoi(error.message);
                }
            );
        }
    }, [trangHienTai, tuKhoaTimKiem,maTheLoai]);

    const phanTrang = (trang: number) => {
        setTrangHienTai(trang);
    };

    //console.log(trangHienTai);

    if (dangTaiDuLieu) {
        return (
            <div>
                <h1>Đang tải dữ liệu</h1>
            </div>
        );
    }

    if (baoLoi) {
        return (
            <div>
                <h1>Gặp lỗi: {baoLoi}</h1>
            </div>
        );
    }


    if(danhSachQuyenSach.length===0){
        return (
            <div className="container">
                <div className="d-flex align-items-center justify-content-center">
                    <h1>Hiện không tìm thấy sách theo yêu cầu!</h1>
                </div>
            </div>
        );
    }
    return (
        <section>
            {/*<Search*/}
            {/*    search={search}*/}
            {/*    setSearch={setSearch}*/}
            {/*/>*/}
            <table className="table table-bordered table-hover shadow">
                <thead>
                <tr className="text-center">
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Depatment</th>
                    <th colSpan={3} >Actions</th>
                </tr>
                </thead>

                <tbody className="text-center">
                {danhSachQuyenSach

                    .map((sach) => (
                        <tr key={sach.maSach}>
                            <td>{sach.tenSach}</td>
                            <td>{sach.moTa}</td>
                            <td>{sach.moTa}</td>
                            <td>{sach.giaNiemYet}</td>
                            <td className="mx-2">
                                <NavLink
                                    to={`/admin/sach/${sach.maSach}`}
                                    className="btn btn-warning">
                                    <i className="fa-solid fa-memo-circle-info"></i>

                                </NavLink>
                            </td>
                            <td className="mx-2">
                                {/*<button*/}
                                {/*    className="btn btn-danger"*/}
                                {/*    onClick={() =>*/}
                                {/*        handleDelete(donHang.maDonHang)*/}
                                {/*    }>*/}

                                {/*</button>*/}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <PhanTrang trangHienTai={trangHienTai} tongSoTrang={tongSoTrang} phanTrang={phanTrang} />
        </section>
    );
}

export default DanhSachSanPhamAD;