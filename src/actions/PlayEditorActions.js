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

export function okActionFigure() {
    return {
        type: EditorTypes.OK_ACTION_SHAPE,
    };
}

export function cancleActionFigure() {
    return {
        type: EditorTypes.CANCLE_ACTION_SHAPE,
    };
}

export function rotateActionFigure() {
    return {
        type: EditorTypes.ROTATE_ACTION_SHAPE,
    };
}

export function flipHActionFigure() {
    return {
        type: EditorTypes.FLIP_H_ACTION_SHAPE,
    };
}

export function flipVActionFigure() {
    return {
        type: EditorTypes.FLIP_V_ACTION_SHAPE,
    };
}

export function endSelection() {
    return {
        type: EditorTypes.END_SELECTION,
    };
}

export function okSelection() {
    return {
        type: EditorTypes.OK_SELECTION,
    };
}

export function cancleSelection() {
    return {
        type: EditorTypes.CANCLE_SELECTION,
    };
}

export function cancleHypothesis() {
    return {
        type: EditorTypes.CANCLE_HYPOTHESIS,
    };
}