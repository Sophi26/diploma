import * as EditorTypes from '../constants/PoleEditorAtionTypes';

export function createField(w, h) {
    return {
        type: EditorTypes.CREATE_FIELD,
        payload: { width: w, height: h },
    };
}

export function shapePlace(x, y, shape) {
    return {
        type: EditorTypes.DRAG_N_DROP,
        payload: {x: x, y: y, shape: shape},
    };
}