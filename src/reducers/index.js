import * as EditorTypes from '../constants/FeatureEditorActionTypes';
import * as FigureTypes from '../constants/FigureEditorActionTypes';
import * as SeeTypes from '../constants/SeeEditorActionTypes';
import * as PoleTypes from '../constants/PoleEditorAtionTypes';

export default function featureList(state, action = {}) {

    switch (action.type) {

        case EditorTypes.ADD_FEATURE:
            const new_feature = action.payload;
            return {
                ...state,
                features: state.features.concat(new_feature),
                figures: state.figures.map(figure => {
                    return {...figure, features: figure.features.concat(new_feature), };
                }), 
            }

        case EditorTypes.DELETE_FEATURE:
            return {
                ...state,
                features: state.features.filter(feature => feature.id[0] !== action.payload[0]),
                values: state.values.id[0] === action.payload[0] ? { id: [], valuename: [] } : state.values,
                figures: state.figures.map(figure => {
                    return {...figure, features: figure.features.filter(feature => feature.id[0] !== action.payload[0]), };
                }),
            }

        case EditorTypes.RENAME_FEATURE:
            return {
                ...state,
                features: state.features.map(feature => {
                    return feature.id[0] !== action.payload.id[0] ? feature : {...feature, featurename: action.payload.featurename };
                }),
                figures: state.figures.map(figure => {
                    return {...figure,
                        features: figure.features.map(feature => {
                            return feature.id[0] !== action.payload.id[0] ? feature : {...feature, featurename: action.payload.featurename };
                        }),
                    };
                }),
            }

        case EditorTypes.OPEN_FEATURE:
            return {
                ...state,
                values: { id: action.payload.id, valuename: action.payload.valuename },
            }

        case EditorTypes.ADD_VALUE:
            const new_value = action.payload.valuename;
            return {
                ...state,
                features: state.features.map(feature => {
                    return feature.featurename[0] !== action.payload.featurename ? feature : feature.valuename === undefined ? Object.assign(feature, { valuename: [new_value] }) : {...feature, valuename: [...feature.valuename, new_value] };
                }),
                values: {
                    ...state.values,
                    valuename: state.values.valuename.concat(new_value),
                },
                figures: state.figures.map(figure => {
                    return {...figure,
                        features: figure.features.map(feature => {
                            return feature.featurename[0] !== action.payload.featurename ? feature : feature.valuename === undefined ? Object.assign(feature, { valuename: [new_value] }) : {...feature, valuename: [...feature.valuename, new_value] };
                        }),
                    };
                }),
            }

        case EditorTypes.DELETE_VALUE:
            return {
                ...state,
                features: state.features.map(feature => {
                    return feature.id[0] !== action.payload.id ? feature : {...feature, valuename: feature.valuename.filter(value => value !== action.payload.valuename) };
                }),
                values: {
                    ...state.values,
                    valuename: state.values.valuename.filter(value => value !== action.payload.valuename),
                },
                figures: state.figures.map(figure => {
                    return {...figure,
                        features: figure.features.map(feature => {
                            return feature.id[0] !== action.payload.id ? feature : {...feature, valuename: feature.valuename.filter(value => value !== action.payload.valuename) };
                        }),
                    };
                }),
            }

        case EditorTypes.RENAME_VALUE:
            return {
                ...state,
                features: state.features.map(feature => {
                    return feature.id[0] !== action.payload.id ? feature : {...feature, valuename: feature.valuename.map(value => { return value !== action.payload.prevname ? value : action.payload.valuename; }) };
                }),
                values: {
                    ...state.values,
                    valuename: state.values.valuename.map(value => { return value !== action.payload.prevname ? value : action.payload.valuename; }),
                },
                figures: state.figures.map(figure => {
                    return {...figure,
                        features: figure.features.map(feature => {
                            return feature.id[0] !== action.payload.id ? feature : {...feature, valuename: feature.valuename.map(value => { return value !== action.payload.prevname ? value : action.payload.valuename; }) };
                        }),
                    };
                }),
            }

        case FigureTypes.ADD_FIGURE:
            const tmp_feat = state.features.slice();
            const allFeatures = tmp_feat.map(feature => {
                return {...feature, important: false };
            });
            const new_figure = Object.assign(action.payload, { features: allFeatures });
            return {
                ...state,
                figures: state.figures.concat(new_figure),
                dragshapelist: state.dragshapelist.concat(new_figure),
            }

        case FigureTypes.RENAME_FIGURE:
            return {
                ...state,
                figures: state.figures.map(figure => {
                    return figure.id !== action.payload.id ? figure : {...figure, figurename: action.payload.figurename };
                }),
                figureinfo: state.figureinfo.id !== action.payload.id ? state.figureinfo : {...state.figureinfo, figurename: action.payload.figurename },
            }

        case FigureTypes.DELETE_FIGURE:
            return {
                ...state,
                figures: state.figures.filter(figure => figure.id !== action.payload),
                figureinfo: state.figureinfo.id !== action.payload ? state.figureinfo : { impfeatures: [] },
                figureimg: state.figureimg.id !== action.payload ? state.figureimg : {},
            }

        case FigureTypes.OPEN_FIGURE:
            return {
                ...state,
                figureinfo: { id: action.payload.figureid, figurename: action.payload.figurename, impfeatures: action.payload.impfeatures },
                figureimg: { id: action.payload.figureid, figureimg: action.payload.figureimg },
            }

        case FigureTypes.SELECT_FEATURE:
            const newFeat = { id: action.payload.featureid, name: action.payload.name, values: action.payload.values, selvalue: action.payload.values[0] };
            return {
                ...state,
                figures: state.figures.map(figure => {
                    return figure.id !== action.payload.figureid ? figure : {...figure,
                        features: figure.features.map(feature => {
                            return feature.id[0] !== action.payload.featureid ? feature : {...feature, important: true };
                        })
                    };
                }),
                figureinfo: state.figureinfo.id !== action.payload.figureid ? state.figureinfo : {...state.figureinfo, impfeatures: state.figureinfo.impfeatures.concat(newFeat), },
            }

        case FigureTypes.DESELECT_FEATURE:
            return {
                ...state,
                figures: state.figures.map(figure => {
                    return figure.id !== action.payload.figureid ? figure : {...figure,
                        features: figure.features.map(feature => {
                            return feature.id[0] !== action.payload.featureid ? feature : {...feature, important: false };
                        })
                    };
                }),
                figureinfo: state.figureinfo.id !== action.payload.figureid ? state.figureinfo : {...state.figureinfo, impfeatures: state.figureinfo.impfeatures.filter(feature => feature.id !== action.payload.featureid), },
            }

        case FigureTypes.CONCEPT_OPTIONS:
            return {
                ...state,
                figureinfo: Object.assign(state.figureinfo, { concepts: action.payload }),
            }

        case FigureTypes.SELECT_VALUE:
            let val = [];
            for (let i = 0; i < state.figures.length; ++i) {
                if (state.figures[i].id === action.payload.figId) {
                    for (let j = 0; j < state.figures[i].features.length; ++j) {
                        if (state.figures[i].features[j].id[0] === action.payload.id) {
                            val = state.figures[i].features[j].valuename.slice();
                            for (let k = 0; k < val.length; ++k) {
                                if (val[k] === action.payload.value) {
                                    let tmp = val[0];
                                    val[0] = val[k];
                                    val[k] = tmp;
                                }
                            }
                        }
                    }
                }
            }
            return {
                ...state,
                figures: state.figures.map(figure => {
                    return figure.id !== action.payload.figId ? figure : {...figure,
                        features: figure.features.map(feature => {
                            return feature.id[0] !== action.payload.id ? feature : {...feature, valuename: val };
                        })
                    };
                }),
                figureinfo: state.figureinfo.id !== action.payload.figId ? state.figureinfo : {...state.figureinfo, impfeatures: state.figureinfo.impfeatures.map(feature => feature.id === action.payload.id ? {...feature, values: val, selvalue: action.payload.value } : feature) },
            }

        case FigureTypes.SELECT_CONCEPT:
            return {
                ...state,
                figures: state.figures.map(figure => {
                    return figure.id !== action.payload.figId ? figure : figure.concept === undefined ? Object.assign(figure, { concept: action.payload.concept.conceptname[0] }) : {...figure, concept: action.payload.concept.conceptname[0] };
                }),
                selconcept: state.selconcept.filter(conc => conc.conceptname[0] !== action.payload.concept.conceptname[0]).concat(action.payload.concept),
            }

        case SeeTypes.OPEN_CONCEPT:
            return {
                ...state,
                seeconceptshapes: action.payload,
            }

        case PoleTypes.CREATE_FIELD:
            return {
                ...state,
                field: {...state.field, width: action.payload.width, height: action.payload.height },
            }

        case PoleTypes.DRAG_N_DROP:
            return {
                ...state,
                dragshapelist: state.dragshapelist.filter(shape => shape.id !== action.payload.shape.id),
                dropshapelist: state.dropshapelist.concat(action.payload),
            }

        default:
            return state;
    }
}