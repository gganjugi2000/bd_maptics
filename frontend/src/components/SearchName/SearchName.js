import React, {useCallback} from 'react';
import { Link, withRouter } from "react-router-dom";
import styles from './SearchName.module.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

// 컴포넌트 정의
const SearchName = ({rowData}) => {

    // render
    return (
        <div className={cx(rowData.type === 'normal' ? "comr_box": "coml_box")}>
            <div className={cx("boxtop")}>
                <div className={cx("Category")}>{rowData.title}</div>
            </div>

            <div className={cx("boxchlist2")}>
                <ul>
                    <li>
                        <div className={cx(rowData.type === 'normal' ? "inputbox" : "inputbox2", "margin10")}>
                            <input type="text" placeholder="Search.." style={{"width": "100%"}} />
                        </div>
                    </li>
                    <li>
                        <div className={cx("listtable")} style={{"height": "506px"}}>
                            <table>
                                <caption>Tables</caption>
                                <colgroup>
                                    <col width="*"/>
                                </colgroup>
                                <tbody>
                                    {rowData.list && rowData.list.map((item, i) => {
                                        return(
                                            <tr key={i}>
                                                <td className={ i%2 == 0 ? cx(rowData.type === 'normal' ? "grey" : "green") : ""}>
                                                    {rowData.type === 'normal' ? <span className={cx("txt")}>{item.name}</span> :
                                                        <label className={cx("check")}>
                                                            <input type="checkbox" name=""/>
                                                            <span className={cx("ico2")}></span>
                                                            <span className={cx("txt")}>{item.name}</span>
                                                        </label>
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SearchName;