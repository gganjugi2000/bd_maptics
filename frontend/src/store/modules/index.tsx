import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { connectRouter } from 'connected-react-router';
import sampleStore,  { sampleUserSaga } from './sampleStore';
import userStore,  { userSaga } from './userStore';
import rowStore from './rowStore';
import advertiserStore,  { advertiserSaga } from './advertiserStore';
import campaignStore,  { campaignSaga } from './campaignStore';
import menuStore from './menuStore';

import { 
    AdvertiserState, 
    CampaignState, 
    UserState, 
    ListState, 
    SampleUserState, 
    MenuState
} from '../state';

const rootReducer = (history: any) => combineReducers({
    router: connectRouter(history),
    advertiserStore,
    campaignStore,
    sampleStore,
    userStore,
    rowStore,
    menuStore
});

export function* rootSaga() {
    yield all([
        advertiserSaga(),
        campaignSaga(),
        sampleUserSaga(),
        userSaga()
    ]);
}

export default rootReducer;


// export type RootState = ReturnType<typeof rootReducer>;
export type RootState = {
    sampleState: SampleUserState,
    userState: UserState,
    rowState: ListState,
    advertiserState: AdvertiserState,
    campaignState: CampaignState,
    menuState: MenuState
};