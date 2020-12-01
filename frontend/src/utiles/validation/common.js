export function isEmpty (value) {
    if (value === undefined || value === null || value === "" || String(value).trim().length < 1)
        return true;

    return false;
}

export function isEquals (value1, value2) {
    console.log("isEquals ============ ")
    console.log(value1)
    console.log(value2)
    if (value1 === undefined || value1 === null || value1 === "" || String(value1).trim().length < 1)
        return false;

    if (value2 === undefined || value2 === null || value2 === "" || String(value2).trim().length < 1)
        return false;

    if (value1 === value2)
        return true;
    
    return false;
}

// https://www.w3resource.com/javascript/form/email-validation.php
export function validEmail (value) {
    const regExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/; 
    
    if (value === undefined || value === null)
        return false;

    if (value.match(regExp)) 
        return true;
        
    return false;
}

export function validEmailLength (value) {
    if (value === undefined || value === null)
        return false;

    if (value.trim().length < 64) 
        return true;
        
    return false;
}

export function validEmailProvider (value) {
    // const regExp = /^[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; 
    const regExp = /^((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (value === undefined || value === null)
        return false;

    if (value.match(regExp)) 
        return true;
        
    return false;
}

export function validEmailProviderLength (value) {
    if (value === undefined || value === null)
        return false;

    if (value.trim().length < 255) 
        return true;
        
    return false;
}

// https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
export function validURL (value) {
    const regExp = /^[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; 
    
    if (value === undefined || value === null)
        return false;

    if (value.match(regExp)) 
        return true;
        
    return false;
}

export function validPhoneFirst (value) {
    const regExp = /^0[0-9]{2}$/; 
    
    if (value === undefined || value === null)
        return false;

    if (value.match(regExp)) 
        return true;
        
    return false;
}

export function validPhoneMiddle (value) {
    const regExp = /^[0-9]{3,4}$/; 
    
    if (value === undefined || value === null)
        return false;

    if (value.match(regExp)) 
        return true;
        
    return false;
}

export function validPhoneEnd (value) {
    const regExp = /^[0-9]{4}$/; 
    
    if (value === undefined || value === null)
        return false;

    if (value.match(regExp)) 
        return true;
        
    return false;
}

export function isNumber (value) {
    const regExp = /^[0-9]*$/; 
    
    if (value === undefined || value === null)
        return false;

    if (value.match(regExp)) 
        return true;
        
    return false;
}

export function checkByteOfValue (value) {
    let checkByte = 0;
    if(!isEmpty(value)) {
        checkByte = unescape(encodeURI(value)).length;
    }
    return checkByte;
}

export function validFileNameLength (value) {
    if (value === undefined || value === null)
        return false;

    if (unescape(encodeURI(value)).length < 255) 
        return true;
        
    return false;
}
