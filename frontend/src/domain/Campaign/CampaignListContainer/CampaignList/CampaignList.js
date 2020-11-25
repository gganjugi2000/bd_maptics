import React from 'react';
import styles from './CampaignList.module.css';
import classNames from 'classnames/bind';
import ListTable from '../../../../components/ListTableComponent/ListTable';

const cx = classNames.bind(styles);

// 컴포넌트 정의
const CampaignList = ({ 
        rowData, 
        totalCount, 
        searchCount, 
        colGroup,
        tableHeadData,
        handleCampaignDispatch, 
        handleCampaignCreate, 
        handleCampaignDetail
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
                handleTableDispatch={handleCampaignDispatch}
                handleTableDataCreate={handleCampaignCreate}
                handleTableCallback={handleCampaignDetail}
            />
        </div>
    )
}

export default CampaignList;