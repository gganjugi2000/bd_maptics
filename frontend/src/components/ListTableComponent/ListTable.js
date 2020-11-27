import React, { useEffect, useState }  from 'react';
import { Link } from "react-router-dom";
import styles from './ListTable.module.css';
import classNames from 'classnames/bind';

import ListTablePage from './ListTablePage/ListTablePage';
import ListTableModeBaseBar from './ListTableModeBaseBar/ListTableModeBaseBar';

import OdometerComponent from '../OdometerComponent/OdometerComponent';
import {
    changeFormat
} from 'utiles/format/date/changeFormat';

const cx = classNames.bind(styles);

// 컴포넌트 정의
const ListTable = ({
        colGroup, 
        tableHead,
        rowData,
        unit,
        tableRowOptions,
        totalCount,
        searchCount,
        handleTableDataCreate,
        handleTableDispatch, 
        handleTableCallback
    }) => {

    // ======================================================
    // table state 
    // ------------------------------------------------------
    const [limit, setLimit] = useState(10);
    const [sort, setSort] = useState('desc');
    const [nowPage, setNowPage] = useState(1);
    // ======================================================

    useEffect(()=> {
        if(tableRowOptions) {
            setLimit(tableRowOptions[0].value);
        }
    }, []);

    const handleTableRowMode = (limit) => {
        setLimit(limit);
        setNowPage(1);
        handleTableDispatch({cur: 1, page_size:limit, sort: sort});
    }

    const handleTableSortMode = (sort) => {
        setSort(sort);
        setNowPage(1);
        handleTableDispatch({cur: 1, page_size:limit, sort: sort});
    }

    const handleChangePage = (page) => {
        setNowPage(page);
        handleTableDispatch({cur: page, page_size:limit, sort: sort});
    }

    const handleCallbackData = (e, value) => {
        e.preventDefault();
        handleTableCallback(value);
    }

    // render
    return (
        <div className={cx("notitable")}>
            <div className={cx("tableStyle01")} rel={limit}>
                <ListTableModeBaseBar 
                    totalCount={totalCount}
                    searchCount={searchCount}
                    unit={unit}
                    tableRowOptions={tableRowOptions}
                    handleTableDataCreate={handleTableDataCreate}
                    handleTableSortMode={handleTableSortMode}
                    handleTableRowMode={handleTableRowMode}
                />
                <table>
                    {colGroup}
                    <thead>
                        <tr>
                            {tableHead && tableHead.map((item, i) => {
                                return (
                                    <th key={i}>{item.name}</th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {rowData && rowData.length > 0 ? (rowData.map((item, i) => {
                            return (
                                <tr key={`"tr_${(nowPage -1) * limit + (i + 1)}"`}>
                                    {tableHead && tableHead.map((headItem, j) => {
                                        return (
                                            <td key={(i + 1) * (j + 1)} >
                                                <span>
                                                    {headItem.id === "no" ? ((nowPage -1) * limit + (i + 1))
                                                    : (headItem["type"] !== undefined && headItem.type === "link" ? (
                                                            <Link to={headItem.to + item[headItem.id]}><label className={cx("link")}>{item[headItem.label_id]}</label></Link>
                                                        ) : (headItem["type"] !== undefined && headItem.type === "callback" ? (
                                                            <label 
                                                                className={cx("link")}
                                                                onClick={(e) => {
                                                                    handleCallbackData(e, item[headItem.id]);
                                                                }}
                                                             >
                                                                {item[headItem.id]}
                                                             </label>
                                                        ) 
                                                        : (headItem["data_type"] !== undefined && headItem.data_type === "date" ? changeFormat(item[headItem.id], 'YYYY-MM-DD HH:mm:DD') : item[headItem.id]))
                                                    )}
                                                </span>
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })) : (
                            <tr >
                                <td colSpan={tableHead && tableHead.length > 0 ? tableHead.length : 1} >
                                    검색된 결과가 없습니다.
                                </td>
                            </tr>
                        )}                        
                    </tbody>
                </table>
            </div>
            <ListTablePage
                nowPage={nowPage}
                limit={limit}
                totalCount={totalCount}
                rowCount={rowData && rowData.length > 0 ? rowData.length : 0}
                handleChangePage={handleChangePage}
            />
        </div>
    )
}

export default ListTable;