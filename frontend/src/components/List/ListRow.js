import React, { useState, useEffect, useCallback, useRef }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeLimit, changeNowPage } from 'store/modules/rowStore';
import { Link, withRouter } from "react-router-dom";
import styles from './ListRow.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);


// 컴포넌트 정의
const ListRow = ({rowData}) => {

    const dispatch = useDispatch();
    const { limit, nowSector, nowPage, rowList} = useSelector((state) => state.rowStore);

    let pageRowLength = 0
    if(rowData) {
        //dispatch(changeRowList(rowData))
    }
    const handleChangeMode = useCallback(
        e => {
            const limit = e.target.value
            pageRowLength = 0
            dispatch(changeLimit(limit))
        }, [dispatch, limit, nowSector, nowPage]
    )
    // render
    return (
        <div className={cx("listRow")} rel={limit}>
            <div className={cx("listAmount")}>
                <select onChange={handleChangeMode}>
                    <option value='10'>10개</option>
                    <option value='30'>30개</option>
                    <option value='50'>50개</option>
                    <option value='100'>100개</option>
                </select>
            </div>
            <table>
                <colgroup>
                    <col width={"5%"} />
                    <col width={"75%"} />
                    <col width={"12%"} />
                    <col width={"8%"} />
                </colgroup>
                <thead>
                    <tr>
                        <th>순번</th>
                        <th>내용</th>
                        <th>날짜</th>
                        <th>작성자</th>
                    </tr>
                </thead>
                <tbody>
                {rowData && rowData.map((item, i) => {
                    if(limit * (nowPage-1) <= i) {
                        if (limit > pageRowLength) {
                            pageRowLength++
                            return (
                                <tr key={i}>
                                    <td>{i}</td>
                                    <td><Link to={item.url + i}>{item.name + i}</Link></td>
                                    <td>{item.date}</td>
                                    <td>{item.author}</td>
                                </tr>
                            );
                        }
                    }
                })}
                </tbody>
            </table>
        </div>
    )
}

export default ListRow;