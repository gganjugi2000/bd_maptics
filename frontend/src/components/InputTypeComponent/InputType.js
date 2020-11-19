import React from 'react';
import InputText from './InputTextComponent/InputText';
import InputPassword from './InputPasswordComponent/InputPassword';
import InputSelect from './InputSelectComponent/InputSelect';
import InputTextArea from './InputTextAreaComponent/InputTextArea';
import InputCheckBox from './InputCheckBoxComponent/InputCheckBox';
import InputRadio from './InputRadioComponent/InputRadio';

const InputType = React.forwardRef((props, ref) => {
    const {
        type, 
        id, 
        label, 
        tip,
        size, 
        placeholer, 
        value, 
        isClearable,
        isSearchable,
        isMulti,
        options,
        rows, 
        cols, 
        maxLength,
        checked,
        name,
        styleClass,
        onChange,
        ...others
    } = props;

    // render
    return (
        <>
            {type === undefined || type === null || type === "text"? (
                <InputText 
                    id={id}
                    size={size}
                    tip={tip}
                    label={label}
                    placeholder={placeholer}
                    value={value}
                    onChange={onChange}
                    styleClass={styleClass}
                    ref={ref}
                    {...others}
                />
            ) : (type === "password" ? (
                <InputPassword
                    id={id}
                    size={size}
                    tip={tip}
                    label={label}
                    placeholder={placeholer}
                    value={value}
                    onChange={onChange}
                    styleClass={styleClass}
                    ref={ref}
                    {...others}
                />
            ) : (type === "select" ? (
                <InputSelect
                    id={id}
                    value={value}
                    label={label}
                    tip={tip}
                    onChange={onChange}
                    options={options}
                    isClearable={isClearable}
                    isSearchable={isSearchable}
                    isMulti={isMulti}
                    styleClass={styleClass}
                    ref={ref}
                    {...others}
                />
            ) : (type === "textarea" ? (
                <InputTextArea
                    id={id}
                    value={value}
                    label={label}
                    tip={tip}
                    onChange={onChange}
                    rows={rows}
                    cols={cols}
                    maxLength={maxLength}
                    styleClass={styleClass}
                    ref={ref}
                    {...others}
                />
            ) : (type === "checkbox" ? (
                <InputCheckBox
                    id={id}
                    label={label}
                    tip={tip}
                    onChange={onChange}
                    checked={checked}
                    styleClass={styleClass}
                    ref={ref}
                    {...others}
                />
            ) : (type === "radio" ? (
                <InputRadio
                    id={id}
                    label={label}
                    tip={tip}
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={onChange}
                    styleClass={styleClass}
                    ref={ref}
                    {...others}
                />
            ) : (
                null
            ))))))}
        </>
    )
});

export default InputType;