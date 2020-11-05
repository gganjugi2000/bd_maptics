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
            <h2 onClick={handleSlideMenu} onMouseLeave={handleMenuOut} onMouseOverCapture={handleMenuOver} ><img src={slideMenu} alt="lnb영역 slide" /> 캠페인 관리
            { showSubMenu ?
                <div onMouseLeave={handleMenuOut}>
                    <ul>
                        <li>캠페인 관리 서브1</li>
                        <li>캠페인 관리 서브2</li>
                        <li>캠페인 관리 서브3</li>
                        <li>캠페인 관리 서브4</li>
                        <li>캠페인 관리 서브5</li>
                        <li>캠페인 관리 서브6</li>
                        <li>캠페인 관리 서브7</li>
                    </ul>
                </div> : null
            }
            </h2>
            <h3>예약 관리</h3>
            <h3>히스토리</h3>
            <span className={cx("main_visual")}><img src={bgWoman} alt="일러스트 그림" /></span>
            <div className={cx("catetop_box")}>
                <span>Welcome Target Insight</span>
                <p>서비스/상품별 캠페인 집행 내역과 리포트를 조회합니다. </p>
                <p>고객사/Corp ID, Group ID, 캠페인명 등을 검색 바에 입력하시면, 해당 관련 내역이 보여집니다.</p>
            </div>
        </div>
    )
}

export default Header;