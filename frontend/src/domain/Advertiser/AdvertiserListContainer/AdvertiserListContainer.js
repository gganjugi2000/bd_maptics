import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router";
import { listAdvertiser } from 'store/modules/advertiserStore';
import AdvertiserList from './AdvertiserList';
import AdvertiserSearchBar from '../../../components/SearchBarComponent/AdvertiserSearchBar/AdvertiserSearchBar';
import AdvertiserForm from '../AdvertiserFormContainer';
import AdvertiserInfo from '../AdvertiserInfoContainer';
import Button from '../../../components/ButtonComponent';


// 컨테이너 정의
const AdvertiserListContainer = () => {
    
    const dispatch = useDispatch();
    const history = useHistory();

    // state 정의
    const [openCreate, setOpenCreate] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [infoId, setInfoId] = useState(null);
    const [pagingQuery, setPagingQuery] = useState({cur:1, page_size:10});
    const [searchQuery, setSearchQuery] = useState({});
    const { advertiserList, totalCount, searchCount, status } = useSelector((state) => state.advertiserStore);

    // life cycle
    useEffect(() => {
        // 데이터 불러오기
        dispatch(listAdvertiser(pagingQuery));
    }, [dispatch, totalCount, status]);
    
    const handleCreatePopupOpen = (e) => {
        setOpenCreate(true);
    }

    const handleCreatePopupClose = (e) => {
        dispatch(listAdvertiser(pagingQuery));
        setOpenCreate(false);
    }

    const handleDetailPopupClose = (e) => {
        dispatch(listAdvertiser(pagingQuery));
        setOpenDetail(false);
    }

    const handleAdvertiserDetail = (value) => {
        setOpenDetail(true);
        setInfoId(value);
    }

    // 광고주 정보 데이터 조회(페이지) 항목
    const handleAdvertiserDispatch = (obj) => {
        // nowPage : 현재 페이지
        // limit : 테이블에서 보여질 수
        setPagingQuery(obj);
        dispatch(listAdvertiser(Object.assign(searchQuery, obj)));
    };

    // Search 
    const handleSearchAdvertiserDispatch = (obj) => {
        setSearchQuery(obj);
        // nowPage : 현재 페이지
        // limit : 테이블에서 보여질 수
        dispatch(listAdvertiser(Object.assign(obj, {cur:1, page_size:10})));
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
        {id: "reg_dt",name: "등록일", data_type: 'date'},
    ];

    // render
    return (
        <>
            <AdvertiserSearchBar
                handleDispatch={handleSearchAdvertiserDispatch}
            />
            <AdvertiserList 
                rowData={advertiserList} 
                totalCount={totalCount}
                searchCount={searchCount}
                colGroup={<ColGroup />}
                tableHeadData={tableHead}
                handleAdvertiserDispatch={handleAdvertiserDispatch}
                handleAdvertiserCreate={handleCreatePopupOpen}
                handleAdvertiserCallback={handleAdvertiserDetail}
            />
            {openCreate ? 
                <AdvertiserForm popupClose={handleCreatePopupClose} />
             : null}
            {openDetail && infoId ? 
                <AdvertiserInfo popupClose={handleDetailPopupClose} infoId={infoId} />
             : null}
        </>
    )
}

export default AdvertiserListContainer;