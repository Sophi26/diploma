import * as EditorTypes from '../constants/FeatureEditorActionTypes';

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
                values: state.values.id[0] === action.payload[0] ? { id: [], valuename: [] } : values,
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
            const new_value = action.payload;
            return {
                ...state,
                values: {
                    ...state.values,
                    valuename: state.values.valuename.concat(new_value),
                },
            }

        case EditorTypes.DELETE_VALUE:
            return {
                ...state,
                values: {
                    ...state.values,
                    valuename: state.values.valuename.filter(value => value !== action.payload),
                },
            }

        case EditorTypes.RENAME_VALUE:
            return {
                ...state,
                values: {
                    ...state.values,
                    valuename: state.values.valuename.map(value => { return value !== action.payload.prevname ? value : action.payload.valuename; }),
                },
            }

        default:
            return state;
    }
}