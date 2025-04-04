import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import donHangModel from "../../models/donHangModel";
import {layDonHangTheoMaDonHang} from "../../API/DonHangAPI";


const ChiTietSanPhamAD: React.FC = () => {
    // Lấy mã sách từ URL
    const { maDonHang } = useParams();

    let maDonHangNumber = 0;
    try {
        maDonHangNumber = parseInt(maDonHang + '');
        if (Number.isNaN(maDonHangNumber))
            maDonHangNumber = 0;
    } catch (error) {
        maDonHangNumber = 0;
        console.error("Error", error);
    }

    // Khai báo
    const [donHang, setDonHang] = useState<donHangModel| null>(null);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);
    const [soLuong, setSoLuong] = useState(1);


    useEffect(() => {
        layDonHangTheoMaDonHang(maDonHangNumber)
                .then((donHang) => {
                        setDonHang(donHang);
                        setDangTaiDuLieu(false);
                    }
                )
                .catch((error) => {
                    setBaoLoi(error.message);
                    setDangTaiDuLieu(false);
                })
        }, [maDonHang]
    )

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

    if (!donHang) {
        return (
            <div>
                <h1>Sách không tồn tại!</h1>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row mt-4 mb-4">

                <div className="col-8">
                    <div className="row">
                        <div className="col-8">
                            <h1>{donHang.chiPhiGiaoHang}</h1>
                            <h1>{donHang.tongTien}</h1>


                            <hr/>
                            <hr/>
                        </div>
                        <div className="col-4">

                            <div className="row mt-4 mb-4">

                            </div>


                        </div>


                    </div>

                </div>
                {/*review*/}


            </div>
        </div>
    );
}
export default ChiTietSanPhamAD;