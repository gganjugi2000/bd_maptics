import React from 'react';
import classNames from 'classnames/bind';
import styles from './ButtonComponent.module.css';

const cx = classNames.bind(styles);

const ButtonComponent = React.forwardRef((props, ref) => {
    const { 
        id, 
        type,
        onClick,
        ...others
     } = props;

    return (
        <button 
            type="button"
            className={type === "search" ? cx("btn_search") 
            : (type === "create" ? cx("btn_create") 
            : (type === "update" ? cx("btn_update") 
            : (type === "delete" ? cx("btn_delete") 
            : (type === "close" ? cx("btn_close") 
            : (type === "btn_black" ? cx("btn_black") 
            : (type === "btn_gray" ? cx("btn_gray") 
            : (type === "btn_small" ? cx("btn_small") 
            : cx("btn_normal"))))))))}
            onClick={onClick} 
            ref={ref}
            {...others}
        >
            {props.children}
        </button>
    );
});

export default ButtonComponent;