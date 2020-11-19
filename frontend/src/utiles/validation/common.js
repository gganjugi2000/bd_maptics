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

export function validEmailProvider (value) {
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