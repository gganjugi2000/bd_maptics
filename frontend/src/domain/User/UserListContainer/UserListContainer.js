import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { listCompanyUser } from 'store/modules/userStore';
import { useHistory } from "react-router";
import UserList from '../UserList'


// 컨테이너 정의
const UserListContainer = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const userList = useSelector((state) => state.userStore.userList);
    console.log("UserListContainer")
    // state 정의
    // const [userList, setUserList] = useState([]);

    // life cycle
    useEffect(() => {
        // 데이터 불러오기
        dispatch(listCompanyUser());
    }, []) // page loading 
    
    const handleUserCreate = (e) => {
        // this.props.history.push("/users/create");
        history.push({
            pathname:  "/users/create"
        });
    }

    // render
    return (
        <>
            <button 
                onClick={e => { 
                    handleUserCreate(e); 
                }} 
                >
                생성
            </button>
        <UserList userList={userList} />
        </>
    )
}

export default UserListContainer;