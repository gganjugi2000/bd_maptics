import React from 'react';
import { Link, withRouter } from "react-router-dom";
import styles from './ListSearch.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const selectItem = [
    {name: "상품1", id: "0", value: "item1"},
    {name: "상품2", id: "1", value: "item2"},
    {name: "상품3", id: "2", value: "item3"},
    {name: "상품4", id: "3", value: "item4"}
];

const selectMenu = [
    {name: "제목", id: "0", value: "title"},
    {name: "내용", id: "1", value: "text"},
    {name: "작성자", id: "2", value: "author"},
    {name: "날짜", id: "3", value: "date"}
];


// 컴포넌트 정의
const ListSearch = () => {

    // render
    return (
        <div>
            <ul className={cx("listSearch")}>
                <li>
                    <select>
                        {selectItem && selectItem.map((menuItem, i) => {
                            return (
                                <option key={i} value={menuItem.value}>{menuItem.name}</option>
                            );
                        })}
                    </select>
                </li>
                <li>
                    <select>
                    {selectMenu && selectMenu.map((menuItem, i) => {
                        console.log(menuItem)
                        return (
                            <option key={i} value={menuItem.value}>{menuItem.name}</option>
                        );
                    })}
                    </select>
                </li>
                <li><input type="text" /></li>
                <li><button>검색</button></li>
            </ul>
        </div>
    )
}

export default ListSearch;