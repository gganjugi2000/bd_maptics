import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectedMenu } from 'store/modules/menuStore';
import styles from './SideMenu.module.css';
import classNames from 'classnames/bind';
import imageLogo from '../../images/ats_sambol.png';
import btnLogout from '../../images/btn_logout.png';
import manPic from '../../images/man_photo.png';


const cx = classNames.bind(styles);


// 컴포넌트 정의
const SideMenu = ({}) => {
    const dispatch = useDispatch();
    const selectMenu = useSelector((state) => state.menuStore.selectedMenu);
    const leftSize = useSelector((state) => state.menuStore.leftSize);

    const handleSelectMenu = (value) => {
        dispatch(selectedMenu(value));
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
                            <li className={cx("mb20", "title")}><span className={cx("current")}>캠페인</span></li>
                            <li className={cx("mb10")}><Link to="/advertiser" onClick={(e) => { handleSelectMenu('advertiser'); }}><span className={selectMenu === "" || selectMenu === 'advertiser' ? cx("current") : cx("mb20")}>&middot; 광고주 관리</span></Link></li>
                            <li className={cx("mb10")}><Link to="/campaign" onClick={(e) => { handleSelectMenu('campaign'); }}><span className={selectMenu === 'campaign' ? cx("current") : cx("mb20")}>&middot; 캠페인 관리</span></Link></li>
                        </ul>
                    </div>
            </div>
        </div>
    )
}

export default SideMenu;