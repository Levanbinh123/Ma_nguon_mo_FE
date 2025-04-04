import React, {ChangeEvent, useState} from "react";
import { Link } from "react-router-dom";
interface NavbarADProps{
    tuKhoaTimKiem: string;
    setTuKhoaTimKiem: (tuKhoa: string) => void;
}
function NavBarAD ({tuKhoaTimKiem, setTuKhoaTimKiem}:NavbarADProps) {
const [tuKhoaTamThoi,setTuKhoaTamThoi]=useState('');
    const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>)=>{
        setTuKhoaTamThoi(e.target.value);
    }

    const handleSearch=()=>{
    setTuKhoaTimKiem(tuKhoaTamThoi);
    }
    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
            <div className="container-fluid">

                <Link className="navbar-brand" to={"/"}>
                    SBR Demo
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to={"/view-students"}>
                                View All Students
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/add-students"}>
                                Add New Students
                            </Link>

                        </li>
                        {/* Tìm kiếm */}
                        <div className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Tìm kiếm" aria-label="Search" onChange={onSearchInputChange} value={tuKhoaTamThoi} />
                            <button className="btn btn-outline-success" type="button" onClick={handleSearch}>Tìm kiếm</button>
                        </div>

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBarAD;
