import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { connectRouter } from 'connected-react-router';
import sampleStore,  { sampleUserSaga } from './sampleStore';
import userStore,  { userSaga } from './userStore';
import rowStore from './rowStore';
import advertiserStore,  { advertiserSaga } from './advertiserStore';
import { UserState, ListState, SampleUserState, AdvertiserState } from '../state';

const rootReducer = (history: any) => combineReducers({
    router: connectRouter(history),
    sampleStore,
    userStore,
    rowStore,
    advertiserStore
});

export function* rootSaga() {
    yield all([
        sampleUserSaga(),
        userSaga(),
        advertiserSaga()
    ]);
}

export default rootReducer;


// export type RootState = ReturnType<typeof rootReducer>;
export type RootState = {
    sampleState: SampleUserState,
    userState: UserState,
    rowState: ListState,
    advertiserState: AdvertiserState
};