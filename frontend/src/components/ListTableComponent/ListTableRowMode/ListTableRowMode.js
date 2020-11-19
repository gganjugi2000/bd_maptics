import React from 'react';
import styles from './ListTableRowMode.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ListTableRowMode = ({ handleTableRowMode }) => {
    const onChangeMode = (e) => {
        const limit = e.target.value;
        handleTableRowMode(parseInt(limit));
    }

    return (
        <div className={cx("listAmount")}>
            <select onChange={onChangeMode}>
                <option value='10'>10개</option>
                <option value='20'>20개</option>
                <option value='40'>40개</option>
                <option value='80'>80개</option>
                <option value='100'>100개</option>
            </select>
        </div>
    )
}

export default ListTableRowMode;