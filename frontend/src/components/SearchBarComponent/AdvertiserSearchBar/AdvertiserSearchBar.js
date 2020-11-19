import React, { useState }  from 'react';

import Button from '../../ButtonComponent';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import styles from './AdvertiserSearchBar.module.css';
import classNames from 'classnames/bind';
import {
    changeFormat
} from 'utiles/format/date/changeFormat';

const cx = classNames.bind(styles);

// 컴포넌트 정의
const AdvertiserSearchBar = ({
        handleDispatch
    }) => {

    // ======================================================
    // state 
    // ------------------------------------------------------
    const [advertiserSearchData, setAdvertiserSearchData] = useState({
        advts_id: '',
        advts_nm: '',
        advts_mng_nm: '',
        reg_start_dt: null,
        reg_end_dt: null
    });

    // 광고주 아이디
    const changeAdvertiserId = (e, value) => {
        setAdvertiserSearchData({
            ...advertiserSearchData
            , ['advts_id'] : value
        });

        if(e.key === 'Enter') {
            const searchData = advertiserSearchData;
            searchData.advts_id = value;
            handleDispatch(searchData);
        }
    }

    // 광고주 명
    const changeAdvertiserName = (e, value) => {
        console.log("changeAdvertiserName advts_nm value =================== ")
        console.log(value)
        console.log("------------------------------------------------- ")

        setAdvertiserSearchData({
            ...advertiserSearchData
            , ['advts_nm'] : value
        });

        if(e.key === 'Enter') {
            const searchData = advertiserSearchData;
            searchData.advts_nm = value;
            handleDispatch(searchData);
        }
    }

    // 담당자 명
    const changeManagerName = (e, value) => {
        console.log("changeAdvertiserName advts_mng_nm value =================== ")
        console.log(value)
        console.log("------------------------------------------------- ")

        setAdvertiserSearchData({
            ...advertiserSearchData
            , ['advts_mng_nm'] : value
        });

        if(e.key === 'Enter') {
            const searchData = advertiserSearchData;
            searchData.advts_mng_nm = value;
            handleDispatch(searchData);
        }
    }

    // 등록 시작일
    const changeRegStartDate = (date) => {
        const { reg_end_dt } = advertiserSearchData;
        // TO-DO :: reg_start_dt / reg_end_dt 비교

        setAdvertiserSearchData({
            ...advertiserSearchData
            , ['reg_start_dt'] : date
        });

        const searchData = advertiserSearchData;
        searchData.reg_start_dt = changeFormat(date, 'YYYY-MM-DD');
        if(reg_end_dt !== null){
            searchData.reg_end_dt = changeFormat(reg_end_dt, 'YYYY-MM-DD');
        }

        handleDispatch(searchData);
    }

    // 등록 종료일
    const changeRegEndDate = (date) => {
        const { reg_start_dt } = advertiserSearchData;
        // TO-DO :: reg_start_dt / reg_end_dt 비교

        setAdvertiserSearchData({
            ...advertiserSearchData
            , ['reg_end_dt'] : date
        });

        const searchData = advertiserSearchData;

        if(reg_start_dt !== null){
            searchData.reg_start_dt = changeFormat(reg_start_dt, 'YYYY-MM-DD');
        }
        searchData.reg_end_dt = changeFormat(date, 'YYYY-MM-DD');

        handleDispatch(searchData);
    }

    // 조회
    const handleSearch = (e) => {
        handleDispatch(advertiserSearchData);
    }

    // render
    return (
        <div className={cx("all_Search")}>
            <input
                id="advertiserId"
                type="text"
                placeholder="아이디"
                value={advertiserSearchData.advts_id}
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
                id="advts_nm"
                type="text"
                placeholder="광고주명"
                value={advertiserSearchData.advts_nm}
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
                id="advts_mng_nm"
                type="text"
                placeholder="담당자명"
                value={advertiserSearchData.advts_mng_nm}
                onChange={(e) => {
                    changeManagerName(e, e.target.value);
                }}
                onKeyPress={(e) => {
                    if(e.key === 'Enter') {
                        changeManagerName(e, e.target.value);
                    }
                }}
            />
            등록일
            <span>
                <DatePicker
                    id="reg_start_dt"
                    selected={advertiserSearchData.reg_start_dt}
                    onChange={date => changeRegStartDate(date)}
                    isClearable="true"
                    dateFormat="yyyy/MM/dd"
                />
            </span>
            ~
            <span>
                <DatePicker
                    id="reg_end_dt"
                    selected={advertiserSearchData.reg_end_dt}
                    onChange={date => changeRegEndDate(date)}
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

export default AdvertiserSearchBar;