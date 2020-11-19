import React, { useState }  from 'react';

import Button from '../../ButtonComponent';
import DatePicker from 'react-datepicker';

import styles from './CampaignSearchBar.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

// 컴포넌트 정의
const CampaignSearchBar = ({
        handleDispatch
    }) => {

    // ======================================================
    // state 
    // ------------------------------------------------------
    const [campaignSearchData, setCampaignSearchData] = useState({
        advertiser_id: '',
        advertiser_name: '',
        campaign_name: '',
        reg_start_dt: new Date(),
        reg_end_dt: new Date(),
        send_start_dt: new Date(),
        send_end_dt: new Date()
    });

    // 광고주 아이디
    const changeAdvertiserId = (e, value) => {
        console.log("changeAdvertiserId advertiser_id value =================== ")
        console.log(value)
        console.log("------------------------------------------------- ")

        setCampaignSearchData({
            ...campaignSearchData,
            ['advertiser_id'] : value
        });

        if(e.key === 'Enter') {
            const searchData = campaignSearchData;
            searchData.advertiser_id = value;
            handleDispatch(searchData);
        }
    }

    // 광고주 명
    const changeAdvertiserName = (e, value) => {
        console.log("changeAdvertiserName advertiser_name value =================== ")
        console.log(value)
        console.log("------------------------------------------------- ")

        setCampaignSearchData({
            ...campaignSearchData,
            ['advertiser_name'] : value
        });

        if(e.key === 'Enter') {
            const searchData = campaignSearchData;
            searchData.advertiser_name = value;
            handleDispatch(searchData);
        }
    }

    // 캠페인 명
    const changeCampaignName = (e, value) => {
        console.log("changeCampaignName campaign_name value =================== ")
        console.log(value)
        console.log("------------------------------------------------- ")

        setCampaignSearchData({
            ...campaignSearchData,
            ['campaign_name'] : value
        });

        if(e.key === 'Enter') {
            const searchData = campaignSearchData;
            searchData.campaign_name = value;
            handleDispatch(searchData);
        }
    }

    // 등록 시작일
    const changeRegStartDate = (date) => {
        const { reg_start_dt } = campaignSearchData;
        console.log("changeRegStartDate reg_end_dt =================== ")
        console.log(reg_start_dt)
        console.log("------------------------------------------------- ")
        // TO-DO :: reg_start_dt / reg_end_dt 비교

        setCampaignSearchData({
            ...campaignSearchData,
            ['reg_start_dt'] : date
        });

        const searchData = campaignSearchData;
        searchData.reg_start_dt = date;

        handleDispatch(searchData);
    }

    // 등록 종료일
    const changeRegEndDate = (date) => {
        const { reg_end_dt } = campaignSearchData;
        console.log("changeRegEndDate reg_end_dt =================== ")
        console.log(reg_end_dt)
        console.log("------------------------------------------------- ")
        // TO-DO :: reg_start_dt / reg_end_dt 비교

        setCampaignSearchData({
            ...campaignSearchData,
            ['reg_end_dt'] : date
        });

        const searchData = campaignSearchData;
        searchData.reg_end_dt = date;

        handleDispatch(searchData);
    }

    // 발송 시작일
    const changeSendStartDate = (date) => {
        const { send_start_dt } = campaignSearchData;
        console.log("changeRegStartDate send_start_dt =================== ")
        console.log(send_start_dt)
        console.log("------------------------------------------------- ")
        // TO-DO :: send_start_dt / send_end_dt 비교

        setCampaignSearchData({
            ...campaignSearchData,
            ['send_start_dt'] : date
        });

        const searchData = campaignSearchData;
        searchData.send_start_dt = date;

        handleDispatch(searchData);
    }

    // 발송 종료일
    const changeSendEndDate = (date) => {
        const { send_end_dt } = campaignSearchData;
        console.log("changeRegEndDate send_end_dt =================== ")
        console.log(send_end_dt)
        console.log("------------------------------------------------- ")
        // TO-DO :: send_start_dt / send_end_dt 비교

        setCampaignSearchData({
            ...campaignSearchData,
            ['send_end_dt'] : date
        });

        const searchData = campaignSearchData;
        searchData.send_end_dt = date;

        handleDispatch(searchData);
    }

    // 조회
    const handleSearch = (e) => {
        handleDispatch(campaignSearchData);
    }

    // render
    return (
        <div className={cx("all_Search")}>
            <input
                id="advertiserId"
                type="text"
                placeholder="아이디"
                className={cx("input-text")} 
                value={campaignSearchData.advertiser_id}
                onChange={(e) => {
                    changeAdvertiserId(e, e.target.value);
                }}
                onKeyPress={(e) => {
                    if(e.key === 'Enter') {
                        changeAdvertiserId(e, e.target.value);
                    }
                }}
            />
            <input
                id="advertiser_name"
                type="text"
                placeholder="광고주명"
                className={cx("input-text")} 
                value={campaignSearchData.advertiser_name}
                onChange={(e) => {
                    changeAdvertiserName(e, e.target.value);
                }}
                onKeyPress={(e) => {
                    if(e.key === 'Enter') {
                        changeAdvertiserName(e, e.target.value);
                    }
                }}
            />
            <input
                id="manager_name"
                type="text"
                placeholder="캠페인명"
                className={cx("input-text")} 
                value={campaignSearchData.manager_name}
                onChange={(e) => {
                    changeCampaignName(e, e.target.value);
                }}
                onKeyPress={(e) => {
                    if(e.key === 'Enter') {
                        changeCampaignName(e, e.target.value);
                    }
                }}
            />
            등록일
            <span>
                <DatePicker
                    id="reg_start_dt"
                    selected={campaignSearchData.reg_start_dt}
                    onChange={date => changeRegStartDate(date)}
                    isClearable="true"
                    dateFormat="yyyy/MM/dd"
                />
            </span>
            <label>~</label>
            <span>
                <DatePicker
                    id="reg_end_dt"
                    selected={campaignSearchData.reg_end_dt}
                    onChange={date => changeRegEndDate(date)}
                    isClearable="true"
                    dateFormat="yyyy/MM/dd"
                />
            </span>
            <label>발송일</label>
            <span>
                <DatePicker
                    id="reg_start_dt"
                    selected={campaignSearchData.reg_start_dt}
                    onChange={date => changeSendStartDate(date)}
                    isClearable="true"
                    dateFormat="yyyy/MM/dd"
                />
            </span>
            <label>~</label>
            <span>
                <DatePicker
                    id="reg_end_dt"
                    selected={campaignSearchData.reg_end_dt}
                    onChange={date => changeSendEndDate(date)}
                    isClearable="true"
                    dateFormat="yyyy/MM/dd"
                />
            </span>
            <Button
                type="search"
                onClick={e => { 
                    handleSearch(e); 
                }}
                >
                조회
            </Button>
        </div>
    )
}

export default CampaignSearchBar;