import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { connectRouter } from 'connected-react-router';
import userStore,  { userSaga } from './userStore';
import rowStore from './rowStore';
import { UserState, ListState } from '../state';

const rootReducer = (history: any) => combineReducers({
    router: connectRouter(history),
    userStore,
	rowStore,
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
	rowState: ListState,
};