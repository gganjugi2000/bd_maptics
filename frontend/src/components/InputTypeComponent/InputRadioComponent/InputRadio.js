import React from 'react';
import classNames from 'classnames/bind';
import styles from './InputRadio.module.css';
import {
    Tooltip,
} from 'react-tippy';

const cx = classNames.bind(styles);

const InputRadio = React.forwardRef((props, ref) => {
    const { 
        id, 
        label, 
        tip,
        value,
        name,
        checked, 
        onChange,
        styleClass,
        ...others
     } = props;

    return (
        <div className={cx("input-container")}>
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
                    type="radio"
                    value={value}
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    className={styleClass ? cx(styleClass) : cx("input-text")} 
                    ref={ref}
                    {...others}
                />
            </Tooltip>
            ) : (
            <input
                id={id}
                type="radio"
                value={value}
                name={name}
                checked={checked}
                onChange={onChange}
                className={cx("input-text")} 
                ref={ref}
                {...others}
            />)}
            {label && <div className={cx("input-label")}><label>{label}</label></div>}
        </div>
    );
});

InputRadio.defaultProps = {
    checked: false,
};

export default InputRadio;