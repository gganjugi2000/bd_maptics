import React, { useState, useEffect, useCallback } from 'react';
import { Link, withRouter } from "react-router-dom";
import { changeNowSector, changeNowPage } from 'store/modules/rowStore';
import styles from './ListPaging.module.css';
import classNames from 'classnames/bind';
import {useDispatch, useSelector} from "react-redux";

const cx = classNames.bind(styles);


// 컴포넌트 정의
const ListPaging = ({rowData}) => {

    const dispatch = useDispatch();
    const { limit, nowSector, nowPage, rowList} = useSelector((state) => state.rowStore);

    let pages = 0
    let pageLength = 0
    const handleMove = useCallback(
        (type) => {
            if (type == 'first') {
                dispatch(changeNowSector(1))
            } else if (type == 'last') {

            } else if (type == 'prev') {
                if(nowSector > 1) {
                    pageLength = 0
                    dispatch(changeNowSector(nowSector - 1))
                }
            } else if (type == 'next') {
                if(nowSector*limit*10 < rowData.length) {
                    pageLength = 0
                    dispatch(changeNowSector(nowSector + 1))
                }
            }
        }, [dispatch, nowSector, limit]
    )
    const handleMovePage = useCallback(
        (e) => {
            let page = e.target.getAttribute('data-page')
            dispatch(changeNowPage(page))
        }, [dispatch, nowPage, limit]
    )
    // render
    return (
        <div className={cx("listPaging")}>
            <ul>
                <li className={cx("first")} onClick={()=> handleMove('first')}>&lt;&lt;</li>
                <li className={cx("prev")} onClick={()=> handleMove('prev')}>&lt;</li>
                    {rowData && rowData.map((menuItem, i) => {
                        if( i % limit == 0 && i > (nowSector-1)*10) {
                            pages = (nowSector-1) * 10 + pageLength + 1
                            if(pageLength < 10) {
                                pageLength++
                                return (
                                    <li key={pages} onClick={handleMovePage} data-page={pages}>{pages}</li>
                                );
                            }
                        }
                    })}
                <li className={cx("next")} onClick={()=> handleMove('next')}>&gt;</li>
                <li className={cx("last")} onClick={()=> handleMove('last')}>&gt;&gt;</li>
            </ul>
        </div>
    )
}

export default ListPaging;