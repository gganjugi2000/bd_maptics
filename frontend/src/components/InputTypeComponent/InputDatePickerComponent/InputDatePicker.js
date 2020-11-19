import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import classNames from 'classnames/bind';
import 'react-datepicker/dist/react-datepicker.css'
import styles from './InputDatePicker.module.css';

const cx = classNames.bind(styles);

const InputDatePicker = React.forwardRef((props, ref) => {
    const { 
        id, 
        label, 
        selectedDate, 
        isClearable, 
        handleChangeDate,
        styleClass,
        ...others
    } = props; 

    const [startDate, setStartDate] = useState(new Date());

    const changeDate = (date) => {
        setStartDate(date);
        if(handleChangeDate){
            handleChangeDate(date);
        } 
    }

    // className={cx("dateInputType")}            
    // render
    if(selectedDate !== undefined){
        setStartDate(selectedDate);
    }

    return (
        <div className={cx("input-container")}>
            {label && <div className={cx("input-label")}><label>{label}</label></div>}
            <DatePicker
                id={id}
                selected={selectedDate}
                onChange={date => changeDate(date)}
                isClearable={isClearable}
                dateFormat="yyyy/MM/dd"
                ref={ref}
                {...others}
            />
        </div>
        
    );
});

// default props 지정
InputDatePicker.defaultProps = {
    isClearable: true,
};

export default InputDatePicker;