import React from 'react';

import styles from './UserList.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);


// 컴포넌트 정의
const UserList = ({ userList }) => {
    console.log("UserList ===============================");
    console.log(userList);
    console.log("UserList end ===========================");

    // render
    return (
        <div styles={{margin: 200}}>
            {userList ? userList.map((userItem, i) => {
                console.log(userItem);
                return (
                    <div key={i}>
                        <div>
                            {userItem.user_id}
                        </div>
                        <div>
                            {userItem.user_name}
                        </div>
                    </div>
                    
                );
            }) : "List Empty" }
        </div>
    )
}

export default UserList;