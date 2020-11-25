import React from 'react';
import classNames from 'classnames/bind';
import styles from './InputTextArea.module.css';
import {
    Tooltip,
} from 'react-tippy';

const cx = classNames.bind(styles);

const InputTextArea = React.forwardRef((props, ref) => {
    const { 
        id, 
        label, 
        rows, 
        cols, 
        maxLength, 
        tip, 
        placeholer, 
        value, 
        caution,
        maxByte,
        maxByteLabel,
        currentByte,
        onChange,
        styleClass,
        ...others
     } = props;


    return (
        <>
            <div style={{float: 'left', width: '100%'}}>
                <textarea
                    id={id}
                    rows={rows}
                    cols={cols}
                    maxLength={maxLength}
                    placeholder={placeholer}
                    value={value || ""}
                    onChange={onChange}
                    className={caution !== undefined && caution !== "" && caution !== " " ? cx("intextarea_caution") : cx("intextarea")} 
                    ref={ref}
                    {...others}
                >
                    {value}
                </textarea>
                {maxByteLabel ? 
                    <div style={{display: 'inline-block', height: '100%', verticalAlign: 'bottom', margin: "5px"}}>
                        {currentByte}/{maxByte} Byte
                    </div>
                : null}
            </div>
            {caution !== "" && caution !== " " ? <p className={cx("caution")}>{caution}</p> : null}
        </>
    );

});

// default props 지정
InputTextArea.defaultProps = {
    rows: 20,
    maxLength: 1000,
};

export default InputTextArea;