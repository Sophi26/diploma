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
            const new_figure = action.payload;
            return {
                ...state,
                figures: state.figures.concat(new_figure),
            }

        case FigureTypes.RENAME_FIGURE:
            return {
                ...state,
                figures: state.figures.map(figure => {
                    return figure.id !== action.payload.id ? figure : {...figure, figurename: action.payload.figurename };
                })
            }

        case FigureTypes.DELETE_FIGURE:
            return {
                ...state,
                figures: state.figures.filter(figure => figure.id !== action.payload),
            }

        default:
            return state;
    }
}