import * as EditorTypes from '../constants/OpenActionTypes';

export function openExp(exp) {
    return {
        type: EditorTypes.OPEN_EXP,
        payload: exp,
    };
}