import React, {ChangeEvent, useEffect, useState} from "react";
import { error } from "console";
import DonHangModel from "../../models/donHangModel";


import {layToanBoDonHang, timKiemDonHang} from "../../API/DonHangAPI";
import {PhanTrang} from "../Utils/PhanTrang";
import {timKiemSach} from "../../API/sachAPI";
import {Link, NavLink} from "react-router-dom";
interface DonHangProps {
    tuKhoaTimKiem: any;
    setTuKhoaTimKiem: (tuKhoa: any  ) => void;
}
function DanhSachSanPham({tuKhoaTimKiem,setTuKhoaTimKiem}:DonHangProps){


    const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>)=>{
        tuKhoaTimKiem(e.target.value);
    }

    const handleSearch= ()=>{
        setTuKhoaTimKiem(tuKhoaTimKiem);
    }
    const [danhSachDonHang, setDanhSachDonHang] = useState<DonHangModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);
    const [trangHienTai,setTrangHienTai]=useState(1);
    const [tongSoTrang,setTongSoTrang]=useState(0);
    const [tongSoDonHang,setTongSoDonHang]=useState(0);

    useEffect(() => {
        if(tuKhoaTimKiem===''){
            layToanBoDonHang(trangHienTai - 1).then(
                kq =>{
                    setDanhSachDonHang(kq.ketQua);
                    setTongSoTrang(kq.tongSoTrang);
                    setDangTaiDuLieu(false);
                }
            ).catch(
                error => {
                    setDangTaiDuLieu(false);
                    setBaoLoi(error.message);
                }
            );}
        else{
            timKiemDonHang(tuKhoaTimKiem).then(
                kq=>{
                    setDanhSachDonHang(kq.ketQua);
                    setTongSoTrang(kq.tongSoTrang);
                    setDangTaiDuLieu(false);
                }

            ).catch(
                error=>{
                    setDangTaiDuLieu(false);
                    setBaoLoi(error.message);
                }
            )
        }
        }, [trangHienTai,tuKhoaTimKiem]
        // Chi goi mot lan
    );
    const phanTrang=(trang:number)=>{
        setTrangHienTai(trang);
    }

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

    const handleDelete = (maDonHangCanXoa: number) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa sách này?")) return;

        fetch(`http://localhost:8080/donhang/${maDonHangCanXoa}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    alert("Đã xóa đơn hàng thành công!");
                    // Cập nhật lại danh sách bằng cách reload hoặc refetch
                    setDanhSachDonHang(prev => prev.filter(donHang => donHang.maDonHang !== maDonHangCanXoa));
                } else {
                    alert("Gặp lỗi trong quá trình xóa đơn hàng!");
                }
            })
            .catch((error) => {
                console.error("Lỗi xóa đơn hàng:", error);
                alert("Lỗi kết nối tới server!");
            });
    };
    return (
        <section>
            {/* Tìm kiếm */}

            <table className="table table-bordered table-hover shadow">
                <thead>
                <tr className="text-center">
                    <th>Chi phí giao hàng</th>
                    <th>Chi phí thanh toán</th>
                    <th>Địa chỉ mua hàng</th>
                    <th>Địa chỉ nhận hàng</th>
                    <th>Tổng tiền</th>
                    <th>Tổng tiền sản phẩm</th>
                    <th colSpan={3} >Actions</th>
                </tr>
                </thead>

                <tbody className="text-center">
                {danhSachDonHang

                    .map((donHang) => (
                        <tr key={donHang.maDonHang}>
                            <td>{donHang.chiPhiGiaoHang}</td>
                            <td>{donHang.chiPhiThanhToan}</td>
                            <td>{donHang.diaChiMuaHang}</td>
                            <td>{donHang.diaChiNhanHang}</td>
                            <td>{donHang.tongTien}</td>
                            <td>{donHang.tongTienSanPham}</td>


                            <td className="mx-2">

                                <button>
                                    <Link
                                        to={`/admin/sach/${donHang.maDonHang}`}
                                        className="btn btn-warning">
                                        <i className="fa-solid fa-memo-circle-info"></i>
                                        Chi Tiết

                                    </Link>
                                </button>
                                <button>
                                    <Link
                                        to={`/admin/cap-nhat/${donHang.maDonHang}`}
                                        className="btn btn-warning">
                                        <i className="fa-solid fa-memo-circle-info"></i>
                                        Cập nhật

                                    </Link>
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-danger"
                                    onClick={() => handleDelete(donHang.maDonHang)}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <PhanTrang trangHienTai={trangHienTai} tongSoTrang={tongSoTrang} phanTrang={phanTrang}/>
        </section>


    );
}

export default DanhSachSanPham;