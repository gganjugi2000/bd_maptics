import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './modules';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

//개발 모드일 때만 Redux Devtools를 적용합니다.
const isDev = process.env.NODE_ENV === 'development';
const devtools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devtools || compose;

export const runSaga = () => sagaMiddleware.run(rootSaga);
// preloadedState는 추후 서버사이드 렌더링을 했을 때 전달받는 초기 상태입니다.
const configure = () => createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));


export default configure; 