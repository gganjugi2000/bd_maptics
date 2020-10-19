import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import styles from './List.module.css';
import classNames from 'classnames/bind';
import ListSearch from '../../components/List/ListSearch';
import ListRow from '../../components/List/ListRow';
import ListPaging from '../../components/List/ListPaging'


const cx = classNames.bind(styles);


// 컴포넌트 정의
const List = () => {
	const dispatch = useDispatch()
	// state 정의

	// life cycle
	useEffect(() => {
		// 데이터 불러오기
	}, [dispatch]) // page loading

	const rowData = [
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "1", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "1", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "1", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "1", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "1", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"},
		{name: "리스트 입니다!!!", id: "0", url: "/list/", date: "2020-10-10 14:22", author: "홍OO"}
	];
	// render
	return (
		<div className={cx("listview")}>
			<ListSearch />
			<ListRow rowData={rowData} />
			<ListPaging rowData={rowData} />
		</div>
	)
}

export default List;