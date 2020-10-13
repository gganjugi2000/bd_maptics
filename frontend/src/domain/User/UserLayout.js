import React from 'react';

import styles from './UserList.module.css';
import classNames from 'classnames/bind';

import UserListContainer from '../UserListContainer';
import { useHistory } from "react-router";

const cx = classNames.bind(styles);

// 컴포넌트 정의
const UserLayout = () => {

    const handleUserCreate = (e) => {
        const history = useHistory();
        console.log("------------------------------------");
        e.target.reset();
        history.push({
            pathname:  "/"
        });
    }

    // render
    return (
        <div styles={{magin: 200}}>
            <button 
                onClick={e => { 
                    handleUserCreate(e); 
                }} 
                >
                생성
            </button>
            <UserListContainer />
        </div>
    )
}

export default UserLayout;