export function validCampaignId (value) {
    //영문,영문+숫자 조합,5자 이상
    const regExp = /^(?!(?:[0-9]+)$)([a-zA-Z]|[0-9a-zA-Z]){5,}$/; 
    
    if (value === undefined || value === null)
        return false;

    if (value.match(regExp)) 
        return true;
        
    return false;
}

export function validCampaignName (value) {
    const regExp = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|A-Za-z]{2,}$/; 
    
    if (value === undefined || value === null)
        return false;

    if (value.match(regExp)) 
        return true;
        
    return false;
}

export function validCampaignMngName (value) {
    const regExp = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|A-Za-z]{2,}$/; 
    
    if (value === undefined || value === null)
        return false;

    if (value.match(regExp)) 
        return true;
        
    return false;
}
