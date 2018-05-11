import * as EditorTypes from '../constants/FigureEditorActionTypes';

export function addFigure(id, icon, name, features) {
    return {
        type: EditorTypes.ADD_FIGURE,
        payload: { id: id, icon: icon, figurename: name, featurelist: features },
    };
}

export function deleteFigure(id) {
    return {
        type: EditorTypes.DELETE_FIGURE,
        payload: id,
    };
}

export function renameFigure(id, name) {
    return {
        type: EditorTypes.RENAME_FIGURE,
        payload: { id: id, figurename: name },
    };
}

export function openFigure(id) {
    return {
        type: EditorTypes.OPEN_FIGURE,
        payload: id,
    };
}

export function selectFeature(id, feature) {
    return {
        type: EditorTypes.SELECT_FEATURE,
        payload: { figureid: id, featurename: feature },
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