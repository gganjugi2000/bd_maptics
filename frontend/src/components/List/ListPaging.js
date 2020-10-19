import React from 'react';
import { Link, withRouter } from "react-router-dom";
import styles from './ListPaging.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const pagingData = [
    {name: "Users", id: "0", url: ""},
    {name: "Users", id: "0", url: ""},
    {name: "Users", id: "0", url: ""},
    {name: "Users", id: "0", url: ""},
    {name: "Users", id: "0", url: ""},
    {name: "Users", id: "0", url: ""},
    {name: "Users", id: "0", url: ""},
    {name: "Users", id: "0", url: ""},
    {name: "Users", id: "0", url: ""},
    {name: "Users", id: "0", url: ""}
];


// 컴포넌트 정의
const ListPaging = ({rowData}) => {

    // render
    return (
        <div className={cx("listPaging")}>
            <ul>
                <li className={cx("prev")}>&lt;&lt;</li>
                <li className={cx("prev")}>&lt;</li>
                    {rowData && rowData.map((menuItem, i) => {
                        return (
                            <li key={i}>
                            <Link to={menuItem.url}>{i + 1 }</Link>
                            </li>
                        );
                    })}
                <li className={cx("next")}>&gt;</li>
                <li className={cx("next")}>&gt;&gt;</li>
            </ul>
        </div>
    )
}

export default ListPaging;