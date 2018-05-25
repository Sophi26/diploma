import * as EditorTypes from '../constants/SeeEditorActionTypes';

export function openConcept(id, name, shapes) {
    return {
        type: EditorTypes.OPEN_CONCEPT,
        payload: { id: id, conceptname: name, shapes: shapes },
    };
}