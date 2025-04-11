// import React, { FormEvent, useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
//
// const SachUpdate: React.FC = () => {
//     const { maDonHang } = useParams(); // Lấy mã sách từ URL
//     const navigate = useNavigate();
//
//     const [donHang, setDonHang] = useState({
//
//         maDonHang:0,
//         chiPhiGiaoHang:0,
//         chiPhiThanhToan:0,
//         diaChiMuaHang:'',
//         diaChiNhanHang:'',
//         tongTien:0,
//         tongTienSanPham:0,
//     });
//
//     // Gọi API lấy thông tin sách khi có maSach
//     useEffect(() => {
//         if (maDonHang) {
//             fetch(`http://localhost:8080/donhang/${maDonHang}`)
//                 .then(res => res.json())
//                 .then(data => setDonHang(data))
//                 .catch(err => console.error("Lỗi khi tải đơn hàng:", err));
//         }
//     }, [maDonHang]);
//
//     const handleSubmit = (event: FormEvent) => {
//         event.preventDefault();
//
//         const method = maDonHang ? 'PUT' : 'POST';
//         const url = maDonHang
//             ? `http://localhost:8080/donhang/${maDonHang}`
//             : 'http://localhost:8080/donhang';
//
//         fetch(url, {
//             method: method,
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(donHang),
//         }).then((response) => {
//             if (response.ok) {
//                 alert(maDonHang ? 'Cập nhật sách thành công!' : 'Thêm sách thành công!');
//                 navigate('/admin/'); // chuyển về danh sách sau khi lưu
//             } else {
//                 alert("Gặp lỗi trong quá trình lưu sách!");
//             }
//         });
//     };
//
//     return (
//         <div className='container row d-flex align-items-center justify-content-center'>
//             <div className=''>
//                 <h1>{maDonHang ? 'CẬP NHẬT ĐƠN HÀNG' : 'THÊM ĐƠN HÀNG'}</h1>
//                 <form onSubmit={handleSubmit} className='form'>
//
//                     <label htmlFor='chiPhiGiaoHang'>Chi Phí Giao Hàng</label>
//                     <input
//                         className='form-control'
//                         type='text'
//                         value={donHang.chiPhiGiaoHang}
//                         onChange={(e) => setDonHang({ ...donHang, chiPhiGiaoHang: e.target.value })}
//                         required
//                     />
//
//                     <label htmlFor='giaBan'>Giá bán</label>
//                     <input
//                         className='form-control'
//                         type='number'
//                         value={sach.giaBan}
//                         onChange={(e) => setSach({ ...sach, giaBan: parseFloat(e.target.value) })}
//                         required
//                     />
//
//                     <label htmlFor='giaNiemYet'>Giá niêm yết</label>
//                     <input
//                         className='form-control'
//                         type='number'
//                         value={sach.giaNiemYet}
//                         onChange={(e) => setSach({ ...sach, giaNiemYet: parseFloat(e.target.value) })}
//                         required
//                     />
//
//                     <label htmlFor='soLuong'>Số lượng</label>
//                     <input
//                         className='form-control'
//                         type='number'
//                         value={sach.soLuong}
//                         onChange={(e) => setSach({ ...sach, soLuong: parseInt(e.target.value) })}
//                         required
//                     />
//
//                     <label htmlFor='tenTacGia'>Tên tác giả</label>
//                     <input
//                         className='form-control'
//                         type='text'
//                         value={sach.tenTacGia}
//                         onChange={(e) => setSach({ ...sach, tenTacGia: e.target.value })}
//                         required
//                     />
//
//                     <label htmlFor='moTa'>Mô tả</label>
//                     <textarea
//                         className='form-control'
//                         value={sach.moTa}
//                         onChange={(e) => setSach({ ...sach, moTa: e.target.value })}
//                         required
//                     />
//
//                     <label htmlFor='isbn'>ISBN</label>
//                     <input
//                         className='form-control'
//                         type='text'
//                         value={sach.isbn}
//                         onChange={(e) => setSach({ ...sach, isbn: e.target.value })}
//                         required
//                     />
//
//                     <button type='submit' className='btn btn-success mt-2'>
//                         {maSach ? 'Cập nhật' : 'Lưu'}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };
//
// export default SachUpdate;
