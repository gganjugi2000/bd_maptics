import React from 'react';
import { Link, withRouter } from "react-router-dom";

import styles from './SideMenu.module.css';
import classNames from 'classnames/bind';


const cx = classNames.bind(styles);

const dummyMenu = [
    {name: "Home", id: "0", url: "/"},
    {name: "Users", id: "1", url: "/users"},
    {name: "Products", id: "2", url: "/products"},
    {name: "Stats", id: "3", url: "/stats"},
    {name: "Test_axios", id: "4", url: "/axios_test"}
];


// 컴포넌트 정의
const SideMenu = () => {

    // render
    return (
        <div className={cx("side-body")}>
            <ul>
            {dummyMenu && dummyMenu.map((menuItem, i) => {
                console.log(menuItem)
                return (
                    // <li key={i} 
                    //     onClick={() => {
                    //         toLink(menuItem.url);
                    //     }}
                    // >
                    //     {menuItem.name}
                    <li key={i}>
                        <Link to={menuItem.url}>{menuItem.name}</Link>
                    </li>
                );
            })}
            </ul>
        </div>
    )
}

export default SideMenu;