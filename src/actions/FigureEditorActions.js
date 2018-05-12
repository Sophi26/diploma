import * as EditorTypes from '../constants/FigureEditorActionTypes';

export function addFigure(id, icon, name) {
    return {
        type: EditorTypes.ADD_FIGURE,
        payload: { id: id, icon: icon, figurename: name },
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

export function openFigure(id, name, img) {
    return {
        type: EditorTypes.OPEN_FIGURE,
        payload: { figureid: id, figurename: name, figureimg: img },
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