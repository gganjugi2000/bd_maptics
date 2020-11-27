import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router";
import { listCampaign } from 'store/modules/campaignStore';
import CampaignList from './CampaignList';
import CampaignSearchBar from '../../../components/SearchBarComponent/CampaignSearchBar/CampaignSearchBar';
import Button from '../../../components/ButtonComponent';

// 컨테이너 정의
const CampaignListContainer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [pagingQuery, setPagingQuery] = useState({cur:1, page_size:10});
    const [searchQuery, setSearchQuery] = useState({});
    const { campaignList, totalCount, searchCount, status } = useSelector((state) => state.campaignStore);
    console.log("CampaignListContainer")
    // state 정의

    // life cycle
    useEffect(() => {
        // 데이터 불러오기
        dispatch(listCampaign(pagingQuery));
    }, [dispatch, totalCount, status]);
    
    const handleCampaignCreate = (e) => {
        history.push({
            pathname:  "/campaign/create"
        });
    }

    const handleCampaignDetail = (e) => {
        
    }

    const handleCampaignDispatch = (obj) => {
        // nowPage : 현재 페이지
        // limit : 테이블에서 보여질 수
        setPagingQuery(obj);
        dispatch(listCampaign(Object.assign(searchQuery, obj)));
    };

    // Search 
    const handleSearchCampaignDispatch = (obj) => {
        setSearchQuery(obj);
        // nowPage : 현재 페이지
        // limit : 테이블에서 보여질 수
        dispatch(listCampaign(Object.assign(obj, {cur:1, page_size:10})));
    };

    // render
    return (
        <>
            <CampaignSearchBar
                handleDispatch={handleSearchCampaignDispatch}
            />
            <CampaignList 
                rowData={campaignList} 
                totalCount={totalCount}
                searchCount={searchCount}
                handleCampaignDispatch={handleCampaignDispatch}
                handleCampaignCreate={handleCampaignCreate}
                handleCampaignDetail={handleCampaignDetail}
            />
        </>
    )
}

export default CampaignListContainer;