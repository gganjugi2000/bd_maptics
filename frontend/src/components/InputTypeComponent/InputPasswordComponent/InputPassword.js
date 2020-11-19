import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './InputPassword.module.css';
import {
    Tooltip,
} from 'react-tippy';

const cx = classNames.bind(styles);

const InputPassword = React.forwardRef((props, ref) => {
    const { 
        id, 
        label, 
        size, 
        tip, 
        placeholer, 
        value, 
        onChange,
        styleClass,
        ...others
    } = props; 

    const [isShow, setIsShow] = useState(false);
    const passwordShow = () => {
        setIsShow(!isShow);
    }

    return (
        <div className={cx("input-container")}>
            {label && <div className={cx("input-label")}><label>{label}</label></div>}
            {tip ? (
            <Tooltip
                title={tip}
                position="top"
                trigger="mouseenter"
                arrow="true"
                sticky="true"
            >
                <input
                    id={id}
                    type={isShow ? "text" : "password"}
                    size={size}
                    placeholder={placeholer}
                    value={value || ""}
                    onChange={onChange}
                    className={styleClass ? cx(styleClass) : cx("input-text")} 
                    ref={ref}
                    {...others}
                />
                <span onClick={passwordShow}>{isShow ? 'Hide' : 'Show'}</span>
            </Tooltip>
            ) : (
                <>
                    <input
                        id={id}
                        type={isShow ? "text" : "password"}
                        size={size}
                        placeholder={placeholer}
                        value={value || ""}
                        onChange={onChange}
                        className={cx("input-text")} 
                        ref={ref}
                        {...others}
                    />
                    <span onClick={passwordShow}>{isShow ? 'Hide' : 'Show'}</span>
                </>
            )}
        </div>
    );
});

export default InputPassword;