///////// auth State //////////
////////////////////////////
export type AuthState = {
    code: string,
    error: string,   
    msg: string,
    isValidateToken: string,
    tokenInfo: string,
}

export const initAuthState = {
    code: null,
    error: null,
    msg: null,
    isValidateToken: true,
    tokenInfo: null,
}

////////// sample user State //////////
////////////////////////////
export type SampleUserState = {
    userList: any[],
    userInfo: {},
    forwardLocation: "/",
    status: string,
}

export const sampleInitUserState = {
    code: null,
    error: null,
    msg: null,
    userList: [],
    status: "",
}

////////// session State //////////
////////////////////////////
export type SessionState = {
    isAuth: boolean,
    token: string,
}

export const initSessionState = {
    isAuth: false,
    token: null,
}

////////// advertiser State //////////
////////////////////////////
export type AdvertiserState = {
    advertiserList: any[],
    advertiserInfo: {},
    existId: number,
    status: string,
    totalCount: number,
    searchCount: number,
}

export const initAdvertiserState = {
    code: null,
    error: null,
    msg: null,
    advertiserList: [],
    advertiserInfo: {},
    existId: -1,
    status: "",
    totalCount: 0,
    searchCount: 0
}

////////// campaign State //////////
////////////////////////////
export type CampaignState = {
    campaignList: any[],
    campaignInfo: {},
    campaignAcknlg: any[],
    status: string,
    totalCount: number,
    searchCount: number,
}

export const initCampaignState = {
    code: null,
    error: null,
    msg: null,
    campaignList: [],
    campaignInfo: {},
    campaignAcknlg: [],
    existId: -1,
    status: "",
    totalCount: 0,
    searchCount: 0
}

////////// user State //////////
////////////////////////////
export type UserState = {
    userList: any[],
    userInfo: {},
    forwardLocation: "/",
    status: string,
    totalCount: number,
    searchCount: number,
}

export const initUserState = {
    code: null,
    error: null,
    msg: null,
    userList: [],
    status: "",
    totalCount: 0,
    searchCount: 0
}

export type ListState = {
    code: string,
    error: string,
    msg: string,
    limit: number,
    nowSector: number,
    nowPage: number,
    rowList: any[]
}

export const initListState = {
    code: null,
    error: null,
    msg: null,
    limit: 10,
    nowSector: 1,
    nowPage: 1,
    rowList: []
}