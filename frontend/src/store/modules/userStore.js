import { createAction, handleActions } from 'redux-actions';
// import axios from 'axios';
import {
    // baseAxios,
    authAxios
} from '../lib/createAxiosInstance';
import { takeLatest, takeEvery, getContext } from 'redux-saga/effects';
import createRequestOfficeSaga, {
    createRequestOfficeActionTypes,
} from '../lib/createRequestOfficeSaga';
import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { initUserState } from '../state';
// import history from '../../history';


// 목록 : /user/getInfoList
// 입력 : /user/addInfo
// 삭제 : /user/removeInfo
// 수정 : /user/updateInfo
// 상세 : /user/getInfoDetail


const listCompanyUserAPI = (user) => {
    return (
        authAxios.get(
            `/user/getInfoList/${user.cur}/${user.page_size}`, user)
    );
};
const createCompanyUserAPI = (user) => {
    return (
        authAxios.post('/user/addInfo',user)
    );
};
const getCompanyUserAPI = (userId) => {
    return (
        authAxios.post('/user/getInfoDetail',{user_seq: userId})
    );
};
// const getCompanyUserAPI = (userId) => axios.get(`/user/getInfoDetail/${userId}`, {
//     headers: { 
//         'x-apikey': 'API_KEY',
//         'Access-Control-Allow-Origin': '*',
//         'Content-Type': 'application/json'
//     },
// });
const updateCompanyUserAPI = (user) => {
    return authAxios.post(`/user/modifyInfo`, user, {
        headers: { 
            'x-apikey': 'API_KEY',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
    });
};
// const updateCompanyUserAPI = (user) => {
//     return axios.put(`/user/modifyInfo`, user, {
//         headers: { 
//             'x-apikey': 'API_KEY',
//             'Access-Control-Allow-Origin': '*',
//             'Content-Type': 'application/json'
//         },
//     });
// };
const deleteCompanyUserAPI = (userId) => {
    return authAxios.post('/user/removeInfo',{user_seq: userId}, {
        headers: { 
            'x-apikey': 'API_KEY',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
    });
};
// const deleteCompanyUserAPI = (userId) => authAxios.delete(`/user/removeInfo/${userId}`, {
//     headers: { 
//         'x-apikey': 'API_KEY',
//         'Access-Control-Allow-Origin': '*',
//         'Content-Type': 'application/json'
//     },
// });

// test file upload
const createFileCompanyUserAPI = (user) => {
    // const formData = new FormData();

    // formData.append("user_id", user.user_id)
    // formData.append("user_email", user.user_email)
    // formData.append("file", user.user_file);
    return authAxios.post('/file/upload',user, {
        headers: { 
            'Content-Type': 'multipart/form-data'
        }
    });
};

// const updateCompanyUserAPI = (user) => {
//     const formData = new FormData();
//     formData.append("user_id", user.user_id)
//     formData.append("user_email", user.user_email)
//     formData.append("file", user.user_file);
//     return authAxios.post('/file/upload',formData, {
//         headers: { 
//             'Content-Type': 'multipart/form-data'
//         }
//     });
// };

// action types

const [
    LIST_COMPANY_USER,
    LIST_COMPANY_USER_SUCCESS,
    LIST_COMPANY_USER_FAILURE
] = createRequestOfficeActionTypes('user/LIST_COMPANY_USER');

const [
    CREATE_COMPANY_USER,
    CREATE_COMPANY_USER_SUCCESS,
    CREATE_COMPANY_USER_FAILURE
] = createRequestOfficeActionTypes('user/CREATE_COMPANY_USER');
const [
    GET_COMPANY_USER,
    GET_COMPANY_USER_SUCCESS,
    GET_COMPANY_USER_FAILURE
] = createRequestOfficeActionTypes('user/GET_COMPANY_USER');
const [
    UPDATE_COMPANY_USER,
    UPDATE_COMPANY_USER_SUCCESS,
    UPDATE_COMPANY_USER_FAILURE
] = createRequestOfficeActionTypes('user/UPDATE_COMPANY_USER');
const [
    DELETE_COMPANY_USER,
    DELETE_COMPANY_USER_SUCCESS,
    DELETE_COMPANY_USER_FAILURE
] = createRequestOfficeActionTypes('user/DELETE_COMPANY_USER');

const GO_TO_USERS = 'user/GO_TO_USERS';
const CLEAR_COMPANY_USER_INFO = 'user/CLEAR_COMPANY_USER_INFO';

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


const initState = initUserState;

const userStore = handleActions(
    {
        [GO_TO_USERS]: (state, { payload: data }) => ({
            ...state,
            forwardLocation: data,
            // userInfo: {}
        }),
        [LIST_COMPANY_USER_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            userList: data.result.data,
            totalCount: data.result.totalCount,
            // userInfo: {}
        }),
        [CREATE_COMPANY_USER_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            msg: data.result.data,
            status: CREATE_COMPANY_USER_SUCCESS,
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