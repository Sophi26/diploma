import * as EditorTypes from '../constants/PlayEditorActionTypes';

export function userSelect(shape) {
    return {
        type: EditorTypes.DRAG_N_DROP_USER,
        payload: shape,
    };
}

export function returnUser(shape) {
    return {
        type: EditorTypes.RETURN_SHAPE_USER,
        payload: shape,
    };
}

export function nextSample(next) {
    return {
        type: EditorTypes.OPEN_NEXT_SAMPLE,
        payload: next,
    };
}

export function actionFigure(shape) {
    return {
        type: EditorTypes.SELECT_ACTION_SHAPE,
        payload: shape,
    };
}