import * as EditorTypes from '../constants/SaveActionTypes';

export function saveExp() {
    return {
        type: EditorTypes.SAVE_EXP,
    };
}