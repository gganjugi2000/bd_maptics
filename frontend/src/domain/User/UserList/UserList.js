import React from 'react';
import { Link } from 'react-router-dom';
import styles from './UserList.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);


// 컴포넌트 정의
const UserList = ({ userList }) => {
    // render
    return (
        <div styles={{margin: 200}}>
            {userList ? userList.map((userItem, i) => {
                console.log(userItem);
                return (
                    <div key={i}>
                        <div>
                            <Link to={`/users/${userItem.id}`}>
                            {userItem.user_id}
                            </Link>
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