class  NguoiDungModel{
    maNguoiDung:number;
    diaChiGiaoHang?:String;
    diaChiMuaHang?:String;
    email?:String;
    gioiTinh?:String;
    hoDem?:String;
    matKhau?:String;
    soDienThoai?:String;
    ten?:String;
    tenDangNhap?:String;
    avata?:String;
    constructor(
        maNguoiDung:number,
    diaChiGiaoHang?:String,
    diaChiMuaHang?:String,
    email?:String,
    gioiTinh?:String,
    hoDem?:String,
    matKhau?:String,
    soDienThoai?:String,
    ten?:String,
    tenDangNhap?:String,
    avata?:String,
    ) {
        this.maNguoiDung=maNguoiDung;
        this.diaChiGiaoHang=diaChiGiaoHang;
        this.diaChiMuaHang=diaChiMuaHang;
        this.email=email;
        this.gioiTinh=gioiTinh;
        this.hoDem=hoDem;
        this.matKhau=matKhau;
        this.soDienThoai=soDienThoai;
        this.ten=ten;
        this.tenDangNhap=tenDangNhap;
        this.avata=avata;
    }
}
export default NguoiDungModel;