import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import classNames from 'classnames/bind';
import styles from './InputSelect.module.css';

const cx = classNames.bind(styles);

// ============================================================================
// react-select components issue
// import Select from 'react-select';
// ----------------------------------------------------------------------------
// issue) warning
// 1)
// Warning: Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code
// ----------------------------------------------------------------------------
// 2)
// The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.
// ============================================================================

// styles={cx("input-select")}
const InputSelect = React.forwardRef((props, ref) => {
    const {
        id, 
        label, 
        value, 
        options, 
        isMulti,
        isClearable,
        isSearchable,
        onChange,
        styleClass,
        ...others
    } = props;

    // const [singleSelect, setSingleSelect] = useState(null);
    const [multiSelect, setMultiSelect] = useState([]);

    // useEffect(() => {
    //     console.log("useEffect() setMultiSelect ============================= ")
    //     console.log(value)
    //     if(isMulti) {
    //         setMultiSelect(value);
    //     }
    // }, [multiSelect])
    // useEffect(() => {
    //     console.log("useEffect() setSingleSelect ============================= ")
    //     console.log(value)
    //     if(!isMulti) {
    //         setSingleSelect(value);
    //     }
    // }, [singleSelect])

    const setSingleSelectValue = (e) => {
        // setSingleSelect(e);
        onChange(e);
    }

    const setMultiSelectValue = (e) => {
        // setMultiSelect(e);
        onChange(e);
    }

    console.log("Select value ==================== ")
    console.log(value)

    return (
        <div className={cx("input-control")}>
            {label && <label className={cx("input-label")}>{label}</label>}
            {isMulti ? (
                <Select
                    id={id}
                    value={multiSelect}
                    onChange={setMultiSelectValue}
                    options={options}
                    isClearable={isClearable}
                    isSearchable={isSearchable}
                    isMulti={isMulti}
                    className={cx("inselect")}
                    ref={ref}
                    {...others}
                />
            ) : (
                <Select
                    id={id}
                    value={options.filter(option => value !== null && option.value === value.value)}
                    // value={value}
                    // defaultValue={value}
                    onChange={setSingleSelectValue}
                    options={options}
                    isClearable={isClearable}
                    isSearchable={isSearchable}
                    className={cx("inselect")}
                    ref={ref}
                    {...others}
                />
                // <select name={id} id={id} className={cx("input-select")}>
                //     {options && options.map((item, i) => {
                //         return (
                //             <option key={i} value={item.value}>{item.label}</option>    
                //         );
                //     })}
                // </select>
            )}
        </div>
    );
});

// default props 지정
InputSelect.defaultProps = {
    isClearable: true,
    isSearchable: true,
    isMulti: false, 
    options: [],
};

export default InputSelect;