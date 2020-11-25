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
        <div style={{float: 'left', display: 'inline-block', margin: '0px 10px'}} >
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
                    className={cx("radio")} 
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
                    ref={ref}
                    {...others}
                />
                )}
            {label && <label style={{margin: '5px 5px'}}>{label}</label>}
        </div>
    );
});

InputRadio.defaultProps = {
    checked: false,
};

export default InputRadio;