import { call, put } from 'redux-saga/effects';
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
            
            if(type.indexOf("CREATE") > 0) {
                alert("등록이 완료 되었습니다.");
            } else if(type.indexOf("UPDATE") > 0) {
                alert("수정이 완료 되었습니다.");
            } else if(type.indexOf("DELETE") > 0) {
                alert("삭제 완료 되었습니다.");
            }

            if(forwardLocation) {
                
                yield put(push(forwardLocation));
            }
        } catch (e) {
            yield put({
                type: FAILURE,
                payload: e,
                error: true,
            });
            alert("오류 발생 " + e);
        }
        // yield put(finishLoading(type)); // 로딩 끝
    };
}

