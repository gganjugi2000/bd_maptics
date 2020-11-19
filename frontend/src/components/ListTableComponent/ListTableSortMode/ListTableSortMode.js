import React from 'react';
import styles from './ListTableSortMode.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ListTableSortMode = ({ handleTableSortMode }) => {
    const onChangeMode = (e) => {
        const sort = e.target.value;
        handleTableSortMode(sort);
    }

    return (
        <div className={cx("listAmount")}>
            <select onChange={onChangeMode}>
                <option value='desc'>등록일 내림차순</option>
                <option value='asc'>등록일 오름차순</option>
            </select>
        </div>
    )
}

export default ListTableSortMode;