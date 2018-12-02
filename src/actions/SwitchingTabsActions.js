import * as EditorTypes from '../constants/SwitchingTabsActionTypes';

export function initPlay(test_id) {
    return {
        type: EditorTypes.INIT_PLAY,
        payload: test_id
    };
}