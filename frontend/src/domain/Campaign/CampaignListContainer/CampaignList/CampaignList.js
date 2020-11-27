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
        handleCampaignDispatch, 
        handleCampaignCreate, 
        handleCampaignDetail
    }) => {


    const ColGroup = () => {
        return (
            <colgroup>
                <col width={"10%"} />
                <col width={"5%"} />
                <col width={"10%"} />
                <col width={"10%"} />
                <col width={"20%"} />
                <col width={"10%"} />
                <col width={"15%"} />
                <col width={"15%"} />
            </colgroup>
        )
    }

    // {id: "advts_id", type: "callback", name: "아이디"},
    const tableHead = [
        {id: "no",name: "번호" },
        {id: "use_yn",name: "사용여부"},
        {id: "advts_id",name: "아이디"},
        {id: "advts_nm",name: "광고주명"},
        {id: "id",type: "link", label_id: "cmpgn_title", name: "캠페인명", to:"/campaign/"},
        {id: "send_mode",name: "발송방식"},
        {id: "send_dt",name: "발송일시"},
        {id: "reg_dt",name: "등록일", data_type: 'date'},
    ];

    // render
    return (
        <div className={cx("listview")}>
            <ListTable
                colGroup={<ColGroup />}
                tableHead={tableHead}
                rowData={rowData}
                unit="개"
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