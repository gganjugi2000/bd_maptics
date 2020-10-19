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