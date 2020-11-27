import React, { useState }  from 'react';

import Button from '../../ButtonComponent';
import DatePicker from 'react-datepicker';

import styles from './CampaignSearchBar.module.css';
import classNames from 'classnames/bind';
import {
    changeFormat
} from 'utiles/format/date/changeFormat';

const cx = classNames.bind(styles);

// 컴포넌트 정의
const CampaignSearchBar = ({
        handleDispatch
    }) => {

    // ======================================================
    // state 
    // ------------------------------------------------------
    const [campaignSearchData, setCampaignSearchData] = useState({
        advts_id: '',
        advts_nm: '',
        cmpgn_title: '',
        reg_start_dt: null,
        reg_end_dt: null,
        send_start_dt: null,
        send_end_dt: null
    });

    // 광고주 아이디
    const changeAdvertiserId = (e, value) => {
        console.log("changeAdvertiserId advts_id value =================== ")
        console.log(value)
        console.log("------------------------------------------------- ")

        setCampaignSearchData({
            ...campaignSearchData,
            ['advts_id'] : value
        });

        if(e.key === 'Enter') {
            const searchData = campaignSearchData;
            searchData.advts_id = value;
            handleDispatch(searchData);
        }
    }

    // 광고주 명
    const changeAdvertiserName = (e, value) => {
        console.log("changeAdvertiserName advts_nm value =================== ")
        console.log(value)
        console.log("------------------------------------------------- ")

        setCampaignSearchData({
            ...campaignSearchData,
            ['advts_nm'] : value
        });

        if(e.key === 'Enter') {
            const searchData = campaignSearchData;
            searchData.advts_nm = value;
            handleDispatch(searchData);
        }
    }

    // 캠페인 명
    const changeCampaignName = (e, value) => {
        console.log("changeCampaignName cmpgn_title value =================== ")
        console.log(value)
        console.log("------------------------------------------------- ")

        setCampaignSearchData({
            ...campaignSearchData,
            ['cmpgn_title'] : value
        });

        if(e.key === 'Enter') {
            const searchData = campaignSearchData;
            searchData.cmpgn_title = value;
            handleDispatch(searchData);
        }
    }

    // 등록 시작일
    const changeRegStartDate = (date) => {
        const { reg_end_dt } = campaignSearchData;
        // TO-DO :: reg_start_dt / reg_end_dt 비교

        setCampaignSearchData({
            ...campaignSearchData,
            ['reg_start_dt'] : date
        });

        const searchData = campaignSearchData;
        searchData.reg_start_dt = changeFormat(date, 'YYYY-MM-DD');
        if(reg_end_dt !== null){
            searchData.reg_end_dt = changeFormat(reg_end_dt, 'YYYY-MM-DD');
        }

        handleDispatch(searchData);
    }

    // 등록 종료일
    const changeRegEndDate = (date) => {
        const { reg_start_dt } = campaignSearchData;
        // TO-DO :: reg_start_dt / reg_end_dt 비교

        setCampaignSearchData({
            ...campaignSearchData,
            ['reg_end_dt'] : date
        });

        const searchData = campaignSearchData;

        if(reg_start_dt !== null){
            searchData.reg_start_dt = changeFormat(reg_start_dt, 'YYYY-MM-DD');
        }
        searchData.reg_end_dt = changeFormat(date, 'YYYY-MM-DD');

        handleDispatch(searchData);
    }

    // 발송 시작일
    const changeSendStartDate = (date) => {
        const { send_end_dt } = campaignSearchData;
        // TO-DO :: send_start_dt / send_end_dt 비교

        setCampaignSearchData({
            ...campaignSearchData,
            ['send_start_dt'] : date
        });

        const searchData = campaignSearchData;
        searchData.send_start_dt = changeFormat(date, 'YYYY-MM-DD');
        if(send_end_dt !== null){
            searchData.send_end_dt = changeFormat(send_end_dt, 'YYYY-MM-DD');
        }

        handleDispatch(searchData);
    }

    // 발송 종료일
    const changeSendEndDate = (date) => {
        const { send_start_dt } = campaignSearchData;
        // TO-DO :: send_start_dt / send_end_dt 비교

        setCampaignSearchData({
            ...campaignSearchData,
            ['send_end_dt'] : date
        });

        const searchData = campaignSearchData;
        
        if(send_start_dt !== null){
            searchData.send_start_dt = changeFormat(send_start_dt, 'YYYY-MM-DD');
        }
        searchData.send_end_dt = changeFormat(date, 'YYYY-MM-DD');

        handleDispatch(searchData);
    }

    // 조회
    const handleSearch = (e) => {
        handleDispatch(campaignSearchData);
    }

    // render
    return (
        <div className={cx("all_Search")}>
            <ul>
                <li>
                    <label>아이디</label>
                    <input autoComplete="off"
                        id="advts_id"
                        type="text"
                        value={campaignSearchData.advts_id}
                        onChange={(e) => {
                            changeAdvertiserId(e, e.target.value);
                        }}
                        onKeyPress={(e) => {
                            if(e.key === 'Enter') {
                                changeAdvertiserId(e, e.target.value);
                            }
                        }}
                    />
                </li>
                <li>
                    <label>광고주명</label>
                    <input
                        id="advts_nm"
                        type="text"
                        value={campaignSearchData.advts_nm}
                        onChange={(e) => {
                            changeAdvertiserName(e, e.target.value);
                        }}
                        onKeyPress={(e) => {
                            if(e.key === 'Enter') {
                                changeAdvertiserName(e, e.target.value);
                            }
                        }}
                    />
                </li>
                <li>
                    <label>캠페인명</label>
                    <input
                        id="cmpgn_title"
                        type="text"
                        value={campaignSearchData.cmpgn_title}
                        onChange={(e) => {
                            changeCampaignName(e, e.target.value);
                        }}
                        onKeyPress={(e) => {
                            if(e.key === 'Enter') {
                                changeCampaignName(e, e.target.value);
                            }
                        }}
                    />
                </li>
                <li className={cx("secondLine", "date")}>
                    <label>등록일</label>
                    <div className={cx("datepickerWrap")}>
                        <span>
                            <DatePicker
                                autoComplete='off'
                                id="reg_start_dt"
                                selected={campaignSearchData.reg_start_dt}
                                onChange={date => changeRegStartDate(date)}
                                isClearable="true"
                                dateFormat="yyyy/MM/dd"
                            />
                        </span>
                        <span>~</span>
                        <span>
                            <DatePicker
                                autoComplete='off'
                                id="reg_end_dt"
                                selected={campaignSearchData.reg_end_dt}
                                onChange={date => changeRegEndDate(date)}
                                isClearable="true"
                                dateFormat="yyyy/MM/dd"
                            />
                        </span>
                    </div>
                </li>
                <li className={cx("secondLine", "date", "adjust")}>
                    <label>발송일</label>
                    <div className={cx("datepickerWrap")}>
                        <span>
                            <DatePicker
                                autoComplete='off'
                                id="send_start_dt"
                                selected={campaignSearchData.send_start_dt}
                                onChange={date => changeSendStartDate(date)}
                                isClearable="true"
                                dateFormat="yyyy/MM/dd"
                            />
                        </span>
                        <span>~</span>
                        <span>
                            <DatePicker
                                autoComplete='off'
                                id="send_end_dt"
                                selected={campaignSearchData.send_end_dt}
                                onChange={date => changeSendEndDate(date)}
                                isClearable="true"
                                dateFormat="yyyy/MM/dd"
                            />
                        </span>
                    </div>
                </li>
            </ul>
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