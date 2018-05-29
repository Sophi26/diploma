import * as EditorTypes from '../constants/OpeningEditorActionTypes';

export function experimentConcept(concept) {
    return {
        type: EditorTypes.SELECT_EXPERIMENT_CONCEPT,
        payload: concept,
    };
}

export function openingPlace(shape) {
    return {
        type: EditorTypes.DRAG_N_DROP_OPENING,
        payload: shape,
    };
}

export function returnPlace(shape) {
    return {
        type: EditorTypes.RETURN_SHAPE,
        payload: shape,
    };
}