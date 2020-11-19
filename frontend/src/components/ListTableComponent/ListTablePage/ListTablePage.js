import React, { useState } from 'react';
import styles from './ListTablePage.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

// 컴포넌트 정의
const ListTablePage = ({ nowPage, limit, totalCount, handleChangePage }) => {

    const [nowSector, setNowSector] = useState(1);
    let pages = 0;
    let pageLength = 0;

    const handleMove = (type) => {
        if (type == 'first') {
            // handleChangePage(1);
            setNowSector(1);
        } else if (type == 'last') {
            setNowSector(Math.ceil(totalCount/(limit*10)));
        } else if (type == 'prev') {
            if(nowSector > 1) {
                pageLength = 0;
                setNowSector(nowSector - 1);
            }
        } else if (type == 'next') {
            if(nowSector*limit*10 < totalCount) {
                pageLength = 0;
                setNowSector(nowSector + 1);
            }
        }
    }

    const handleMovePage = (e) => {
        let page = e.target.getAttribute('data-page');
        handleChangePage(page);
    }

    // render
    return (
        <div className={cx("listPaging")}>
            <ul>
                <li className={cx("first")} onClick={()=> handleMove('first')}>&lt;&lt;</li>
                <li className={cx("prev")} onClick={()=> handleMove('prev')}>&lt;</li>
                    {[...Array(totalCount)].map((item, i) => {
                        if( i % limit == 0 && i > (nowSector-1)*10) {
                            pages = (nowSector-1) * 10 + pageLength + 1
                            let maxPage = Math.ceil((totalCount - limit*(nowSector-1)*10)/limit)
                            if(pageLength < maxPage && pageLength < 10) {
                                pageLength++
                                return (
                                    <li key={pages} onClick={handleMovePage} data-page={pages}>{pages}</li>
                                );
                            }
                        }
                    })}
                <li className={cx("next")} onClick={()=> handleMove('next')}>&gt;</li>
                <li className={cx("last")} onClick={()=> handleMove('last')}>&gt;&gt;</li>
            </ul>
        </div>
    )
}

export default ListTablePage;