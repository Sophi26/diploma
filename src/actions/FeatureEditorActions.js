import * as EditorTypes from '../constants/FeatureEditorActionTypes';

export function addFeature(id, name) {
    return {
        type: EditorTypes.ADD_FEATURE,
        payload: { id: [id], featurename: [name], valuename: [] },
    };
}

export function deleteFeature(id) {
    return {
        type: EditorTypes.DELETE_FEATURE,
        payload: [id],
    };
}

export function renameFeature(id, name) {
    return {
        type: EditorTypes.RENAME_FEATURE,
        payload: { id: [id], featurename: [name] },
    };
}

export function showValues(id, values = []) {
    return {
        type: EditorTypes.OPEN_FEATURE,
        payload: { id: [id], valuename: values },
    };
}

export function addValue(name) {
    return {
        type: EditorTypes.ADD_VALUE,
        payload: name,
    };
}

export function deleteValue(name) {
    return {
        type: EditorTypes.DELETE_VALUE,
        payload: name,
    };
}

export function renameValue(prevname, newname) {
    return {
        type: EditorTypes.RENAME_VALUE,
        payload: { prevname: prevname, valuename: newname },
    };
}