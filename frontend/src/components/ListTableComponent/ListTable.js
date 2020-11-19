import React, { useState }  from 'react';
import { Link } from "react-router-dom";
import styles from './ListTable.module.css';
import classNames from 'classnames/bind';

import Button from '../ButtonComponent';
import ListTableRowMode from './ListTableRowMode/ListTableRowMode';
import ListTableSortMode from './ListTableSortMode/ListTableSortMode';
import ListTablePage from './ListTablePage/ListTablePage';
import OdometerComponent from '../OdometerComponent/OdometerComponent';

const cx = classNames.bind(styles);

// 컴포넌트 정의
const ListTable = ({
        colGroup, 
        tableHead,
        rowData,
        totalCount,
        searchCount,
        handleTableDataCreate,
        handleTableDispatch, 
        handleTableCallback
    }) => {

    // ======================================================
    // table state 
    // ------------------------------------------------------
    const [limit, setLimit] = useState(20);
    const [sort, setSort] = useState('desc');
    const [nowPage, setNowPage] = useState(1);
    // ======================================================

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
                <div className={cx("board_cont")}>
                    <span className={cx("total")} >
                        전체 
                        <OdometerComponent
                            value={totalCount}
                            format="(,ddd)"
                            duration="500"
                        />
                        명 중 검색 된 
                        <OdometerComponent
                            value={searchCount}
                            format="(,ddd)"
                            duration="500"
                        />
                        명
                        <ListTableSortMode
                            handleTableSortMode={handleTableSortMode}
                        />
                        <ListTableRowMode
                            handleTableRowMode={handleTableRowMode}
                        />
                        {handleTableDataCreate && 
                            <div style={{float:'right'}}>
                                <Button
                                    type="create"
                                    onClick={handleTableDataCreate}
                                    >
                                    생성
                                </Button>
                            </div>
                        }
                    </span>
                </div>
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
                        {rowData && rowData.map((item, i) => {
                            return (
                                <tr key={`"tr_${(nowPage -1) * limit + (i + 1)}"`}>
                                    {tableHead && tableHead.map((headItem, j) => {
                                        return (
                                            <td key={(i + 1) * (j + 1)} >
                                                <span className={cx("data")} >
                                                    {headItem.id === "no" ? ((nowPage -1) * limit + (i + 1))
                                                    : (headItem["type"] !== undefined && headItem.type === "link" ? (
                                                            <Link to={headItem.to + item[headItem.id]}>{item[headItem.label_id]}</Link>
                                                        ) : (headItem["type"] !== undefined && headItem.type === "callback" ? (
                                                            <label 
                                                                onClick={(e) => {
                                                                    handleCallbackData(e, item[headItem.id]);
                                                                }}
                                                             >
                                                                {item[headItem.id]}
                                                             </label>
                                                        ) 
                                                        : (item[headItem.id]))
                                                    )}
                                                </span>
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}                        
                    </tbody>
                </table>
                <ListTablePage
                    nowPage={nowPage}
                    limit={limit}
                    totalCount={totalCount}
                    handleChangePage={handleChangePage}
                />
            </div>
        </div>
    )
}

export default ListTable;