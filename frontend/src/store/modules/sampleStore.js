import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
import { takeLatest, takeEvery, getContext } from 'redux-saga/effects';
import createRequestOfficeSaga, {
    createRequestOfficeActionTypes,
} from '../lib/createRequestOfficeSaga';
import { call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { sampleInitUserState } from '../state';
// import history from '../../history';


// 목록 : /sample/getInfoList
// 입력 : /sample/addInfo
// 삭제 : /sample/removeInfo
// 수정 : /sample/updateInfo
// 상세 : /sample/getInfoDetail


const sampleListCompanyUserAPI = () => axios.get(`/sample/getInfoList`, {
    headers: { 
        'x-apikey': 'API_KEY',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    },
});
const sampleCreateCompanyUserAPI = (user) => {
    return axios.post('/sample/addInfo',user, {
        headers: { 
            'x-apikey': 'API_KEY',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
    });
};
const sampleGetCompanyUserAPI = (userId) => {
    return axios.post('/sample/getInfoDetail',{id: userId}, {
        headers: { 
            'x-apikey': 'API_KEY',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
    });
};
// const getCompanyUserAPI = (userId) => axios.get(`/sample/getInfoDetail/${userId}`, {
//     headers: { 
//         'x-apikey': 'API_KEY',
//         'Access-Control-Allow-Origin': '*',
//         'Content-Type': 'application/json'
//     },
// });
const sampleUpdateCompanyUserAPI = (user) => {
    return axios.post(`/sample/modifyInfo`, user, {
        headers: { 
            'x-apikey': 'API_KEY',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
    });
};
// const updateCompanyUserAPI = (user) => {
//     return axios.put(`/sample/modifyInfo`, user, {
//         headers: { 
//             'x-apikey': 'API_KEY',
//             'Access-Control-Allow-Origin': '*',
//             'Content-Type': 'application/json'
//         },
//     });
// };
const sampleDeleteCompanyUserAPI = (userId) => {
    return axios.post('/sample/removeInfo',{id: userId}, {
        headers: { 
            'x-apikey': 'API_KEY',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
    });
};
// const deleteCompanyUserAPI = (userId) => axios.delete(`/sample/removeInfo/${userId}`, {
//     headers: { 
//         'x-apikey': 'API_KEY',
//         'Access-Control-Allow-Origin': '*',
//         'Content-Type': 'application/json'
//     },
// });

// test file upload
const sampleCreateFileCompanyUserAPI = (user) => {
    // const formData = new FormData();

    // formData.append("user_id", user.user_id)
    // formData.append("user_email", user.user_email)
    // formData.append("file", user.user_file);
    return axios.post('/file/upload',user, {
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
//     return axios.post('/file/upload',formData, {
//         headers: { 
//             'Content-Type': 'multipart/form-data'
//         }
//     });
// };

// action types

const [
    SAMPLE_LIST_COMPANY_USER,
    SAMPLE_LIST_COMPANY_USER_SUCCESS,
    SAMPLE_LIST_COMPANY_USER_FAILURE
] = createRequestOfficeActionTypes('sample/LIST_COMPANY_USER');

const [
    SAMPLE_CREATE_COMPANY_USER,
    SAMPLE_CREATE_COMPANY_USER_SUCCESS,
    SAMPLE_CREATE_COMPANY_USER_FAILURE
] = createRequestOfficeActionTypes('sample/CREATE_COMPANY_USER');
const [
    SAMPLE_GET_COMPANY_USER,
    SAMPLE_GET_COMPANY_USER_SUCCESS,
    SAMPLE_GET_COMPANY_USER_FAILURE
] = createRequestOfficeActionTypes('sample/GET_COMPANY_USER');
const [
    SAMPLE_UPDATE_COMPANY_USER,
    SAMPLE_UPDATE_COMPANY_USER_SUCCESS,
    SAMPLE_UPDATE_COMPANY_USER_FAILURE
] = createRequestOfficeActionTypes('sample/UPDATE_COMPANY_USER');
const [
    SAMPLE_DELETE_COMPANY_USER,
    SAMPLE_DELETE_COMPANY_USER_SUCCESS,
    SAMPLE_DELETE_COMPANY_USER_FAILURE
] = createRequestOfficeActionTypes('sample/DELETE_COMPANY_USER');

const SAMPLE_GO_TO_USERS = 'sample/GO_TO_USERS';
const SAMPLE_CLEAR_COMPANY_USER_INFO = 'sample/CLEAR_COMPANY_USER_INFO';

// action create
export const sampleListCompanyUser = createAction(SAMPLE_LIST_COMPANY_USER); 
export const sampleCreateCompanyUser = createAction(SAMPLE_CREATE_COMPANY_USER);
export const sampleGetCompanyUser = createAction(SAMPLE_GET_COMPANY_USER); 
export const sampleUpdateCompanyUser = createAction(SAMPLE_UPDATE_COMPANY_USER);
export const sampleDeleteCompanyUser = createAction(SAMPLE_DELETE_COMPANY_USER); 
export const sampleClearCompanyUserInfo = createAction(SAMPLE_CLEAR_COMPANY_USER_INFO);
export const goToUsers = () => ({ type: SAMPLE_GO_TO_USERS });

const forwardLocation = '/users';

function* sampleGoToUsersSaga() {
    console.log("goToUsersSaga =========================== ")
    const history = yield getContext('history');
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    console.log(history)
    console.log("-----------------------------------------------")
    history.push('/users');
}

function* sampleClearSaga() {
    yield put({
        type: SAMPLE_CLEAR_COMPANY_USER_INFO,
    })
}

const sampleListCompanyUserSaga = createRequestOfficeSaga(SAMPLE_LIST_COMPANY_USER, sampleListCompanyUserAPI);
const sampleCreateCompanyUserSaga = createRequestOfficeSaga(SAMPLE_CREATE_COMPANY_USER, sampleCreateCompanyUserAPI, forwardLocation);
const sampleGetCompanyUserSaga = createRequestOfficeSaga(SAMPLE_GET_COMPANY_USER, sampleGetCompanyUserAPI);
const sampleUpdateCompanyUserSaga = createRequestOfficeSaga(SAMPLE_UPDATE_COMPANY_USER, sampleUpdateCompanyUserAPI, forwardLocation);
const sampleDeleteCompanyUserSaga = createRequestOfficeSaga(SAMPLE_DELETE_COMPANY_USER, sampleDeleteCompanyUserAPI, forwardLocation);

export function* sampleUserSaga() {
    yield takeLatest(SAMPLE_LIST_COMPANY_USER, sampleListCompanyUserSaga);
    yield takeLatest(SAMPLE_CREATE_COMPANY_USER, sampleCreateCompanyUserSaga);
    yield takeLatest(SAMPLE_GET_COMPANY_USER, sampleGetCompanyUserSaga);
    yield takeLatest(SAMPLE_UPDATE_COMPANY_USER, sampleUpdateCompanyUserSaga);
    yield takeLatest(SAMPLE_DELETE_COMPANY_USER, sampleDeleteCompanyUserSaga);
    // yield takeEvery(GO_TO_USERS, goToUsersSaga);
    // yield takeEvery(CLEAR_COMPANY_USER_INFO, clearSaga);
    // yield put(push('/users'));
}


const initState = sampleInitUserState;

const sampleStore = handleActions(
    {
        [SAMPLE_GO_TO_USERS]: (state, { payload: data }) => ({
            ...state,
            forwardLocation: data,
            // userInfo: {}
        }),
        [SAMPLE_LIST_COMPANY_USER_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            userList: data.result.data,
            // userInfo: {}
        }),
        [SAMPLE_CREATE_COMPANY_USER_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            msg: data.result.data,
            status: SAMPLE_CREATE_COMPANY_USER_SUCCESS,
        }),
        [SAMPLE_GET_COMPANY_USER_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            userInfo: data.result.data,
            // userList: []
        }),
        [SAMPLE_UPDATE_COMPANY_USER_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            msg: data.result.data,
            // userList: []
        }),
        [SAMPLE_DELETE_COMPANY_USER_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            msg: data.result.data,
            status: SAMPLE_DELETE_COMPANY_USER_SUCCESS,
            // userList: []
        }),
        [SAMPLE_CLEAR_COMPANY_USER_INFO]: (state) => ({
            ...state,
            userInfo: {},
        }),
    },
    initState
)

export default sampleStore;