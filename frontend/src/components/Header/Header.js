import React, {useState} from 'react';
import { Link, withRouter } from "react-router-dom";
import styles from './Header.module.css';
import classNames from 'classnames/bind';
import slideMenu from '../../images/slide_menu.png';
import bgWoman from '../../images/bg_woman.png';

const cx = classNames.bind(styles);

// 컴포넌트 정의
const Header = ({setLeftSize, leftSize}) => {

    const [showSubMenu, setShowSubMenu] = useState(false)
    const handleSlideMenu = (e) => {
        setLeftSize()
    }

    const handleMenuOver = (e) => {
        if(leftSize === 0)
            setShowSubMenu(true)
    }

    const handleMenuOut = (e) => {
        setShowSubMenu(false)
    }

    // render
    return (
        <div className={cx("catetop")}>
            <h2 onClick={handleSlideMenu} onMouseLeave={handleMenuOut} onMouseOverCapture={handleMenuOver} >
                <img src={slideMenu} alt="lnb영역 slide" /> 캠페인 관리
            </h2>
        </div>
    )
}

export default Header;