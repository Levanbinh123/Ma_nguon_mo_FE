import React from "react";
import donHangModel from "../models/donHangModel";
import DonHangModel from "../models/donHangModel";
import sachModel from "../models/sachModel";
interface KetQuaInterFace{
    ketQua:DonHangModel[];
    tongSoTrang:number;
    tongSoDonHang:number;
}
export async function my_request(duongDan: string) {
    // Truy cấn đến đường dẫn
    const response = await fetch(duongDan);

    // Nếu bị trả về lỗi
    if (!response.ok) {
        throw new Error(`Không thể truy cập ${duongDan}`);
    }

    // Nếu trả về OK
    return response.json();
}

export async function layDonHang(duongDan:any): Promise<KetQuaInterFace> {
    const ketQua: donHangModel[] = [];


    // Gọi phương thức request
    const response = await my_request(duongDan);

    // Lấy ra json sach
    const responseData = response._embedded.donHangs;
    console.log(responseData);
    // lấy thông tin trang
    const tongSoTrang:number = response.page.totalPages;
    const tongSoDonHang: number = response.page.totalElements;

    for (const key in responseData) {
        ketQua.push({
            maDonHang: responseData[key].maDonHang,
            chiPhiGiaoHang: responseData[key].chiPhiGiaoHang,
            chiPhiThanhToan: responseData[key].chiPhiThanhToan,
            diaChiMuaHang: responseData[key].diaChiMuaHang,
            diaChiNhanHang:responseData[key].diaChiNhanHang,
            ngayTao:responseData[key].ngayTao,
            tongTien:responseData[key].tongTien,
            tongTienSanPham:responseData[key].tongTienSanPham
        });
    }

    return {ketQua:ketQua,tongSoDonHang:tongSoTrang,tongSoTrang:tongSoTrang};
}
export async function layToanBoDonHang(trang:number):Promise<KetQuaInterFace>{
    // Xác định endpoint
    const duongDan: string = `http://localhost:8080/donhang?sort=maDonHang,desc&size=4&page=${trang}`;
return layDonHang(duongDan);
}
export async function timKiemDonHang(maDonHang:number): Promise<KetQuaInterFace> {

    // Xác định endpoint
    let duongDan: string = `http://localhost:8080/donhang?sort=maDonHang,desc&size=4&page=0`;
    if (maDonHang) {
        duongDan=`http://localhost:8080/donhang/${maDonHang}`
    }

    return layDonHang(duongDan);

}
export async function layDonHangTheoMaDonHang(maDonHang: number): Promise<donHangModel|null> {

    const duongDan = `http://localhost:8080/donhang/${maDonHang}`;

    let ketQua: donHangModel;

    try {
        // Gọi phương thức request
        const response =  await fetch(duongDan);

        if(!response.ok){
            throw new Error('Gặp lỗi trong quá trình gọi API lấy sách!')
        }

        const donHangData = await response.json();

        if(donHangData){
            return {
                maDonHang: donHangData.maDonHang,
                chiPhiGiaoHang: donHangData.chiPhiGiaoHang,
                chiPhiThanhToan: donHangData.chiPhiThanhToan,
                diaChiMuaHang: donHangData.diaChiMuaHang,
                diaChiNhanHang:donHangData.diaChiNhanHang,
                ngayTao:donHangData.ngayTao,
                tongTien:donHangData.tongTien,
                tongTienSanPham:donHangData.tongTienSanPham
            }
        }else{
            throw new Error('Sách không tồn tài!');
        }
    } catch (error) {
        console.error("Error", error);
        return null;
    }

}