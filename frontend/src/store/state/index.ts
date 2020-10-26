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

////////// user State //////////
////////////////////////////
export type UserState = {
    userList: any[],
    userInfo: {},
    forwardLocation: "/",
    status: string,
    totalCount: number
}

export const initUserState = {
    code: null,
    error: null,
    msg: null,
    userList: [],
    status: "",
    totalCount: 0
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