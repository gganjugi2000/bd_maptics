import React from 'react';
import styles from './AdvertiserSearchList.module.css';
import classNames from 'classnames/bind';
import ListTable from '../../../../components/ListTableComponent/ListTable';

const cx = classNames.bind(styles);

// 컴포넌트 정의
const AdvertiserSearchList = ({ 
        rowData, 
        totalCount, 
        searchCount, 
        handleAdvertiserDispatch,
        handleAdvertiserCallback
    }) => {

    const ColGroup = () => {
        return (
            <colgroup>
                <col width={"10%"} />
                <col width={"20%"} />
                <col width={"10%"} />
                <col width={"10%"} />
                <col width={"20%"} />
                <col width={"15%"} />
            </colgroup>
        )
    }

    const tableHead = [
        {id: "no",name: "번호" },
        {id: "advts_id", type: "callback", name: "아이디"},
        {id: "advts_nm",name: "광고주명"},
        {id: "advts_mng_nm",name: "담당자명"},
        {id: "email_addr",name: "이메일 계정"},
        {id: "phone_no",name: "연락처"},
    ];

    const tableRowOptions = [
        { value: '5', label: '5개' },
        { value: '10', label: '10개' },
        { value: '20', label: '20개' }
     ];

    // render
    return (
        <div className={cx("listview")}>
            <ListTable
                colGroup={<ColGroup />}
                tableHead={tableHead}
                rowData={rowData}
                unit="명"
                tableRowOptions={tableRowOptions}
                totalCount={totalCount}
                searchCount={searchCount}
                handleTableDispatch={handleAdvertiserDispatch}
                handleTableCallback={handleAdvertiserCallback}
            />
        </div>
    )
}

export default AdvertiserSearchList;