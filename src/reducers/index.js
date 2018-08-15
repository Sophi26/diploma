import * as EditorTypes from '../constants/FeatureEditorActionTypes';
import * as FigureTypes from '../constants/FigureEditorActionTypes';
import * as SeeTypes from '../constants/SeeEditorActionTypes';
import * as PoleTypes from '../constants/PoleEditorAtionTypes';
import * as OpeningTypes from '../constants/OpeningEditorActionTypes';
import * as PlayTypes from '../constants/PlayEditorActionTypes';
import * as SaveTypes from '../constants/SaveActionTypes';
import * as OpenTypes from '../constants/OpenActionTypes';

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
                dragshapelist: state.dragshapelist.map(figure => {
                    return figure.id !== action.payload.figId ? figure : figure.concept === undefined ? Object.assign(figure, { concept: action.payload.concept.conceptname[0] }) : {...figure, concept: action.payload.concept.conceptname[0] };
                }),
                dropshapelist: state.dropshapelist.map(figure => {
                    return figure.shape.id !== action.payload.figId ? figure : figure.shape.concept === undefined ? {...figure, shape: Object.assign(figure.shape, { concept: action.payload.concept.conceptname[0] }) } : {...figure, shape: {...figure.shape, concept: action.payload.concept.conceptname[0]} };
                }),
                openingdragfieldshapes: state.openingdragfieldshapes.map(figure => {
                    return figure.shape.id !== action.payload.figId ? figure : figure.shape.concept === undefined ? {...figure, shape: Object.assign(figure.shape, { concept: action.payload.concept.conceptname[0] }) } : {...figure, shape: {...figure.shape, concept: action.payload.concept.conceptname[0]} };
                }),
                playfieldshapes: state.playfieldshapes.map(figure => {
                    return figure.shape.id !== action.payload.figId ? figure : figure.shape.concept === undefined ? {...figure, shape: Object.assign(figure.shape, { concept: action.payload.concept.conceptname[0] }) } : {...figure, shape: {...figure.shape, concept: action.payload.concept.conceptname[0]} };
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
                dropshapelist: state.dropshapelist.filter(shape => shape.shape.id !== action.payload.shape.id).concat(action.payload),
                openingdragfieldshapes: state.openingdragfieldshapes.filter(shape => shape.shape.id !== action.payload.shape.id).concat(JSON.parse(JSON.stringify(action.payload))),
                playfieldshapes: state.playfieldshapes.filter(shape => shape.shape.id !== action.payload.shape.id).concat(JSON.parse(JSON.stringify(action.payload))),
            }

        case OpeningTypes.SELECT_EXPERIMENT_CONCEPT:
            return {
                ...state,
                opening: state.opening.expconcept === undefined ? Object.assign(state.opening, {expconcept: action.payload}) : {...state.opening, expconcept: action.payload, sequence: []},
                openingdragfieldshapes: state.openingdragfieldshapes.map(shape => shape.shape.concept === action.payload.conceptname[0] ? {...shape, shape: Object.assign(shape.shape, {openconcept: true, hidden: false})} : {...shape, shape: Object.assign(shape.shape, {openconcept: false, hidden: false})}),
            }

        case OpeningTypes.DRAG_N_DROP_OPENING:
            const sample = state.opening.sequence[0];
            return {
                ...state,
                opening: {...state.opening, sequence: state.opening.sequence.filter(shape => shape.id !== action.payload.id).concat(action.payload)},
                openingdragfieldshapes: state.openingdragfieldshapes.map(shape => shape.shape.id === action.payload.id ? {...shape, shape: Object.assign(shape.shape, {hidden: true})} : shape),
                samplelist: sample !== undefined ? state.samplelist.filter(shape => shape.id !== sample.id).concat(sample) : state.samplelist,
                playfieldshapes: sample !== undefined ? state.playfieldshapes.filter(shape => shape.shape.id !== sample.id) : state.playfieldshapes,
            }
            
        case OpeningTypes.RETURN_SHAPE:
            return {
                ...state,
                opening: {...state.opening, sequence: state.opening.sequence.filter(shape => shape.id !== action.payload.id)},
                openingdragfieldshapes: state.openingdragfieldshapes.map(shape => shape.shape.id === action.payload.id ? {...shape, shape: Object.assign(shape.shape, {hidden: false})} : shape),
            }

        case PlayTypes.DRAG_N_DROP_USER:
            return {
                ...state,
                userlist: state.userlist.filter(shape => shape.id !== action.payload.id).concat(action.payload),
                playfieldshapes: state.playfieldshapes.map(shape => shape.shape.id === action.payload.id ? {...shape, shape: Object.assign(shape.shape, {hidden: true})} : shape),
            }

        case PlayTypes.RETURN_SHAPE_USER:
            return {
                ...state,
                userlist: state.userlist.filter(shape => shape.id !== action.payload.id),
                playfieldshapes: state.playfieldshapes.map(shape => shape.shape.id === action.payload.id ? {...shape, shape: Object.assign(shape.shape, {hidden: false})} : shape),
            }

        case PlayTypes.OPEN_NEXT_SAMPLE:
            let nx = action.payload;
            for(let i = 0; i < state.playfieldshapes.length; ++i) {
                if(state.playfieldshapes[i].shape.id === state.opening.sequence[nx].id) {
                    if(state.playfieldshapes[i].shape.hidden)
                        ++nx
                    else break;
                }
            }
            return {
                ...state,
                userlist: [],
                samplelist: state.samplelist.filter(shape => shape.id !== state.opening.sequence[nx].id).concat(state.opening.sequence[nx]),
                playfieldshapes: state.playfieldshapes.filter(shape => shape.shape.id !== state.opening.sequence[nx].id).map(shape => { return {...shape, shape: Object.assign(shape.shape, {hidden: false})} }),
            }

        case PlayTypes.SELECT_ACTION_SHAPE:
            return {
                ...state,
                actionfig: { shape: action.payload, transform: "matrix(1 0 0 1 0 0)" },
                playfieldshapes: state.playfieldshapes.map(shape => shape.shape.id === action.payload.id ? {...shape, shape: Object.assign(shape.shape, {hidden: true})} : shape),
            }

        case PlayTypes.OK_ACTION_SHAPE:
            const selshape = JSON.parse(JSON.stringify(state.actionfig.shape));
            return {
                ...state,
                actionfig: {},
                userlist: state.userlist.filter(shape => shape.id !== selshape.id).concat(selshape),
            }

        case PlayTypes.CANCLE_ACTION_SHAPE:
            const selecshape = JSON.parse(JSON.stringify(state.actionfig.shape));
            return {
                ...state,
                actionfig: {},
                playfieldshapes: state.playfieldshapes.map(shape => shape.shape.id === selecshape.id ? {...shape, shape: Object.assign(shape.shape, {hidden: false})} : shape),
            }

        case PlayTypes.ROTATE_ACTION_SHAPE:
            const rotate = "matrix(.966 .259 -.259 .966 0 0)";
            const r_transform = pmatrix2(state.actionfig.transform, rotate);
            return {
                ...state,
                actionfig: {...state.actionfig, transform: r_transform},
            }

        case PlayTypes.FLIP_H_ACTION_SHAPE:
            const flip_h = "matrix(1 0 0 -1 0 0)";
            const new_transform = pmatrix2(state.actionfig.transform, flip_h);
            return {
                ...state,
                actionfig: {...state.actionfig, transform: new_transform},
            }

        case PlayTypes.FLIP_V_ACTION_SHAPE:
            const flip_v = "matrix(-1 0 0 1 0 0)";
            const n_transform = pmatrix2(state.actionfig.transform, flip_v);
            return {
                ...state,
                actionfig: {...state.actionfig, transform: n_transform},
            }

        case SaveTypes.SAVE_EXP:
            const saveObj = {
                experiment: {
                    shapes: {
                        shapeitem: state.figures,
                    },
                    concepts: {
                        conceptitem: state.selconcept,
                    },
                    field: {
                        width: state.field.width,
                        height: state.field.height,
                    },
                    placement: {
                        placeitem: state.dropshapelist.map(item => {
                            return { x: item.x, y: item.y, figureid: item.shape.id };
                        }),
                    },
                    opening: {
                        formingconcept: state.opening.expconcept.id,
                        sequence: {
                            figureid: state.opening.sequence.map(item => {
                                return item.id;
                            }),
                        },
                    },
                },
            };
            fetch("/api/save", {
                method: "POST",
                body: JSON.stringify(saveObj),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {

                console.log("SAVE!!!");
                console.log(data);
            })
            .catch();
            return state;

        case OpenTypes.OPEN_EXP:
            return {
                ...state,
                
            }

        default:
            return state;
    }
}

function pmatrix2(str1,str2) {

    let s1 = str1.substring(7, str1.length-1);
    s1 = s1.split(" ");

    let s2 = str2.substring(7, str2.length-1);
    s2 = s2.split(" ");
    
    return "matrix(" + (s1[0]*s2[0]+s1[2]*s2[1]) + " " + (s1[1]*s2[0]+s1[3]*s2[1]) + " " + (s1[0]*s2[2]+s1[2]*s2[3]) + " " + (s1[1]*s2[2]+s1[3]*s2[3]) + " " + (s1[0]*s2[4]+s1[2]*s2[5]+s1[4]*1) + " " + (s1[1]*s2[4]+s1[3]*s2[5]+s1[5]*1) + ")";
}