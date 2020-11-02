import React, {useCallback} from 'react';
import { Link, withRouter } from "react-router-dom";
import styles from './Footer.module.css';
import classNames from 'classnames/bind';
import slideMenu from '../../images/slide_menu.png';
import bgWoman from '../../images/bg_woman.png';

const cx = classNames.bind(styles);

// 컴포넌트 정의
const Footer = () => {

    const handleSlidemenu = useCallback(
        (e) => {

        }, []
    )
    // render
    return (
        <div className={cx("footerWrap")}>
            <div className={cx("copy")}>
                <div className={cx("logo")}><span className="mr10">고객센터&nbsp;<strong>1544-9001</strong></span> <span className={cx("ml10")}>평일&nbsp;09:00 - 18:00</span></div>
                <div className={cx("footer")}>Copyright &copy; 2019 By <strong>SKTelecom</strong> Co, Ltd. All Rights Reserved.</div>
            </div>
        </div>
    )
}

export default Footer;