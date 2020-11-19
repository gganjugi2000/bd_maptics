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
        onChange,
        styleClass,
        ...others
     } = props;

    return (
        <div className={cx("input-textarea-container")}>
            {label && <div className={cx("input-label")}><label>{label}</label></div>}
            {tip ? (
            <Tooltip
                title={tip}
                position="top"
                trigger="mouseenter"
                arrow="true"
                sticky="true"
            >
                <textarea
                    id={id}
                    rows={rows}
                    cols={cols}
                    maxLength={maxLength}
                    placeholder={placeholer}
                    onChange={onChange}
                    className={styleClass ? cx(styleClass) : cx("intextarea")} 
                    ref={ref}
                    {...others}
                >
                    {value}
                </textarea>
            </Tooltip>
            ) : (
            <textarea
                id={id}
                rows={rows}
                cols={cols}
                maxLength={maxLength}
                placeholder={placeholer}
                value={value || ""}
                onChange={onChange}
                className={cx("intextarea")} 
                ref={ref}
                {...others}
            >
                {value}
            </textarea>
            )}
        </div>
    );

})

// default props 지정
InputTextArea.defaultProps = {
    rows: 20,
    cols: 100,
    maxLength: 100,
};

export default InputTextArea;