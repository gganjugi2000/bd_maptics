import React from 'react';
import styles from './AdvertiserList.module.css';
import classNames from 'classnames/bind';
import ListTable from '../../../../components/ListTableComponent/ListTable';

const cx = classNames.bind(styles);

// 컴포넌트 정의
const AdvertiserList = ({ 
        rowData, 
        totalCount, 
        searchCount, 
        colGroup,
        tableHeadData,
        handleAdvertiserDispatch, 
        handleAdvertiserCreate, 
        handleAdvertiserCallback
    }) => {

    // render
    return (
        <div className={cx("listview")}>
            <ListTable
                colGroup={colGroup}
                tableHead={tableHeadData}
                rowData={rowData}
                totalCount={totalCount}
                searchCount={searchCount}
                handleTableDispatch={handleAdvertiserDispatch}
                handleTableDataCreate={handleAdvertiserCreate}
                handleTableCallback={handleAdvertiserCallback}
            />
        </div>
    )
}

export default AdvertiserList;