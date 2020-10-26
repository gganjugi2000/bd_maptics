import { createAction, handleActions } from 'redux-actions';
// import axios from 'axios';
import {
    baseAxios,
    authAxios
} from '../lib/createAxiosInstance';
import { takeLatest } from 'redux-saga/effects';
import createRequestOfficeSaga, {
    createRequestOfficeActionTypes,
} from '../lib/createRequestOfficeSaga';
import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { initSessionState } from '../state';

// login : /user/login
// logout : 


const loginAPI = (user) => authAxios.post(`/user/login`, user);

// action type
const LOGIN = 'session/LOGIN';


// action types
const [
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
] = createRequestOfficeActionTypes('session/LOGIN');

const LOGOUT = 'session/LOGOUT';

// action create
export const listCompanyUser = createAction(LIST_COMPANY_USER); 
export const createCompanyUser = createAction(CREATE_COMPANY_USER);
export const getCompanyUser = createAction(GET_COMPANY_USER); 
export const updateCompanyUser = createAction(UPDATE_COMPANY_USER);
export const deleteCompanyUser = createAction(DELETE_COMPANY_USER); 
export const clearCompanyUserInfo = createAction(CLEAR_COMPANY_USER_INFO);
export const goToUsers = () => ({ type: GO_TO_USERS });

const forwardLocation = '/users';

function* goToUsersSaga() {
    console.log("goToUsersSaga =========================== ")
    const history = yield getContext('history');
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    console.log(history)
    console.log("-----------------------------------------------")
    history.push('/users');
}

function* clearSaga() {
    yield put({
        type: CLEAR_COMPANY_USER_INFO,
    })
}

const listCompanyUserSaga = createRequestOfficeSaga(LIST_COMPANY_USER, listCompanyUserAPI);
const createCompanyUserSaga = createRequestOfficeSaga(CREATE_COMPANY_USER, createCompanyUserAPI, forwardLocation);
const getCompanyUserSaga = createRequestOfficeSaga(GET_COMPANY_USER, getCompanyUserAPI);
const updateCompanyUserSaga = createRequestOfficeSaga(UPDATE_COMPANY_USER, updateCompanyUserAPI, forwardLocation);
const deleteCompanyUserSaga = createRequestOfficeSaga(DELETE_COMPANY_USER, deleteCompanyUserAPI, forwardLocation);

export function* userSaga() {
    yield takeLatest(LIST_COMPANY_USER, listCompanyUserSaga);
    yield takeLatest(CREATE_COMPANY_USER, createCompanyUserSaga);
    yield takeLatest(GET_COMPANY_USER, getCompanyUserSaga);
    yield takeLatest(UPDATE_COMPANY_USER, updateCompanyUserSaga);
    yield takeLatest(DELETE_COMPANY_USER, deleteCompanyUserSaga);
    // yield takeEvery(GO_TO_USERS, goToUsersSaga);
    // yield takeEvery(CLEAR_COMPANY_USER_INFO, clearSaga);
    // yield put(push('/users'));
}


const initState = initSessionState;

const userStore = handleActions(
    {
        [LOGIN_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            isAuth: true,
            token: data.result.data,
            // userInfo: {}
        }),
        [LOGIN_FAILURE]: (state, { payload: data }) => ({
            ...state,
            isAuth: false,
            token: null,
        }),
        [GET_COMPANY_USER_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            userInfo: data.result.data,
            // userList: []
        }),
        [UPDATE_COMPANY_USER_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            msg: data.result.data,
            // userList: []
        }),
        [DELETE_COMPANY_USER_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            msg: data.result.data,
            status: DELETE_COMPANY_USER_SUCCESS,
            // userList: []
        }),
        [CLEAR_COMPANY_USER_INFO]: (state) => ({
            ...state,
            userInfo: {},
        }),
    },
    initState
)

export default userStore;