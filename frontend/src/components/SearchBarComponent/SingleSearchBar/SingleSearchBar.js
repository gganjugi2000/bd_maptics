import React, { useState }  from 'react';
import styles from './SingleSearchBar.module.css';
import classNames from 'classnames/bind';
import Button from '../../ButtonComponent';

const cx = classNames.bind(styles);

// 컴포넌트 정의
const SingleSearchBar = ({
        searchLabel,
        minSearchLength,
        handleDispatch
    }) => {

    const minLength = minSearchLength === null || minSearchLength === undefined || minSearchLength < 2 ? 2 : minSearchLength;
    // ======================================================
    // state 
    // ------------------------------------------------------
    const [searchValue, setSearchValue] = useState({
        search_value: ''
    });

    // 검색
    const changeSearchValue = (e, value) => {
        console.log("changeSearchValue search_value value =================== ")
        console.log(value)
        console.log("------------------------------------------------- ")

        setSearchValue({
            ['search_value'] : value
        });

        if(e.key === 'Enter') {
            const searchData = searchValue;
            searchData.search_value = value;
            handleDispatch(searchData);
        }
    }

    // 조회
    const handleSearch = (e) => {
        handleDispatch(searchValue);
    }

    // render
    return (
        <>
            <div className={cx("all_Search")}>
                <ul>
                    <li>
                    {searchLabel === null || searchLabel === undefined ? null : <label>{searchLabel}</label>}
                        <input
                            id="searchValue"
                            type="text"
                            value={searchValue.search_value}
                            onChange={(e) => {
                                changeSearchValue(e, e.target.value);
                            }}
                            onKeyPress={(e) => {
                                if(e.key === 'Enter') {
                                    changeSearchValue(e, e.target.value);
                                }
                            }}
                        />
                    </li>
                </ul>
                <Button
                    type="btn_small"
                    onClick={e => { 
                        handleSearch(e); 
                    }}
                >
                조회
            </Button>
            </div>
        </>
    )
}

export default SingleSearchBar;