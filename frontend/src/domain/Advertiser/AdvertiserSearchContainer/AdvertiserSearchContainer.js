import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router";
import { searchListAdvertiser } from 'store/modules/advertiserStore';
import AdvertiserList from '../AdvertiserListContainer/AdvertiserList';
import SingleSearchBar from '../../../components/SearchBarComponent/SingleSearchBar/SingleSearchBar';

// 컨테이너 정의
const AdvertiserSearchContainer = ({handleSearchAdvertiserCallback}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    // state 정의
    const [openCreate, setOpenCreate] = useState(false);
    const [pagingQuery, setPagingQuery] = useState({cur:1, page_size:10});
    const [searchQuery, setSearchQuery] = useState({});
    const { advertiserList, totalCount, searchCount } = useSelector((state) => state.advertiserStore);

    // life cycle
    useEffect(() => {
        // 데이터 불러오기
        dispatch(searchListAdvertiser(pagingQuery));
    }, []) // page loading 
    
    const handleCreatePopupOpen = (e) => {
        setOpenCreate(true);
    }

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

    const ColGroup = () => {
        return (
            <colgroup>
                <col width={"10%"} />
                <col width={"20%"} />
                <col width={"10%"} />
                <col width={"10%"} />
                <col width={"20%"} />
                <col width={"15%"} />
            </colgroup>
        )
    }

    const tableHead = [
        {id: "no",name: "번호" },
        {id: "advts_id", type: "callback", name: "아이디"},
        {id: "advts_nm",name: "광고주명"},
        {id: "advts_mng_nm",name: "담당자명"},
        {id: "email_addr",name: "이메일 계정"},
        {id: "phone_no",name: "연락처"},
    ];

    // render
    return (
        <>
            <SingleSearchBar
                searchLabel="광고주 검색"
                handleDispatch={handleSearchAdvertiserDispatch}
            />
            <AdvertiserList 
                rowData={advertiserList} 
                totalCount={totalCount}
                searchCount={searchCount}
                colGroup={<ColGroup />}
                tableHeadData={tableHead}
                handleAdvertiserDispatch={handleAdvertiserDispatch}
                handleAdvertiserCallback={handleSearchAdvertiserCallback}
            />            
        </>
    )
}

export default AdvertiserSearchContainer;