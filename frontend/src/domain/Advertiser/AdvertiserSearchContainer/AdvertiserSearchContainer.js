import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { listCompanyUser } from 'store/modules/userStore';
import { useHistory } from "react-router";
import UserList from '../../User/UserList';
import AdvertiserSearchBar from '../../../components/SearchBarComponent/AdvertiserSearchBar/AdvertiserSearchBar';

// 컨테이너 정의
const AdvertiserSearchContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    // state 정의
    const [openCreate, setOpenCreate] = useState(false);
    const [pagingQuery, setPagingQuery] = useState({cur:1, page_size:20});
    const [searchQuery, setSearchQuery] = useState({});
    const { advertiserList, totalCount, searchCount } = useSelector((state) => state.advertiserStore);

    // life cycle
    useEffect(() => {
        // 데이터 불러오기
        dispatch(listAdvertiser(pagingQuery));
    }, []) // page loading 
    
    const handleCreatePopupOpen = (e) => {
        setOpenCreate(true);
    }

    // 광고주 정보 데이터 조회(페이지) 항목
    const handleAdvertiserDispatch = (obj) => {
        console.log("handleAdvertiserDispatch obj =================== ")
        console.log(obj)
        console.log("------------------------------------------------- ")
        // nowPage : 현재 페이지
        // limit : 테이블에서 보여질 수
        setPagingQuery(obj);
        dispatch(listAdvertiser(Object.assign(searchQuery, obj)));
    };

    // Search 
    const handleSearchAdvertiserDispatch = (obj) => {
        console.log("handleSearchAdvertiserDispatch obj =================== ")
        console.log(obj)
        console.log("------------------------------------------------- ")
        setSearchQuery(obj);
        // nowPage : 현재 페이지
        // limit : 테이블에서 보여질 수
        dispatch(listAdvertiser(Object.assign(obj, {cur:1, page_size:20})));
    };

    // render
    return (
        <>
            <AdvertiserSearchBar
                handleDispatch={handleSearchAdvertiserDispatch}
            />
            <div></div>
            <button 
                onClick={e => { 
                    handleUserCreate(e); 
                }} 
                >
                생성
            </button>
            <AdvertiserList 
                rowData={advertiserList} 
                totalCount={totalCount}
                searchCount={searchCount}
                handleAdvertiserDispatch={handleAdvertiserDispatch}
                handleAdvertiserCreate={handleCreatePopupOpen}
            />            
        </>
    )
}

export default AdvertiserSearchContainer;