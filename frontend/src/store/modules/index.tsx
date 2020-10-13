import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import userStore, { userSaga } from './userStore';
import { UserState } from '../state';

const rootReducer = combineReducers({
    userStore,
});


export function* rootSaga() {
    yield all([
        userSaga(),
    ]);
}

export default rootReducer;


// export type RootState = ReturnType<typeof rootReducer>;
export type RootState = {
    userState: UserState,
};