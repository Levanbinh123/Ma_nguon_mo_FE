class DonHangModel{
    maDonHang:number;
    chiPhiGiaoHang?:number;
    chiPhiThanhToan?:number;
    diaChiMuaHang?:String;
    diaChiNhanHang?:String;
    ngayTao?:Date;
    tongTien?:number;
    tongTienSanPham?:number;

constructor(

        maDonHang: number,
        chiPhiGiaoHang?: number,
        chiPhiThanhToan?: number,
        diaChiMuaHang?: String,
        diaChiNhanHang?: String,
        ngayTao?: Date,
        tongTien?: number,
        tongTienSanPham?: number,




) {
    this.maDonHang=maDonHang;
  this.chiPhiGiaoHang=chiPhiGiaoHang;
  this.chiPhiThanhToan=chiPhiThanhToan;
  this.diaChiMuaHang=diaChiMuaHang;
  this.diaChiNhanHang=diaChiNhanHang;
  this.ngayTao=ngayTao;
  this.tongTien=tongTien;
  this.tongTienSanPham=tongTienSanPham;

}
}
export  default DonHangModel;