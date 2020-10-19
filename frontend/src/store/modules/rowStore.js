import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
import { takeLatest, takeEvery } from 'redux-saga/effects';
import createRequestSaga, {
    createRequestActionTypes,
} from '../lib/createRequestSaga';
import { call, put } from 'redux-saga/effects';
import { initListState } from '../state';

// api
// 사용자 목록
// const listCompanyUserAPI = () => axios.get(`/users`);

// const listCompanyUserAPI = () => axios.get(`http://150.20.14.142:4000/api/users/info`, {
//     headers: { 
//         'x-apikey': 'API_KEY',
//         'Access-Control-Allow-Origin': '*'
//     },
// });

const listCompanyUserAPI = () => axios.get(`/user/info`, {
    headers: { 
        'x-apikey': 'API_KEY',
        'Access-Control-Allow-Origin': '*'
    },
});
const createCompanyUserAPI = (user) => {
    console.log("createCompanyUserAPI saga ===== ")
    console.log(user)
    console.log("----------------------------------")
    // 'content-type': 'multipart/form-data',
    const formData = new FormData();

    formData.append("user_id", user.user_id)
    formData.append("user_email", user.user_email)
    formData.append("file", user.user_file);
    console.log("formData ----------------------------------")
    console.log(formData)
    console.log("----------------------------------")
    console.log(user.user_id)
    console.log(user.user_email)
    console.log(user.user_file)
    console.log("----------------------------------")
    return axios.post('/file/upload',formData, {
        headers: { 
            'Content-Type': 'multipart/form-data'
        }
    });
};

// action types
const [
    LIST_COMPANY_USER,
    LIST_COMPANY_USER_SUCCESS,
    LIST_COMPANY_USER_FAILURE
] = createRequestActionTypes('user/LIST_COMPANY_USER');

const [
    CREATE_COMPANY_USER,
    CREATE_COMPANY_USER_SUCCESS,
    CREATE_COMPANY_USER_FAILURE
] = createRequestActionTypes('user/CREATE_COMPANY_USER');

const CHANGE_LIMIT = 'list/CHANGE_LIMIT';

// action create
export const listCompanyUser = createAction(LIST_COMPANY_USER); 


const listCompanyUserSaga = createRequestSaga(LIST_COMPANY_USER, listCompanyUserAPI);

export const changeLimit = createAction(CHANGE_LIMIT, limit => limit);
export const createCompanyUser = createAction(CREATE_COMPANY_USER);
const createCompanyUserSaga = createRequestSaga(CREATE_COMPANY_USER, createCompanyUserAPI);

export function* rowSaga() {
    yield takeLatest(LIST_COMPANY_USER, listCompanyUserSaga);
    yield takeLatest(CREATE_COMPANY_USER, createCompanyUserSaga);
}



const initState = initListState;

const rowData = handleActions(
    {
        [LIST_COMPANY_USER_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            userList: data.result.data
        }),
        [CREATE_COMPANY_USER_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            msg: data.result.data
        }),
        [CHANGE_LIMIT]: (state, { payload: limit }) => ({
            ...state,
            limit: limit
        }),
    },
    initState
)

export default rowData;