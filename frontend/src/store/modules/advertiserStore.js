import { createAction, handleActions } from 'redux-actions';
import {
    authAxios
} from '../lib/createAxiosInstance';
import { takeLatest, put, call } from 'redux-saga/effects';
import createRequestOfficeSaga, {
    createRequestOfficeActionTypes,
} from '../lib/createRequestOfficeSaga';
import { initAdvertiserState  } from '../state';

// 목록 : /advertiser/getList
// 입력 : /advertiser/addInfo
// 삭제 : /advertiser/removeInfo
// 수정 : /advertiser/updateInfo
// 상세 : /advertiser/getInfoDetail
// id중복체크 : /advertiser/checkAdvertiserId

const listAdvertiserAPI = (advertiser) => {
    return (
        authAxios.get(
            `/advertiser/getList/${advertiser.cur}/${advertiser.page_size}`, {params: advertiser})
    );
};
const createAdvertiserAPI = (advertiser) => {
    console.log("advertiser saga createAdvertiserAPI ======")
    console.log(advertiser)
    console.log("-------------------------------------------")
    return (
        authAxios.post('/advertiser/addInfo',advertiser)
    );
};
const getAdvertiserAPI = (advertiserId) => {
    return (
        authAxios.post('/advertiser/getInfoDetail',{advts_id: advertiserId})
    );
};

const updateAdvertiserAPI = (advertiser) => {
    return authAxios.post(`/advertiser/modifyInfo`, advertiser, {
        headers: { 
            'x-apikey': 'API_KEY',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
    });
};

const deleteAdvertiserAPI = (advertiserId) => {
    return authAxios.post('/advertiser/removeInfo',{advts_id: advertiserId}, {
        headers: { 
            'x-apikey': 'API_KEY',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
    });
};

const checkAdvertiserIdAPI = (advertiserId) => {
    return (
        authAxios.post('/advertiser/checkAdvertiserId',{advts_id: advertiserId})
    );
};

// action types
const [
    LIST_ADVERTISER,
    LIST_ADVERTISER_SUCCESS,
    LIST_ADVERTISER_FAILURE
] = createRequestOfficeActionTypes('advertiser/LIST_ADVERTISER');
const [
    CREATE_ADVERTISER,
    CREATE_ADVERTISER_SUCCESS,
    CREATE_ADVERTISER_FAILURE
] = createRequestOfficeActionTypes('advertiser/CREATE_ADVERTISER');
const [
    GET_ADVERTISER,
    GET_ADVERTISER_SUCCESS,
    GET_ADVERTISER_FAILURE
] = createRequestOfficeActionTypes('advertiser/GET_ADVERTISER');
const [
    UPDATE_ADVERTISER,
    UPDATE_ADVERTISER_SUCCESS,
    UPDATE_ADVERTISER_FAILURE
] = createRequestOfficeActionTypes('advertiser/UPDATE_ADVERTISER');
const [
    DELETE_ADVERTISER,
    DELETE_ADVERTISER_SUCCESS,
    DELETE_ADVERTISER_FAILURE
] = createRequestOfficeActionTypes('advertiser/DELETE_ADVERTISER');
const [
    CHECK_ADVERTISER_ID,
    CHECK_ADVERTISER_ID_SUCCESS,
    CHECK_ADVERTISER_ID_FAILURE
] = createRequestOfficeActionTypes('advertiser/CHECK_ADVERTISER_ID');

const CLEAR_ADVERTISER_INFO = 'advertiser/CLEAR_ADVERTISER_INFO';

// action create
export const listAdvertiser = createAction(LIST_ADVERTISER); 
export const createAdvertiser = createAction(CREATE_ADVERTISER);
export const getAdvertiser = createAction(GET_ADVERTISER); 
export const updateAdvertiser = createAction(UPDATE_ADVERTISER);
export const deleteAdvertiser = createAction(DELETE_ADVERTISER); 
export const checkAdvertiserId = createAction(CHECK_ADVERTISER_ID); 
export const clearAdvertiserInfo = createAction(CLEAR_ADVERTISER_INFO);

const forwardLocation = '/advertiser';

const listAdvertiserSaga = createRequestOfficeSaga(LIST_ADVERTISER, listAdvertiserAPI);
const createAdvertiserSaga = createRequestOfficeSaga(CREATE_ADVERTISER, createAdvertiserAPI, forwardLocation);
const getAdvertiserSaga = createRequestOfficeSaga(GET_ADVERTISER, getAdvertiserAPI);
const updateAdvertiserSaga = createRequestOfficeSaga(UPDATE_ADVERTISER, updateAdvertiserAPI, forwardLocation);
const deleteAdvertiserSaga = createRequestOfficeSaga(DELETE_ADVERTISER, deleteAdvertiserAPI, forwardLocation);
const checkAdvertiserIdSaga = createCheckAdvertiserIdSaga(CHECK_ADVERTISER_ID, checkAdvertiserIdAPI);

function createCheckAdvertiserIdSaga(type, request, forwardLocation) {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;

    return function*(action) {
        try {
            const response = yield call(request, action.payload);
            yield put({
                type: SUCCESS,
                payload: response.data,
                meta: response,
            });

            if(response !== null && response.statusText === "OK") {
                if(response.data.result.exist === 0) {
                    alert("사용가능한 아이디 입니다.");
                } else {
                    alert("사용 불가능한 아이디 입니다.");
                }
            }
        } catch (e) {
            yield put({
                type: FAILURE,
                payload: e,
                error: true,
            });
        }
    };
}


export function* advertiserSaga() {
    yield takeLatest(LIST_ADVERTISER, listAdvertiserSaga);
    yield takeLatest(CREATE_ADVERTISER, createAdvertiserSaga);
    yield takeLatest(GET_ADVERTISER, getAdvertiserSaga);
    yield takeLatest(UPDATE_ADVERTISER, updateAdvertiserSaga);
    yield takeLatest(DELETE_ADVERTISER, deleteAdvertiserSaga);
    yield takeLatest(CHECK_ADVERTISER_ID, checkAdvertiserIdSaga);
}

const initState = initAdvertiserState ;
const advertiserStore = handleActions(
    {
        [LIST_ADVERTISER_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            advertiserList: data.result.data,
            totalCount: data.result.totalCount,
            searchCount: data.result.data.length,
        }),
        [CREATE_ADVERTISER_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            msg: data.result.data,
            status: CREATE_ADVERTISER_SUCCESS,
        }),
        [GET_ADVERTISER_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            advertiserInfo: data.result.data,
        }),
        [UPDATE_ADVERTISER_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            msg: data.result.data,
        }),
        [DELETE_ADVERTISER_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            msg: data.result.data,
            status: DELETE_ADVERTISER_SUCCESS,
        }),
        [CHECK_ADVERTISER_ID_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            existId: data.result.exist,
        }),
        [CLEAR_ADVERTISER_INFO]: (state) => ({
            ...state,
            advertiserInfo: {},
            existId: -1,
        }),
    },
    initState
)

export default advertiserStore;