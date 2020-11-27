import React from 'react';
import styles from './ListTableModeBaseBar.module.css';
import classNames from 'classnames/bind';

import Button from '../../ButtonComponent';
import ListTableRowMode from '../ListTableRowMode/ListTableRowMode';
import ListTableSortMode from '../ListTableSortMode/ListTableSortMode';

const cx = classNames.bind(styles);

// 컴포넌트 정의
const ListTableModeBaseBar = ({
        totalCount,
        searchCount,
        unit,
        tableRowOptions,
        handleTableDataCreate,
        handleTableSortMode, 
        handleTableRowMode
    }) => {


    // render
    return (
        <div className={cx("board_cont")}>
            <span className={cx("total")} >
                <div className={cx("lSide")}>
                    전체 <span className={cx("count")}>{totalCount}</span> {unit} 중 검색 된 <span className={cx("count")}>{searchCount}</span> {unit}
                </div>
                <div className={cx("rSide")}>
                    <ListTableSortMode
                        handleTableSortMode={handleTableSortMode}
                    />
                    <ListTableRowMode
                        tableRowOptions={tableRowOptions}
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
                </div>
            </span>
        </div>
    )
}

export default ListTableModeBaseBar;