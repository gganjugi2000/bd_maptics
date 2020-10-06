import React from 'react';

import styles from './UserList.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const dummyUserList = [
    {name: "one", id: "0"},
    {name: "two", id: "1"},
    {name: "three", id: "2"}
];


// 컴포넌트 정의
const UserList = () => {

    // render
    return (
        <div styles={{magin: 200}}>
            {dummyUserList && dummyUserList.map((userItem, i) => {
                console.log(userItem)
                return (
                    <div key={i}>
                        {userItem.name}
                    </div>
                );
            })}
        </div>
    )
}

export default UserList;