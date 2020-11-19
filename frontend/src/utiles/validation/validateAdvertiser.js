export function validAdvertiserId (value) {
    //영문, 혹은 영문+숫자 조합, 5자 이상
    const numberRegExp = /^(?!(?:[0-9]+)$)([a-zA-Z]|[0-9a-zA-Z]){5,}$/; 
    
    if (value === undefined || value === null)
        return false;

    if (value.match(numberRegExp)) 
        return true;
        
    return false;
}

export function validAdvertiserName (value) {
    const numberRegExp = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|A-Za-z]{2,}$/; 
    
    if (value === undefined || value === null)
        return false;

    if (value.match(numberRegExp)) 
        return true;
        
    return false;
}

export function validAdvertiserMngName (value) {
    const numberRegExp = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|A-Za-z]{2,}$/; 
    
    if (value === undefined || value === null)
        return false;

    if (value.match(numberRegExp)) 
        return true;
        
    return false;
}
