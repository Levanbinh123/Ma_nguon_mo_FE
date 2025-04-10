import React, {useEffect, useState} from "react";

import {error} from "console";
import {Carousel} from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {lay1AnhCuaMotSach, layToanBoAnhCuaMotSach} from "../../API/hinhAnhAPI";
import hinhAnhModel from "../../models/hinhAnhModel"; // Import CSS cho carousel
interface HinhAnhSanPham{
    maSach:number;
}
const Avata:React.FC<HinhAnhSanPham>=(props)=>{
    const maSach:number=props.maSach;
    const [avata, setAvata] = useState<hinhAnhModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);

    useEffect(() => {
        lay1AnhCuaMotSach(maSach).then(
            danhSach=>{
                setAvata(danhSach);

                setDangTaiDuLieu(false);
            }
        ).catch(

            error=>{
                setDangTaiDuLieu(false);
                setBaoLoi(error.message);
            }

        );
    }, [])
    if(dangTaiDuLieu){
        return (
            <div>
                <h1>dang tai du lieu</h1>
            </div>
        );
    }if(baoLoi){
        return (
            <div>
                <h1>gap loi</h1>
            </div>
        );
    }
    return (
        <div className="row">
            <div className="col-12">

                    {
                        avata.map((hinhAnh, index)=>(
                            <div key={index}>
                                <img src={hinhAnh.duLieuAnh} alt={`${hinhAnh.tenHinhAnh}`} style={{maxWidth:"50px"}} />
                            </div>
                        ))
                    }

            </div>
        </div>
    );
}
export default Avata;