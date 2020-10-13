export function validUserID (value) {
    const numberRegExp = /^[0-9\b]+$/; 
    
    if (value === undefined || value === null)
        return false;

    if (value.match(numberRegExp)) 
        return true;
        
    return false;
}

export function validUserEmail (value) {
    const emailRegExp = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
    
    if (value === undefined || value === null)
        return false;

    if (value.match(emailRegExp)) 
        return true;
        
    return false;
}