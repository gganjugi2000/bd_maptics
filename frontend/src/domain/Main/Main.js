import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import styles from './Main.module.css';
import classNames from 'classnames/bind';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SearchName from '../../components/SearchName/SearchName';


const cx = classNames.bind(styles);


// 컴포넌트 정의
const List = () => {
	const dispatch = useDispatch()
	// state 정의

	// life cycle
	useEffect(() => {
		// 데이터 불러오기
	}, [dispatch]) // page loading

	const rowCompany = {
		title : '고객사 / Corp ID',
		list :[
			{name: "삼성전자", id: "0"},
			{name: "무신사", id: "0"},
			{name: "벤츠", id: "0"},
			{name: "BMW", id: "0"},
			{name: "LG", id: "0"},
			{name: "삼성전자", id: "0"},
			{name: "무신사", id: "0"},
			{name: "벤츠", id: "0"},
			{name: "BMW", id: "0"},
			{name: "LG", id: "0"},
			{name: "삼성전자", id: "0"},
			{name: "무신사", id: "0"},
			{name: "벤츠", id: "0"},
			{name: "BMW", id: "0"},
			{name: "LG", id: "0"},
			{name: "삼성전자", id: "0"},
			{name: "무신사", id: "0"},
			{name: "벤츠", id: "0"},
			{name: "BMW", id: "0"},
			{name: "LG", id: "0"},
			{name: "삼성전자", id: "0"},
			{name: "무신사", id: "0"},
			{name: "벤츠", id: "0"},
			{name: "BMW", id: "0"},
			{name: "LG", id: "0"}
		]
	};

	const rowGroup = {
		title : 'Group ID',
		list :[
			{name: "삼성전자", id: "0"},
			{name: "무신사", id: "0"},
			{name: "벤츠", id: "0"},
			{name: "BMW", id: "0"},
			{name: "LG", id: "0"},
			{name: "삼성전자", id: "0"},
			{name: "무신사", id: "0"},
			{name: "벤츠", id: "0"},
			{name: "BMW", id: "0"},
			{name: "LG", id: "0"},
			{name: "삼성전자", id: "0"},
			{name: "무신사", id: "0"},
			{name: "벤츠", id: "0"},
			{name: "BMW", id: "0"},
			{name: "LG", id: "0"},
			{name: "삼성전자", id: "0"},
			{name: "무신사", id: "0"},
			{name: "벤츠", id: "0"},
			{name: "BMW", id: "0"},
			{name: "LG", id: "0"},
			{name: "삼성전자", id: "0"},
			{name: "무신사", id: "0"},
			{name: "벤츠", id: "0"},
			{name: "BMW", id: "0"},
			{name: "LG", id: "0"}
		]
	};
	const rowCampain = {
		title : '캠페인명',
		type : 'normal',
		list :[
			{name: "[까스텔바작]  SK텔레콤과 까스텔바작이 함께하는 이벤트", id: "0"},
			{name: "[H&M] SK텔레콤과 H&M MAN이 함께하는 특별한", id: "0"},
			{name: "[꾸까] SK텔레콤과 꾸까가 드리는 봄 선물 이벤트 <꽃 배달 서비스>", id: "0"},
			{name: "BMW", id: "0"},
			{name: "LG", id: "0"},
			{name: "삼성전자", id: "0"},
			{name: "무신사", id: "0"},
			{name: "벤츠", id: "0"},
			{name: "BMW", id: "0"},
			{name: "LG", id: "0"},
			{name: "삼성전자", id: "0"},
			{name: "무신사", id: "0"},
			{name: "벤츠", id: "0"},
			{name: "BMW", id: "0"},
			{name: "LG", id: "0"},
			{name: "삼성전자", id: "0"},
			{name: "무신사", id: "0"},
			{name: "벤츠", id: "0"},
			{name: "BMW", id: "0"},
			{name: "LG", id: "0"},
			{name: "삼성전자", id: "0"},
			{name: "무신사", id: "0"},
			{name: "벤츠", id: "0"},
			{name: "BMW", id: "0"},
			{name: "LG", id: "0"}
		]
	};
	// render
	return (
		<div className={cx("container", "cbp-spmenu-push-toright")}>
			<div className={cx("contents")}>
				<Header />
				<div className={cx("ats_com_box", "mt30")}>
					<SearchName rowData={rowCompany} />
					<SearchName rowData={rowGroup} />
					<SearchName rowData={rowCampain} />
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default List;