import React, { useState } from 'react';
import { Link, withRouter } from "react-router-dom";

import styles from './SideMenu.module.css';
import classNames from 'classnames/bind';
import imageLogo from '../../images/ats_sambol.png';
import btnLogout from '../../images/btn_logout.png';
import manPic from '../../images/man_photo.png';


const cx = classNames.bind(styles);

const dummyMenu = [
    {name: "Home", id: "0", url: "/"},
    {name: "Users", id: "1", url: "/users"},
    {name: "Products", id: "2", url: "/products"},
    {name: "Stats", id: "3", url: "/stats"},
    {name: "Test_axios", id: "4", url: "/axios_test"},
    {name: "List", id: "3", url: "/List"},
    {name: "Sample", id: "90", url: "/Sample"},
    {name: "Advertiser Management", id: "90", url: "/advertiser"}
];


// 컴포넌트 정의
const SideMenu = ({leftSize}) => {
    const [selectedMenu, setSelectedMenu] = useState("");

    // // life cycle
    // useEffect(() => {
        
    // }, []) // page loading 

    // <div className={cx("logo")}>
    //     <Link to={"main.html"}><img src={imageLogo} alt="ATS2.0 Admin Sambol" /> Maptics Admin</Link>
    // </div>
    // <li className={cx("mb20")}><Link to="/campaign">캠페인 관리</Link></li>
    //                         <p className={cx("mb20")}>- 캠페인 관리</p>
    //                         <p className={cx("mb20")}>- 예약 관리</p>
    //                         <p>- 히스토리</p>
    // render

    const handleSelectMenu = (value) => {
        setSelectedMenu(value);
    }

    return (
        <div className={cx("lnbarea")} style={{'transform': `translate3d(${leftSize === 260 ? '0' : '-260px'}, 0, 0)`}}>
            <div className={cx("logo")}>
                <Link to={"/"}><img src={imageLogo} alt="" /> Maptics Admin</Link>
            </div>
            <div className={cx("myInFo")}>
                <img src={manPic} alt="성별:남자 로그인 후 이미지" />
                    <div className={cx("profile")}>
                        <ul>
                            <li className={cx("logouT")}><img src={btnLogout} alt="log out" /></li>
                            <li className={cx("mt10")}><span>Maptics Master 님</span></li>
                            <li><span className={cx("term")}>전략 사업팀</span></li>
                        </ul>
                    </div>
                    <div className={cx("lnbm", "mt30")}>
                        <ul>
                            <li className={cx("mb20")}><Link to="/advertiser" onClick={(e) => { handleSelectMenu('advertiser'); }}><span className={selectedMenu === "" || selectedMenu === 'advertiser' ? cx("current") : cx("mb20")}>광고주 관리</span></Link></li>
                            <li className={cx("mb20")}><Link to="/campaign" onClick={(e) => { handleSelectMenu('campaign'); }}><span className={selectedMenu === 'campaign' ? cx("current") : cx("mb20")}>캠페인 관리</span></Link></li>
                        </ul>
                    </div>
            </div>
        </div>
    )
}

export default SideMenu;