import React from 'react';
import classNames from 'classnames/bind';
import styles from './InputText.module.css';

const cx = classNames.bind(styles);

const InputText = React.forwardRef((props, ref) => {
    const { 
        id, 
        size, 
        caution,
        placeholer, 
        value, 
        onChange,
        ...others
     } = props;

    return (
        <>
            <input
                    id={id}
                    type="text"
                    size={size}
                    placeholder={placeholer}
                    value={value || ""}
                    onChange={onChange}
                    className={caution !== "" && caution !== " " ? cx("intext_caution") : cx("intext")} 
                    ref={ref}
                    {...others}
            />
            {props.children}
            {caution !== "" && caution !== " " ? <p className={cx("caution")}>{caution}</p> : null}
        </>
    );
});

InputText.defaultProps = {
    size: 15,
    caution: ""
}

export default InputText;