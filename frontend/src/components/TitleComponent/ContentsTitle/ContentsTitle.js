import React from 'react';
import classNames from 'classnames/bind';
import styles from './ContentsTitle.module.css';

const cx = classNames.bind(styles);

const ContentsTitle = ({
    title
    }) => {
        const titleLabel = title === null || title === undefined ? null : title;
        return (
            <div className={cx("notiTop")}>
                <h2>{titleLabel}</h2>
            </div>
        );
}

export default ContentsTitle;