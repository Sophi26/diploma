import * as EditorTypes from '../constants/SaveActionTypes';

export function saveExp(save_name) {
    return {
        type: EditorTypes.SAVE_EXP,
        payload: save_name
    };
}

export function saveAsExp(file_name) {
    return {
        type: EditorTypes.SAVE_AS_EXP,
        payload: file_name
    };
}