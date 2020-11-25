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
        console.log("handleCampaignDispatch obj =================== ")
        console.log(obj)
        console.log("------------------------------------------------- ")
        // nowPage : 현재 페이지
        // limit : 테이블에서 보여질 수
        setPagingQuery(obj);
        dispatch(listCampaign(Object.assign(searchQuery, obj)));
    };

    // Search 
    const handleSearchCampaignDispatch = (obj) => {
        console.log("handleSearchCampaignDispatch obj =================== ")
        console.log(obj)
        console.log("------------------------------------------------- ")
        setSearchQuery(obj);
        // nowPage : 현재 페이지
        // limit : 테이블에서 보여질 수
        dispatch(listCampaign(Object.assign(obj, {cur:1, page_size:10})));
    };

    const ColGroup = () => {
        return (
            <colgroup>
                <col width={"10%"} />
                <col width={"10%"} />
                <col width={"10%"} />
                <col width={"10%"} />
                <col width={"30%"} />
                <col width={"10%"} />
                <col width={"10%"} />
                <col width={"10%"} />
            </colgroup>
        )
    }

    // {id: "advts_id", type: "callback", name: "아이디"},
    const tableHead = [
        {id: "no",name: "번호" },
        {id: "use_yn",name: "사용여부"},
        {id: "advts_id",name: "아이디"},
        {id: "advts_nm",name: "광고주명"},
        {id: "id",type: "link", label_id: "cmpgn_title", name: "캠페인명", to:"/campaign/"},
        {id: "send_mode",name: "발송방식"},
        {id: "send_dt_ymd",name: "발송일시", data_type: 'date'},
        {id: "reg_dt",name: "등록일", data_type: 'date'},
    ];

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
                colGroup={<ColGroup />}
                tableHeadData={tableHead}
                handleCampaignDispatch={handleCampaignDispatch}
                handleCampaignCreate={handleCampaignCreate}
                handleCampaignDetail={handleCampaignDetail}
            />
        </>
    )
}

export default CampaignListContainer;