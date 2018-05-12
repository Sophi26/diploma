import * as EditorTypes from '../constants/FigureEditorActionTypes';

export function addFigure(icon, name) {
    return {
        type: EditorTypes.ADD_FIGURE,
        payload: { icon: icon, figurename: name },
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

export function openFigure(id, features) {
    return {
        type: EditorTypes.OPEN_FIGURE,
        payload: { figureid: id, importantfeatures: features },
    };
}

export function selectFeature(id, feature) {
    return {
        type: EditorTypes.SELECT_FEATURE,
        payload: { figureid: id, featurename: feature },
    };
}

export function onlyImportantFeatures(features) {
    return {
        type: EditorTypes.ONLY_IMPORTANT_FEATURES,
        payload: features,
    };
}