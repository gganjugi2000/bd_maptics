import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router";
import CampaignSearchBar from '../../../components/SearchBarComponent/CampaignSearchBar/CampaignSearchBar';
import Button from '../../../components/ButtonComponent';

import { listCompanyUser } from 'store/modules/userStore';
import UserList from '../../User/UserList';

// 컨테이너 정의
const CampaignListContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [pagingQuery, setPagingQuery] = useState({cur:1, page_size:10});
    const [searchQuery, setSearchQuery] = useState({});
    const { userList, totalCount } = useSelector((state) => state.userStore);
    console.log("UserListContainer")
    // state 정의

    // life cycle
    useEffect(() => {
        // 데이터 불러오기
        dispatch(listCompanyUser(pagingQuery));
    }, []) // page loading 
    
    const handleUserCreate = (e) => {
        history.push({
            pathname:  "/users/create"
        });
    }

    // 사용자 정보 데이터 조회(페이지) 항목
    const handleUserDispatch = (obj) => {
        console.log("handleUserDispatch obj =================== ")
        console.log(obj)
        console.log("------------------------------------------------- ")
        // nowPage : 현재 페이지
        // limit : 테이블에서 보여질 수
        setPagingQuery(obj);
        dispatch(listCompanyUser(Object.assign(searchQuery, obj)));
    };

    // Search 
    const handleSearchUserDispatch = (obj) => {
        console.log("handleSearchUserDispatch obj =================== ")
        console.log(obj)
        console.log("------------------------------------------------- ")
        setSearchQuery(obj);
        // nowPage : 현재 페이지
        // limit : 테이블에서 보여질 수
        dispatch(listCompanyUser(Object.assign(obj, {cur:1, page_size:10})));
    };

    // render
    return (
        <>
            <CampaignSearchBar
                handleDispatch={handleSearchUserDispatch}
            />
            <div style={{display:'inline-block'}}>
                <Button
                    type="create"
                    onClick={e => { 
                        handleUserCreate(e); 
                    }}
                    >
                    생성
                </Button>
            </div>
            
            <UserList 
                rowData={userList} 
                totalCount={totalCount}
                handleUserDispatch={handleUserDispatch}
            />
            <div id="popup"></div>
        </>
    )
}

export default CampaignListContainer;