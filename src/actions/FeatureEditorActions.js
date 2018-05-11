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

export function addValue(fname, name) {
    return {
        type: EditorTypes.ADD_VALUE,
        payload: { featurename: fname, valuename: name },
    };
}

export function deleteValue(featureid, name) {
    return {
        type: EditorTypes.DELETE_VALUE,
        payload: { id: featureid, valuename: name },
    };
}

export function renameValue(featureid, prevname, newname) {
    return {
        type: EditorTypes.RENAME_VALUE,
        payload: { id: featureid, prevname: prevname, valuename: newname },
    };
}