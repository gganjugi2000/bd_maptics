import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { searchListAdvertiser } from 'store/modules/advertiserStore';
import AdvertiserSearchList from './AdvertiserSearchList/AdvertiserSearchList';
import SingleSearchBar from '../../../components/SearchBarComponent/SingleSearchBar/SingleSearchBar';

// 컨테이너 정의
const AdvertiserSearchContainer = ({ handleSearchAdvertiserCallback }) => {
    const dispatch = useDispatch();

    // state 정의
    const [pagingQuery, setPagingQuery] = useState({cur:1, page_size:5});
    const [searchQuery, setSearchQuery] = useState({});
    const { advertiserList, totalCount, searchCount } = useSelector((state) => state.advertiserStore);

    // life cycle
    useEffect(() => {
        // 데이터 불러오기
        dispatch(searchListAdvertiser(pagingQuery));
    }, []) // page loading 
    
 
    // 광고주 정보 데이터 조회(페이지) 항목
    const handleAdvertiserDispatch = (obj) => {
        // nowPage : 현재 페이지
        // limit : 테이블에서 보여질 수
        setPagingQuery(obj);
        dispatch(searchListAdvertiser(Object.assign(searchQuery, obj)));
    };

    // Search 
    const handleSearchAdvertiserDispatch = (obj) => {
        setSearchQuery(obj);
        // nowPage : 현재 페이지
        // limit : 테이블에서 보여질 수
        dispatch(searchListAdvertiser(Object.assign(obj, {cur:1, page_size:5})));
    };


    // render
    return (
        <>
            <SingleSearchBar
                searchLabel="광고주 검색"
                handleDispatch={handleSearchAdvertiserDispatch}
            />
            <AdvertiserSearchList 
                rowData={advertiserList} 
                totalCount={totalCount}
                searchCount={searchCount}
                handleAdvertiserDispatch={handleAdvertiserDispatch}
                handleAdvertiserCallback={handleSearchAdvertiserCallback}
            />            
        </>
    )
}

export default AdvertiserSearchContainer;