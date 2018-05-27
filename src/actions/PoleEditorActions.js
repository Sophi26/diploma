import * as EditorTypes from '../constants/PoleEditorAtionTypes';

export function createField(w, h) {
    return {
        type: EditorTypes.CREATE_FIELD,
        payload: { width: w, height: h },
    };
}