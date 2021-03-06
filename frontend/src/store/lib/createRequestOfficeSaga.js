import { call, put, getContext } from 'redux-saga/effects';
import { push } from 'react-router-redux';
// import { startLoading, finishLoading } from '../modules/loading';


export const createRequestOfficeActionTypes = type => {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;
    return [type, SUCCESS, FAILURE];
};

export default function createRequestOfficeSaga(type, request, forwardLocation) {
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;

    return function*(action) {
        // yield put(startLoading(type)); // 로딩 시작
        try {
            const response = yield call(request, action.payload);
            yield put({
                type: SUCCESS,
                payload: response.data,
                meta: response,
            });
            
            if(forwardLocation && response !== null && response.statusText === "OK") {
                console.log("createRequestOfficeSaga response ===============================");
                console.log(response);
                console.log("createRequestOfficeSaga response end ===========================");
                yield put(push('/users'))
            }
        } catch (e) {
            yield put({
                type: FAILURE,
                payload: e,
                error: true,
            });
        }
        // yield put(finishLoading(type)); // 로딩 끝
    };
}

