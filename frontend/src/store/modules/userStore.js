import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
import { takeLatest, takeEvery } from 'redux-saga/effects';
import createRequestSaga, {
    createRequestActionTypes,
} from '../lib/createRequestSaga';
import { call, put } from 'redux-saga/effects';
import { initUserState } from '../state';

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
    return axios.post(`/file/upload`,{user}, {
        headers: { 
            'x-apikey': 'API_KEY',
            'Access-Control-Allow-Origin': '*',
        },
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


// action create
export const listCompanyUser = createAction(LIST_COMPANY_USER); 

// test
// const listCompanyUserSagaTest = function*({action}) {
//     const type = LIST_COMPANY_USER;
//     console.log("listCompanyUser saga worker ===============================");
//     console.log(type);
//     console.log(action);
//     console.log("------------------------");
//     console.log("listCompanyUser saga worker end ===========================");
//     const SUCCESS = `${type}_SUCCESS`;
//     const FAILURE = `${type}_FAILURE`;

//     try {
//         const response = yield call(listCompanyUserAPI, action.payload);
//         console.log("listCompanyUser worker response===============================");
//         console.log(response);
//         console.log("listCompanyUser worker response end ===========================");
//         yield put(response);
//         if (response.data === 'ok' && response.data.body) {
//             // yield put(fetchDataActionCreators.getLoginSuccess(response));
//             //function passed as param from component, pass true if success
//             yield put({
//                 type: SUCCESS,
//                 payload: response.data.result.data,
//                 meta: response,
//               });
//         }
//     } catch (e) {
//         yield put({
//             type: FAILURE,
//             payload: e,
//             error: true,
//         });
//     }
// }

const listCompanyUserSaga = createRequestSaga(LIST_COMPANY_USER, listCompanyUserAPI);

export const createCompanyUser = createAction(CREATE_COMPANY_USER);
const createCompanyUserSaga = createRequestSaga(CREATE_COMPANY_USER, createCompanyUserAPI);

export function* userSaga() {
    yield takeLatest(LIST_COMPANY_USER, listCompanyUserSaga);
    yield takeLatest(CREATE_COMPANY_USER, createCompanyUserSaga);
}


const initState = initUserState;

const userStore = handleActions(
    {
        [LIST_COMPANY_USER_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            userList: data.result.data
        }),
        [CREATE_COMPANY_USER_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            msg: data.result.data
        }),
    },
    initState
)

export default userStore;