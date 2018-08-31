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

export function openFigure(id, name, img, features) {
    return {
        type: EditorTypes.OPEN_FIGURE,
        payload: { figureid: id, figurename: name, figureimg: img, impfeatures: features },
    };
}

export function selectFeature(id, fid, fname, fvalues) {
    return {
        type: EditorTypes.SELECT_FEATURE,
        payload: { figureid: id, featureid: fid, name: fname, values: fvalues },
    };
}

export function deselectFeature(id, fid) {
    return {
        type: EditorTypes.DESELECT_FEATURE,
        payload: { figureid: id, featureid: fid },
    };
}

export function onlyImportantFeatures(features) {
    return {
        type: EditorTypes.ONLY_IMPORTANT_FEATURES,
        payload: features,
    };
}

export function conceptOptions(figId, concepts) {
    return {
        type: EditorTypes.CONCEPT_OPTIONS,
        payload: { figId: figId, concepts: concepts },
    };
}

export function selectValue(figureId, featureid, value) {
    return {
        type: EditorTypes.SELECT_VALUE,
        payload: { figId: figureId, id: featureid, value: value },
    };
}

export function selectConcept(figId, concept) {
    return {
        type: EditorTypes.SELECT_CONCEPT,
        payload: { figId: figId, concept: concept },
    };
}

export function renameConcept(axeConc, newConc) {
    return {
        type: EditorTypes.RENAME_CONCEPT,
        payload: { axeconc: axeConc, newconc: newConc },
    };
}