import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { listAdvertiser } from 'store/modules/advertiserStore';
import { useHistory } from "react-router";
import AdvertiserList from './AdvertiserList';
import AdvertiserSearchBar from '../../../components/SearchBarComponent/AdvertiserSearchBar/AdvertiserSearchBar';
import AdvertiserForm from '../AdvertiserFormContainer';
import AdvertiserInfo from '../AdvertiserInfoContainer';
import Button from '../../../components/ButtonComponent';
import Popup from '../../../components/PopupComponent';

// 컨테이너 정의
const AdvertiserListContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    // state 정의
    const [openCreate, setOpenCreate] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [infoId, setInfoId] = useState(null);
    const [pagingQuery, setPagingQuery] = useState({cur:1, page_size:20});
    const [searchQuery, setSearchQuery] = useState({});
    const { advertiserList, totalCount, searchCount } = useSelector((state) => state.advertiserStore);

    // life cycle
    useEffect(() => {
        // 데이터 불러오기
        dispatch(listAdvertiser(pagingQuery));
    }, [dispatch]) // page loading 
    
    const handleCreatePopupOpen = (e) => {
        setOpenCreate(true);
    }

    const handleCreatePopupClose = (e) => {
        setOpenCreate(false);
        dispatch(listAdvertiser(pagingQuery));
    }

    const handleDetailPopupClose = (e) => {
        setOpenDetail(false);
        dispatch(listAdvertiser(pagingQuery));
    }

    const handleAdvertiserDetail = (value) => {
        setOpenDetail(true);
        setInfoId(value);
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
            <AdvertiserList 
                rowData={advertiserList} 
                totalCount={totalCount}
                searchCount={searchCount}
                handleAdvertiserDispatch={handleAdvertiserDispatch}
                handleAdvertiserCreate={handleCreatePopupOpen}
                handleAdvertiserDetail={handleAdvertiserDetail}
            />
            {openCreate ? <Popup id="createPopup" title="광고주 등록" close={handleCreatePopupClose}>
                <AdvertiserForm popupClose={handleCreatePopupClose} />
            </Popup> : null}
            {openDetail && infoId ? <Popup id="detailPopup" title="광고주 상세정보" close={handleDetailPopupClose}>
                <AdvertiserInfo popupClose={handleDetailPopupClose} infoId={infoId} />
            </Popup> : null}
        </>
    )
}

export default AdvertiserListContainer;