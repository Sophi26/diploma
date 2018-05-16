import * as EditorTypes from '../constants/FeatureEditorActionTypes';
import * as FigureTypes from '../constants/FigureEditorActionTypes';

export default function featureList(state, action = {}) {

    switch (action.type) {

        case EditorTypes.ADD_FEATURE:
            const new_feature = action.payload;
            return {
                ...state,
                features: state.features.concat(new_feature),
            }

        case EditorTypes.DELETE_FEATURE:
            return {
                ...state,
                features: state.features.filter(feature => feature.id[0] !== action.payload[0]),
                values: state.values.id[0] === action.payload[0] ? { id: [], valuename: [] } : state.values,
            }

        case EditorTypes.RENAME_FEATURE:
            return {
                ...state,
                features: state.features.map(feature => {
                    return feature.id[0] !== action.payload.id[0] ? feature : {...feature, featurename: action.payload.featurename };
                })
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
            }

        case FigureTypes.ADD_FIGURE:
            const allFeatures = state.features.map(feature => {
                return {...feature, important: false };
            });
            const new_figure = Object.assign(action.payload, { features: allFeatures });
            return {
                ...state,
                figures: state.figures.concat(new_figure),
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
                figureinfo: state.figureinfo.id !== action.payload ? state.figureinfo : {},
                figureimg: state.figureimg.id !== action.payload ? state.figureimg : {},
            }

        case FigureTypes.OPEN_FIGURE:
            return {
                ...state,
                figureinfo: { id: action.payload.figureid, figurename: action.payload.figurename, impfeatures: action.payload.impfeatures },
                figureimg: { id: action.payload.figureid, figureimg: action.payload.figureimg },
            }

        case FigureTypes.SELECT_FEATURE:
            let val = [];
            state.features.forEach(feature => {
                if (feature.id[0] === action.payload.featureid) {
                    val = feature.valuename;
                }
            });
            const newFeat = { name: action.payload.name, values: val };
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
            }

        default:
            return state;
    }
}