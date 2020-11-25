import { createAction, handleActions } from 'redux-actions';
import {
    authAxios
} from '../lib/createAxiosInstance';
import { takeLatest, put, call } from 'redux-saga/effects';
import createRequestOfficeSaga, {
    createRequestOfficeActionTypes,
} from '../lib/createRequestOfficeSaga';
import { initCampaignState  } from '../state';

// 목록 : /campaign/getList
// 입력 : /campaign/addInfo
// 삭제 : /campaign/removeInfo
// 수정 : /campaign/updateInfo
// 상세 : /campaign/getInfoDetail

const listCampaignAPI = (campaign) => {
    return (
        authAxios.get(
            `/campaign/getList/${campaign.cur}/${campaign.page_size}`, {params: campaign})
    );
};
const createCampaignAPI = (campaign) => {
    return (
        authAxios.post('/campaign/addInfo',campaign)
    );
};

const getCampaignAPI = (campaignId) => {
    return (
        authAxios.post('/campaign/getInfoDetail',{cmpgn_id: campaignId})
    );
};

const updateCampaignAPI = (campaign) => {
    return authAxios.post(`/campaign/modifyInfo`, campaign, {
        headers: { 
            'x-apikey': 'API_KEY',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
    });
};

const deleteCampaignAPI = (campaignId) => {
    return authAxios.post('/campaign/removeInfo',{cmpgn_id: campaignId}, {
        headers: { 
            'x-apikey': 'API_KEY',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
    });
};

const getAdvertiserAPI = (advertiserId) => {
    return (
        authAxios.post('/advertiser/getInfoDetail',{advts_id: advertiserId})
    );
};

// action types
const [
    LIST_CAMPAIGN,
    LIST_CAMPAIGN_SUCCESS,
    LIST_CAMPAIGN_FAILURE
] = createRequestOfficeActionTypes('campaign/LIST_CAMPAIGN');
const [
    CREATE_CAMPAIGN,
    CREATE_CAMPAIGN_SUCCESS,
    CREATE_CAMPAIGN_FAILURE
] = createRequestOfficeActionTypes('campaign/CREATE_CAMPAIGN');
const [
    GET_CAMPAIGN,
    GET_CAMPAIGN_SUCCESS,
    GET_CAMPAIGN_FAILURE
] = createRequestOfficeActionTypes('campaign/GET_CAMPAIGN');
const [
    UPDATE_CAMPAIGN,
    UPDATE_CAMPAIGN_SUCCESS,
    UPDATE_CAMPAIGN_FAILURE
] = createRequestOfficeActionTypes('campaign/UPDATE_CAMPAIGN');
const [
    DELETE_CAMPAIGN,
    DELETE_CAMPAIGN_SUCCESS,
    DELETE_CAMPAIGN_FAILURE
] = createRequestOfficeActionTypes('campaign/DELETE_CAMPAIGN');
const [
    SEARCH_ADVERTISER,
    SEARCH_ADVERTISER_SUCCESS,
    SEARCH_ADVERTISER_FAILURE
] = createRequestOfficeActionTypes('campaign/SEARCH_ADVERTISER');

const CLEAR_CAMPAIGN_INFO = 'campaign/CLEAR_CAMPAIGN_INFO';

// action create
export const listCampaign = createAction(LIST_CAMPAIGN); 
export const createCampaign = createAction(CREATE_CAMPAIGN);
export const getCampaign = createAction(GET_CAMPAIGN); 
export const updateCampaign = createAction(UPDATE_CAMPAIGN);
export const deleteCampaign = createAction(DELETE_CAMPAIGN); 
export const searchAdvertiser = createAction(SEARCH_ADVERTISER); 
export const clearCampaignInfo = createAction(CLEAR_CAMPAIGN_INFO);

const forwardLocation = '/campaign';

const listCampaignSaga = createRequestOfficeSaga(LIST_CAMPAIGN, listCampaignAPI);
const createCampaignSaga = createRequestOfficeSaga(CREATE_CAMPAIGN, createCampaignAPI, forwardLocation);
const getCampaignSaga = createRequestOfficeSaga(GET_CAMPAIGN, getCampaignAPI);
const updateCampaignSaga = createRequestOfficeSaga(UPDATE_CAMPAIGN, updateCampaignAPI, forwardLocation);
const deleteCampaignSaga = createRequestOfficeSaga(DELETE_CAMPAIGN, deleteCampaignAPI, forwardLocation);
const searchAdvertiserSaga = createRequestOfficeSaga(SEARCH_ADVERTISER, getAdvertiserAPI);

export function* campaignSaga() {
    yield takeLatest(LIST_CAMPAIGN, listCampaignSaga);
    yield takeLatest(CREATE_CAMPAIGN, createCampaignSaga);
    yield takeLatest(GET_CAMPAIGN, getCampaignSaga);
    yield takeLatest(UPDATE_CAMPAIGN, updateCampaignSaga);
    yield takeLatest(DELETE_CAMPAIGN, deleteCampaignSaga);
    yield takeLatest(SEARCH_ADVERTISER, searchAdvertiserSaga);
}

const initState = initCampaignState ;
const campaignStore = handleActions(
    {
        [LIST_CAMPAIGN_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            campaignList: data.result.data,
            totalCount: data.result.totalCount,
            searchCount: data.result.data.length,
            status: LIST_CAMPAIGN_SUCCESS,
        }),
        [CREATE_CAMPAIGN_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            msg: data.result.data,
            status: CREATE_CAMPAIGN_SUCCESS,
        }),
        [GET_CAMPAIGN_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            campaignInfo: data.result.data,
            campaignAcknlg: data.result.acknlg
        }),
        [UPDATE_CAMPAIGN_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            msg: data.result.data,
            status: UPDATE_CAMPAIGN_SUCCESS,
        }),
        [DELETE_CAMPAIGN_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            msg: data.result.data,
            status: DELETE_CAMPAIGN_SUCCESS,
        }),
        [SEARCH_ADVERTISER_SUCCESS]: (state, { payload: data }) => ({
            ...state,
            advertiserInfo: data.result.data
        }),
        [CLEAR_CAMPAIGN_INFO]: (state) => ({
            ...state,
            campaignInfo: {},
            campaignAcknlg: [],
        }),
    },
    initState
)

export default campaignStore;