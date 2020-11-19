import React, { useState }  from 'react';
import styles from './SingleSearchBar.module.css';
import classNames from 'classnames/bind';

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

        setSearchData({
            ['search_value'] : value
        });

        if(e.key === 'Enter') {
            const searchData = searchValue;
            searchData.search_value = value;

            if (value >= minLength) {
                handleDispatch(searchData);
            } else {
                alert("최소 2자 이상 입력해야 합니다.");
            }
        }
    }

    // render
    return (
        <>
            <div className={cx("input-container")} style={{display:"inline-block"}}>
                {searchLabel === null || searchLabel === undefined ? null : <label>{searchLabel}</label>}
                <input
                    id="searchValue"
                    type="text"
                    className={cx("input-text")} 
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
            </div>
        </>
    )
}

export default SingleSearchBar;