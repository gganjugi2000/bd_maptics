import React from 'react';
import { Link } from 'react-router-dom';
import styles from './UserList.module.css';
import classNames from 'classnames/bind';
import ListTable from '../../../components/ListTableComponent/ListTable';

const cx = classNames.bind(styles);

// 컴포넌트 정의
const UserList = ({ rowData, totalCount, handleUserDispatch }) => {

    const ColGroup = () => {
        return (
            <colgroup>
                <col width={"10%"} />
                <col width={"10%"} />
                <col width={"10%"} />
                <col width={"10%"} />
                <col width={"10%"} />
                <col width={"15%"} />
                <col width={"15%"} />
                <col width={"10%"} />
                <col width={"10%"} />
            </colgroup>
        )
    }

    const tableHead = [
            {id: "no",name: "순번" },
            {type: "link", id: "user_seq", label_id: "user_id", name: "사용자 아이디", to:"/users/"},
            {id: "comp_nm",name: "상호명"},
            {id: "comp_no",name: "사업자번호"},
            {id: "phone_no",name: "전화번호"},
            {id: "addr",name: "주소"},
            {id: "email_addr",name: "이메일"},
            {id: "mobphone_no",name: "핸드폰"},
            {id: "reg_dt",name: "등록일자"}
        ];

    // render
    return (
        <div className={cx("listview")}>
            <ListTable
                colGroup={<ColGroup />}
                tableHead={tableHead}
                rowData={rowData}
                totalCount={totalCount}
                handleTableDispatch={handleUserDispatch}
            />
        </div>
    )
}

export default UserList;