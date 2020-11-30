import { createAction, handleActions } from 'redux-actions';
import { initMenuState  } from '../state';

const SELECTED_MENU = 'menu/SELECTED_MENU';
const LEFT_SIZE_MENU = 'menu/LEFT_SIZE_MENU';

// action create
export const selectedMenu = createAction(SELECTED_MENU);
export const leftSizeMenu = createAction(LEFT_SIZE_MENU);

const initState = initMenuState ;
const menuStore = handleActions(
    {
        [SELECTED_MENU]: (state, { payload: data }) => ({
            ...state,
            selectedMenu: data,
        }),
        [LEFT_SIZE_MENU]: (state, { payload: data }) => ({
            ...state,
            leftSize: data,
        }),
    },
    initState
)

export default menuStore;