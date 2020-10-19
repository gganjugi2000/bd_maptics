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

////////// user State //////////
////////////////////////////
export type UserState = {
    userList: any[],
    userInfo: {},
    forwardLocation: "/",
    status: string,
}

export const initUserState = {
    code: null,
    error: null,
    msg: null,
    userList: [],
    status: "",
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