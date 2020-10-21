import React, { useState }  from 'react';
import { Link } from "react-router-dom";
import styles from './ListTable.module.css';
import classNames from 'classnames/bind';

import ListTableRowMode from './ListTableRowMode/ListTableRowMode';
import ListTablePage from './ListTablePage/ListTablePage';

const cx = classNames.bind(styles);


// 컴포넌트 정의
const ListTable = ({
        colGroup, 
        tableHead,
        rowData,
        totalCount,
        handleTableDispatch
    }) => {

    // ======================================================
    // table state 
    // ------------------------------------------------------
    const [limit, setLimit] = useState(10);
    const [nowPage, setNowPage] = useState(1);
    // ======================================================

    const handleTableRowMode = (limit) => {
        setLimit(limit);
        setNowPage(1);
        handleTableDispatch({cur: 1, page_size:limit});
    }

    const handleChangePage = (page) => {
        setNowPage(page);
        handleTableDispatch({cur: page, page_size:limit});
    }

    // render
    return (
        <>
            <div className={cx("listRow")} rel={limit}>
                <ListTableRowMode
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
                        {rowData && rowData.map((item, i) => {
                            return (
                                <tr key={`"tr_${(nowPage -1) * limit + (i + 1)}"`}>
                                    {tableHead && tableHead.map((headItem, j) => {
                                        return (
                                            <td key={(i + 1) * (j + 1)}>
                                                {headItem.id === "no" ? ((nowPage -1) * limit + (i + 1))
                                                : (headItem["type"] !== undefined && headItem.type === "link" ? (
                                                        <Link to={headItem.to + item[headItem.id]}>{item[headItem.label_id]}</Link>
                                                    ) : (item[headItem.id])
                                                )}
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
        </>
    )
}

export default ListTable;