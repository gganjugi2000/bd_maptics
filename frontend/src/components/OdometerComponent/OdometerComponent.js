import React from 'react';
import classNames from 'classnames/bind';
// import './OdometerComponent.module.css';
import styles from './OdometerComponent.module.css';
import Odometer from 'react-odometerjs';

// import 'odometer/themes/odometer-theme-default.css';
// import './OdometerComponent.module.css';

const cx = classNames.bind(styles);

// Format    -  Example
// (,ddd)    -  12,345,678
// (,ddd).dd -  12,345,678.09
// (.ddd),dd -  12.345.678,09
// ( ddd),dd -  12 345 678,09
// d         -  12345678

const OdometerComponent = ({value, format, duration}) => {
    return (
        <Odometer
            value={value}
            format={format}
            duration={duration}
        />
    );
};

OdometerComponent.defaultProps = {
    value : 0,
    format : '(,ddd)',
    duration: 100
}

export default OdometerComponent;
