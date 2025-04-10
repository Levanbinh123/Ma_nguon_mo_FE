import React, {useState} from "react";
import {useParams} from "react-router-dom";
import DanhSachSanPhamAD from "./DanhSachSanPhamAD";
interface ADHomePageProps{
    tuKhoaTimKiem:string,
    setTuKhoaTimKiem: (tuKhoa: string) => void;

}
function ADPage({tuKhoaTimKiem,setTuKhoaTimKiem}:ADHomePageProps){
    const {maTheLoai}=useParams();
    let maTheLoaiNumBer=0;

    try{
        maTheLoaiNumBer=parseInt(maTheLoai+'');

    }catch (error){
        maTheLoaiNumBer=0;
        console.log(error);
    }
    if(Number.isNaN(maTheLoaiNumBer))
        maTheLoaiNumBer=0;
    return(
        <div>
            <DanhSachSanPhamAD  tuKhoaTimKiem={tuKhoaTimKiem} maTheLoai={maTheLoaiNumBer} setTuKhoaTimKiem={setTuKhoaTimKiem}/>

        </div>
    );
}

export default ADPage;