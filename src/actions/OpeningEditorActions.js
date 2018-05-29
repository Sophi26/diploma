import * as EditorTypes from '../constants/OpeningEditorActionTypes';

export function experimentConcept(concept) {
    return {
        type: EditorTypes.SELECT_EXPERIMENT_CONCEPT,
        payload: concept,
    };
}

export function openingPlace(id, shape) {
    return {
        type: EditorTypes.DRAG_N_DROP_OPENING,
        payload: {id: id, shape: shape},
    };
}