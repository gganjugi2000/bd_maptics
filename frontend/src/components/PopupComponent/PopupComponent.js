import React from 'react';
import classNames from 'classnames/bind';
import styles from './PopupComponent.module.css';
import Button from '../ButtonComponent';

const cx = classNames.bind(styles);

const PopupComponent = React.forwardRef((props, ref) => {
    const { 
        id, 
        title,
        close,
        ...others
     } = props;

    return (
        <div className={cx("layer_container")} >
            <div className={cx("layer_root")} >
                <div className={cx("layer_pop")}>
                    <div className={cx("pop-layer")}>
                        <div className={cx("pop_title")}>{title}</div>
                        <div className={cx("pop_add_contents")}>{props.children}</div>
                    </div>
                    <div className={cx("close")} onClick={close}>Close</div>
                </div>
            </div>
        </div>
    );
});

export default PopupComponent;