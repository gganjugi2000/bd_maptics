import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectedMenu, leftSizeMenu } from 'store/modules/menuStore';
import { Link, withRouter } from "react-router-dom";
import styles from './Header.module.css';
import classNames from 'classnames/bind';
import slideMenu from '../../images/slide_menu.png';
import bgWoman from '../../images/bg_woman.png';

const cx = classNames.bind(styles);

// 컴포넌트 정의
const Header = () => {
    const dispatch = useDispatch();
    const leftSize = useSelector((state) => state.menuStore.leftSize);
    const [showSubMenu, setShowSubMenu] = useState(false);

    const handleSlideMenu = (e) => {
        if(leftSize === 0){
            dispatch(leftSizeMenu(260));
        } else {
            dispatch(leftSizeMenu(0));
        }
    }

    const handleMenuOver = (e) => {
        setShowSubMenu(true);
    }

    const handleMenuOut = (e) => {
        setShowSubMenu(false);
    }

    const handleSelectedMenu = (value) => {
        dispatch(selectedMenu(value));
    }

    // render
    return (
        <div className={cx("catetop")}>
            <h2 onMouseLeave={handleMenuOut} onMouseOverCapture={handleMenuOver} >
                <img src={slideMenu} alt="lnb영역 slide" onClick={(e) => handleSlideMenu(e)} /> 캠페인
                { showSubMenu ?
                    <div onMouseLeave={handleMenuOut}>
                        <ul>
                            <li><Link to="/advertiser" onClick={() => handleSelectedMenu('advertiser')}>광고주 관리</Link></li>
                            <li><Link to="/campaign" onClick={() => handleSelectedMenu('campaign')}>캠페인 관리</Link></li>
                        </ul>
                    </div> : null
                }
            </h2>
        </div>
    )
}

export default Header;