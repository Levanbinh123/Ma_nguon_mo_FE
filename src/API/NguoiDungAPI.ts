import React    from "react";
import NguoiDungModel from "../models/NguoiDungModel";
async function request(duongDan:string){
    //truy van den duong ddan
    const response=await fetch(duongDan);
    if(!response.ok){
        throw new Error(`khong the truy cap: ${duongDan}`);
    }
    return response.json();
}
