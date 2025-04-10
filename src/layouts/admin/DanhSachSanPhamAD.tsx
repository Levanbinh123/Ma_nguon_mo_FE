import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import SachModel from "../../models/sachModel";
import {laySachTheoMaSach, layToanBoSach, timKiemSach} from "../../API/sachAPI";
import { error } from "console";
import { PhanTrang} from "../Utils/PhanTrang";
import {Link, NavLink} from "react-router-dom";
import {Search} from "react-bootstrap-icons";
import HinhAnhSanPham from "../products/components/hinhAnhSanPham";
import sachModel from "../../models/sachModel";
import {layToanBoAnhCuaMotSach} from "../../API/hinhAnhAPI";
import Avata from "./Avata";
interface DanhSachSanPhamProps {
    tuKhoaTimKiem: string;
    maTheLoai:number;
    setTuKhoaTimKiem: (tuKhoa: string) => void;

}


function DanhSachSanPhamAD({ tuKhoaTimKiem ,maTheLoai, setTuKhoaTimKiem}: DanhSachSanPhamProps) {
    const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);
    const [trangHienTai, setTrangHienTai] = useState(1);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [tongSoSach, setSoSach] = useState(0);
    const [anhDaiDien, setAnhDaiDien] = useState<string | null>(null);
    const [tuKhoaTamThoi,setTuKhoaTamThoi]=useState('');
    const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>)=>{
        setTuKhoaTamThoi(e.target.value);
    }

    const handleSearch=()=>{
        setTuKhoaTimKiem(tuKhoaTamThoi);
    }

//lay anh sach

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
    const handleDelete = (maSachCanXoa: number) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa sách này?")) return;

        fetch(`http://localhost:8080/sach/${maSachCanXoa}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    alert("Đã xóa sách thành công!");
                    // Cập nhật lại danh sách bằng cách reload hoặc refetch
                    setDanhSachQuyenSach(prev => prev.filter(sach => sach.maSach !== maSachCanXoa));
                } else {
                    alert("Gặp lỗi trong quá trình xóa sách!");
                }
            })
            .catch((error) => {
                console.error("Lỗi xóa sách:", error);
                alert("Lỗi kết nối tới server!");
            });
    };


    return (
        <section>

            <button>
                <Link
                    to={`/admin/them-sach`}
                    className="btn btn-warning">
                    <i className="fa-solid fa-memo-circle-info"></i>
                    Thêm sách

                </Link>
            </button>
            <div className="d-flex align-items-center gap-2" style={{ maxWidth: '400px' }}>
                <input
                    className="form-control"
                    type="search"
                    placeholder="Tìm kiếm"
                    aria-label="Search"
                    onChange={onSearchInputChange}
                    value={tuKhoaTamThoi}
                />
                <button className="btn btn-outline-success" type="button" onClick={handleSearch}>
                    <Search />
                </button>
            </div>
            {/*<Search*/}
            {/*    search={search}*/}
            {/*    setSearch={setSearch}*/}
            {/*/>*/}
            <table className="table table-bordered table-hover shadow">
                <thead>
                <tr className="text-center">

                    <th>Giá bán</th>
                    <th>Giá niêm yết</th>
                    <th>Mô tả</th>
                    <th>Số lượng</th>
                    <th>Tên sách</th>
                    <th>Tên tác giả</th>
                    <th>Trung bình xếp hạng</th>
                    <th>Hình ảnh</th>
                    <th colSpan={3} >Actions</th>
                </tr>
                </thead>

                <tbody className="text-center">
                {danhSachQuyenSach

                    .map((sach) => (
                        <tr key={sach.maSach}>
                            <td>{sach.giaBan}</td>
                            <td>{sach.giaNiemYet}</td>
                            <td>{sach.moTa}</td>
                            <td>{sach.soLuong}</td>
                            <td>{sach.tenSach}</td>
                            <td>{sach.tenTacGia}</td>
                            <td>{sach.trungBinhXepHang}</td>
                            <td>


                                 {/*///anhsach*/}
                                    <div className="col-4">
                                        <Avata maSach={sach.maSach}/>
                                    </div>




                            </td>
                            <td className="mx-2">

                                <button>
                                    <Link
                                        to={`/admin/sach/${sach.maSach}`}
                                        className="btn btn-warning">
                                        <i className="fa-solid fa-memo-circle-info"></i>
                                        Chi Tiết

                                    </Link>
                                </button>
                                <button>
                                    <Link
                                        to={`/admin/cap-nhat/${sach.maSach}`}
                                        className="btn btn-warning">
                                        <i className="fa-solid fa-memo-circle-info"></i>
                                        Cập nhật

                                    </Link>
                                </button>




                                <button
                                    type="button"
                                    className="btn btn-outline-danger"
                                    onClick={() => handleDelete(sach.maSach)}
                                >
                                    Xóa sách
                                </button>
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