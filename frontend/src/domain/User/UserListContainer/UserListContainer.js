import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { listCompanyUser } from 'store/modules/userStore';
import { useHistory } from "react-router";
import UserList from '../UserList';


// 컨테이너 정의
const UserListContainer = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const { userList, totalCount } = useSelector((state) => state.userStore);
    console.log("UserListContainer")
    // state 정의

    // life cycle
    useEffect(() => {
        // 데이터 불러오기
        dispatch(listCompanyUser({cur:1, page_size:10}));
    }, []) // page loading 
    
    const handleUserCreate = (e) => {
        history.push({
            pathname:  "/users/create"
        });
    }

    // 사용자 정보 데이터 조회(페이지) 항목
    const handleUserDispatch = (obj) => {
        // nowPage : 현재 페이지
        // limit : 테이블에서 보여질 수
        dispatch(listCompanyUser(obj));
    };

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
            <UserList 
                rowData={userList} 
                totalCount={totalCount}
                handleUserDispatch={handleUserDispatch}
            />
        </>
    )
}

export default UserListContainer;