import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { listCompanyUser } from 'store/modules/userStore';
import { useHistory } from "react-router";
import UserList from '../UserList'


// 컨테이너 정의
const UserListContainer = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    // state 정의
    // const [userList, setUserList] = useState([]);

    // life cycle
    useEffect(() => {
        // 데이터 불러오기
        let userListAction = dispatch(listCompanyUser());
        console.log("UserListContainer userListAction ===============================");
        console.log(userListAction);
        // setUserList(data);
        console.log("UserListContainer userListAction end ===========================");
    }, [dispatch]) // page loading 
    const userList = useSelector((state) => state.userStore.userList);
    const stateCheck = useSelector(state => state);
    console.log("useSelector call ---");
    console.log(userList)
    console.log("stateCheck -------------------")
    console.log(stateCheck)
    console.log("-------------------")

    const handleUserCreate = (e) => {
        console.log("------------------------------------");
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