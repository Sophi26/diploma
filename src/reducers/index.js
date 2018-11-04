import * as EditorTypes from '../constants/FeatureEditorActionTypes';
import * as FigureTypes from '../constants/FigureEditorActionTypes';
import * as SeeTypes from '../constants/SeeEditorActionTypes';
import * as PoleTypes from '../constants/PoleEditorAtionTypes';
import * as OpeningTypes from '../constants/OpeningEditorActionTypes';
import * as PlayTypes from '../constants/PlayEditorActionTypes';
import * as SaveTypes from '../constants/SaveActionTypes';
import * as OpenTypes from '../constants/OpenActionTypes';
import * as CreateTypes from '../constants/CreateActionTypes';
import * as SwitchingTabsTypes from '../constants/SwitchingTabsActionTypes';

export default function featureList(state, action = {}) {
    
    switch (action.type) {

        case EditorTypes.ADD_FEATURE:
            const new_feature = action.payload;
            return {
                ...state,
                features: state.features.concat(JSON.parse(JSON.stringify(new_feature))),
                figures: state.figures.map(figure => {
                    return {...figure, features: figure.features.concat(JSON.parse(JSON.stringify(new_feature))), };
                }),
                dragshapelist: state.dragshapelist.map(figure => {
                    return {...figure, features: figure.features.concat(JSON.parse(JSON.stringify(new_feature))), };
                }),
                dropshapelist: !state.dropshapelist.length ? [] : state.dropshapelist.map(figure => {
                    return {...figure, shape: {...figure.shape, features: figure.shape.features.concat(JSON.parse(JSON.stringify(new_feature)))} };
                }),
                openingdragfieldshapes: !state.openingdragfieldshapes.length ? [] : state.openingdragfieldshapes.map(figure => {
                    return {...figure, shape: {...figure.shape, features: figure.shape.features.concat(JSON.parse(JSON.stringify(new_feature)))} };
                }),
                playfieldshapes: !state.playfieldshapes.length ? [] : state.playfieldshapes.map(figure => {
                    return {...figure, shape: {...figure.shape, features: figure.shape.features.concat(JSON.parse(JSON.stringify(new_feature)))} };
                }),
                seeconceptshapes: {
                    ...state.seeconceptshapes,
                    shapes: state.seeconceptshapes.shapes.map(figure => {
                        return {...figure, features: figure.features.concat(JSON.parse(JSON.stringify(new_feature))) };
                    }),
                },
                samplelist: state.samplelist.map(figure => {
                    return {...figure, features: figure.features.concat(JSON.parse(JSON.stringify(new_feature))), };
                }),
                opening: {
                    ...state.opening,
                    sequence: state.opening.sequence.map(figure => {
                        return {...figure, features: figure.features.concat(JSON.parse(JSON.stringify(new_feature))) };
                    }),
                },
            }

        case EditorTypes.DELETE_FEATURE:
            let feature_values = [];
            for(let i = 0; i < state.features.length; ++i) {
                if(state.features[i].id === action.payload) {
                    feature_values = state.features[i].valuename;
                }
            }
            return {
                ...state,
                features: state.features.filter(feature => feature.id !== action.payload),
                values: state.values.id === action.payload ? { valuename: [] } : state.values,
                figures: state.figures.map(figure => {
                    return {...figure, features: figure.features.filter(feature => feature.id !== action.payload), };
                }),
                figureinfo: {...state.figureinfo, impfeatures: state.figureinfo.impfeatures.filter(feature => feature.id !== action.payload)},
                opening: {
                    ...state.opening,
                    expconcept: state.opening.expconcept === undefined ? undefined : {
                        ...state.opening.expconcept,
                        value: state.opening.expconcept.value.filter(value => feature_values.indexOf(value) === -1),
                    },
                    sequence: state.opening.sequence.map(figure => {
                        return {...figure, features: figure.features.filter(feature => feature.id !== action.payload) };
                    }),
                },
                selconcept: state.selconcept.map(concept => {
                    return {...concept, value: concept.value.filter(value => feature_values.indexOf(value) === -1) };
                }),
                dragshapelist: state.dragshapelist.map(figure => {
                    return {...figure, features: figure.features.filter(feature => feature.id !== action.payload), };
                }),
                dropshapelist: !state.dropshapelist.length ? [] : state.dropshapelist.map(figure => {
                    return {...figure, shape: {...figure.shape, features: figure.shape.features.filter(feature => feature.id !== action.payload)} };
                }),
                openingdragfieldshapes: !state.openingdragfieldshapes.length ? [] : state.openingdragfieldshapes.map(figure => {
                    return {...figure, shape: {...figure.shape, features: figure.shape.features.filter(feature => feature.id !== action.payload)} };
                }),
                playfieldshapes: !state.playfieldshapes.length ? [] : state.playfieldshapes.map(figure => {
                    return {...figure, shape: {...figure.shape, features: figure.shape.features.filter(feature => feature.id !== action.payload)} };
                }),
                seeconceptshapes: {
                    ...state.seeconceptshapes,
                    shapes: state.seeconceptshapes.shapes.map(figure => {
                        return {...figure, features: figure.features.filter(feature => feature.id !== action.payload) };
                    }),
                },
                samplelist: state.samplelist.map(figure => {
                    return {...figure, features: figure.features.filter(feature => feature.id !== action.payload), };
                }),
            }

        case EditorTypes.RENAME_FEATURE:
            return {
                ...state,
                features: state.features.map(feature => {
                    return feature.id !== action.payload.id ? feature : {...feature, featurename: action.payload.featurename };
                }),
                figures: state.figures.map(figure => {
                    return {...figure,
                        features: figure.features.map(feature => {
                            return feature.id !== action.payload.id ? feature : {...feature, featurename: action.payload.featurename };
                        }),
                    };
                }),
                figureinfo: {...state.figureinfo, impfeatures: state.figureinfo.impfeatures.map(feature => {
                    return feature.id !== action.payload.id ? feature : {...feature, name: action.payload.featurename };    
                })},
                dragshapelist: state.dragshapelist.map(figure => {
                    return {...figure, features: figure.features.map(feature => {
                        return feature.id !== action.payload.id ? feature : {...feature, featurename: action.payload.featurename };
                    }), };
                }),
                dropshapelist: !state.dropshapelist.length ? [] : state.dropshapelist.map(figure => {
                    return {...figure, shape: {...figure.shape, features: figure.shape.features.map(feature => {
                        return feature.id !== action.payload.id ? feature : {...feature, featurename: action.payload.featurename };
                    })} };
                }),
                openingdragfieldshapes: !state.openingdragfieldshapes.length ? [] : state.openingdragfieldshapes.map(figure => {
                    return {...figure, shape: {...figure.shape, features: figure.shape.features.map(feature => {
                        return feature.id !== action.payload.id ? feature : {...feature, featurename: action.payload.featurename };
                    })} };
                }),
                playfieldshapes: !state.playfieldshapes.length ? [] : state.playfieldshapes.map(figure => {
                    return {...figure, shape: {...figure.shape, features: figure.shape.features.map(feature => {
                        return feature.id !== action.payload.id ? feature : {...feature, featurename: action.payload.featurename };
                    })} };
                }),
                seeconceptshapes: {
                    ...state.seeconceptshapes,
                    shapes: state.seeconceptshapes.shapes.map(figure => {
                        return {...figure, features: figure.features.map(feature => {
                            return feature.id !== action.payload.id ? feature : {...feature, featurename: action.payload.featurename };
                        }) };
                    }),
                },
                samplelist: state.samplelist.map(figure => {
                    return {...figure, features: figure.features.map(feature => {
                        return feature.id !== action.payload.id ? feature : {...feature, featurename: action.payload.featurename };
                    }), };
                }),
                opening: {
                    ...state.opening,
                    sequence: state.opening.sequence.map(figure => {
                        return {...figure, features: figure.features.map(feature => {
                            return feature.id !== action.payload.id ? feature : {...feature, featurename: action.payload.featurename };
                        }) };
                    }),
                },
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
                    return feature.featurename !== action.payload.featurename ? feature : feature.valuename === undefined ? Object.assign(feature, { valuename: [new_value] }) : {...feature, valuename: [...feature.valuename, new_value] };
                }),
                values: {
                    ...state.values,
                    valuename: state.values.valuename.concat(new_value),
                },
                figures: state.figures.map(figure => {
                    return {...figure,
                        features: figure.features.map(feature => {
                            return feature.featurename !== action.payload.featurename ? feature : feature.valuename === undefined ? Object.assign(feature, { valuename: [new_value] }) : {...feature, valuename: [...feature.valuename, new_value] };
                        }),
                    };
                }),
                figureinfo: {...state.figureinfo, impfeatures: state.figureinfo.impfeatures.map(feature => {
                    return feature.name !== action.payload.featurename ? feature : feature.values[0] === undefined ? Object.assign(feature, { values: [new_value], selvalue: new_value }) : {...feature, values: [...feature.values, new_value] };    
                })},
                dragshapelist: state.dragshapelist.map(figure => {
                    return {...figure, features: figure.features.map(feature => {
                        return feature.featurename !== action.payload.featurename ? feature : feature.valuename === undefined ? Object.assign(feature, { valuename: [new_value] }) : {...feature, valuename: [...feature.valuename, new_value] };
                    }), };
                }),
                dropshapelist: !state.dropshapelist.length ? [] : state.dropshapelist.map(figure => {
                    return {...figure, shape: {...figure.shape, features: figure.shape.features.map(feature => {
                        return feature.featurename !== action.payload.featurename ? feature : feature.valuename === undefined ? Object.assign(feature, { valuename: [new_value] }) : {...feature, valuename: [...feature.valuename, new_value] };
                    })} };
                }),
                openingdragfieldshapes: !state.openingdragfieldshapes.length ? [] : state.openingdragfieldshapes.map(figure => {
                    return {...figure, shape: {...figure.shape, features: figure.shape.features.map(feature => {
                        return feature.featurename !== action.payload.featurename ? feature : feature.valuename === undefined ? Object.assign(feature, { valuename: [new_value] }) : {...feature, valuename: [...feature.valuename, new_value] };
                    })} };
                }),
                playfieldshapes: !state.playfieldshapes.length ? [] : state.playfieldshapes.map(figure => {
                    return {...figure, shape: {...figure.shape, features: figure.shape.features.map(feature => {
                        return feature.featurename !== action.payload.featurename ? feature : feature.valuename === undefined ? Object.assign(feature, { valuename: [new_value] }) : {...feature, valuename: [...feature.valuename, new_value] };
                    })} };
                }),
                seeconceptshapes: {
                    ...state.seeconceptshapes,
                    shapes: state.seeconceptshapes.shapes.map(figure => {
                        return {...figure, features: figure.features.map(feature => {
                            return feature.featurename !== action.payload.featurename ? feature : feature.valuename === undefined ? Object.assign(feature, { valuename: [new_value] }) : {...feature, valuename: [...feature.valuename, new_value] };
                        }) };
                    }),
                },
                samplelist: state.samplelist.map(figure => {
                    return {...figure, features: figure.features.map(feature => {
                        return feature.featurename !== action.payload.featurename ? feature : feature.valuename === undefined ? Object.assign(feature, { valuename: [new_value] }) : {...feature, valuename: [...feature.valuename, new_value] };
                    }), };
                }),
                opening: {
                    ...state.opening,
                    sequence: state.opening.sequence.map(figure => {
                        return {...figure, features: figure.features.map(feature => {
                            return feature.featurename !== action.payload.featurename ? feature : feature.valuename === undefined ? Object.assign(feature, { valuename: [new_value] }) : {...feature, valuename: [...feature.valuename, new_value] };
                        }) };
                    }),
                },
            }

        case EditorTypes.DELETE_VALUE:
            return {
                ...state,
                features: state.features.map(feature => {
                    return feature.id !== action.payload.id ? feature : {...feature, valuename: feature.valuename.filter(value => value !== action.payload.valuename) };
                }),
                values: {
                    ...state.values,
                    valuename: state.values.valuename.filter(value => value !== action.payload.valuename),
                },
                figures: state.figures.map(figure => {
                    return {...figure,
                        features: figure.features.map(feature => {
                            return feature.id !== action.payload.id ? feature : {...feature, valuename: feature.valuename.filter(value => value !== action.payload.valuename) };
                        }),
                    };
                }),
                figureinfo: {...state.figureinfo, impfeatures: state.figureinfo.impfeatures.map(feature => {
                    return feature.id !== action.payload.id ? feature : {...feature, values: feature.values.filter(value => value !== action.payload.valuename), selvalue: feature.selvalue !== action.payload.valuename ? feature.selvalue : feature.values[1] };    
                })},
                opening: {
                    ...state.opening,
                    expconcept: state.opening.expconcept === undefined ? undefined : {
                        ...state.opening.expconcept,
                        value: state.opening.expconcept.value.filter(value => value !== action.payload.valuename),
                    },
                    sequence: state.opening.sequence.map(figure => {
                        return {...figure, features: figure.features.map(feature => {
                            return feature.id !== action.payload.id ? feature : {...feature, valuename: feature.valuename.filter(value => value !== action.payload.valuename) };
                        }) };
                    }),
                },
                selconcept: state.selconcept.map(concept => {
                    return {...concept, value: concept.value.filter(value => value !== action.payload.valuename) };
                }),
                dragshapelist: state.dragshapelist.map(figure => {
                    return {...figure, features: figure.features.map(feature => {
                        return feature.id !== action.payload.id ? feature : {...feature, valuename: feature.valuename.filter(value => value !== action.payload.valuename) };
                    }), };
                }),
                dropshapelist: !state.dropshapelist.length ? [] : state.dropshapelist.map(figure => {
                    return {...figure, shape: {...figure.shape, features: figure.shape.features.map(feature => {
                        return feature.id !== action.payload.id ? feature : {...feature, valuename: feature.valuename.filter(value => value !== action.payload.valuename) };
                    })} };
                }),
                openingdragfieldshapes: !state.openingdragfieldshapes.length ? [] : state.openingdragfieldshapes.map(figure => {
                    return {...figure, shape: {...figure.shape, features: figure.shape.features.map(feature => {
                        return feature.id !== action.payload.id ? feature : {...feature, valuename: feature.valuename.filter(value => value !== action.payload.valuename) };
                    })} };
                }),
                playfieldshapes: !state.playfieldshapes.length ? [] : state.playfieldshapes.map(figure => {
                    return {...figure, shape: {...figure.shape, features: figure.shape.features.map(feature => {
                        return feature.id !== action.payload.id ? feature : {...feature, valuename: feature.valuename.filter(value => value !== action.payload.valuename) };
                    })} };
                }),
                seeconceptshapes: {
                    ...state.seeconceptshapes,
                    shapes: state.seeconceptshapes.shapes.map(figure => {
                        return {...figure, features: figure.features.map(feature => {
                            return feature.id !== action.payload.id ? feature : {...feature, valuename: feature.valuename.filter(value => value !== action.payload.valuename) };
                        }) };
                    }),
                },
                samplelist: state.samplelist.map(figure => {
                    return {...figure, features: figure.features.map(feature => {
                        return feature.id !== action.payload.id ? feature : {...feature, valuename: feature.valuename.filter(value => value !== action.payload.valuename) };
                    }), };
                }),
            }

        case EditorTypes.RENAME_VALUE:
            return {
                ...state,
                features: state.features.map(feature => {
                    return feature.id !== action.payload.id ? feature : {...feature, valuename: feature.valuename.map(value => { return value !== action.payload.prevname ? value : action.payload.valuename; }) };
                }),
                values: {
                    ...state.values,
                    valuename: state.values.valuename.map(value => { return value !== action.payload.prevname ? value : action.payload.valuename; }),
                },
                figures: state.figures.map(figure => {
                    return {...figure,
                        features: figure.features.map(feature => {
                            return feature.id !== action.payload.id ? feature : {...feature, valuename: feature.valuename.map(value => { return value !== action.payload.prevname ? value : action.payload.valuename; }) };
                        }),
                    };
                }),
                figureinfo: {...state.figureinfo, impfeatures: state.figureinfo.impfeatures.map(feature => {
                    return feature.id !== action.payload.id ? feature : {...feature, values: feature.values.map(value => { return value !== action.payload.prevname ? value : action.payload.valuename; }), selvalue: feature.selvalue !== action.payload.prevname ? feature.selvalue : action.payload.valuename };    
                })},
                opening: {
                    ...state.opening,
                    expconcept: state.opening.expconcept === undefined ? undefined : {
                        ...state.opening.expconcept,
                        value: state.opening.expconcept.value.map(value => { return value !== action.payload.prevname ? value : action.payload.valuename; }),
                    },
                    sequence: state.opening.sequence.map(figure => {
                        return {...figure, features: figure.features.map(feature => {
                            return feature.id !== action.payload.id ? feature : {...feature, valuename: feature.valuename.map(value => { return value !== action.payload.prevname ? value : action.payload.valuename; }) };
                        }) };
                    }),
                },
                selconcept: state.selconcept.map(concept => {
                    return {...concept, value: concept.value.map(value => { return value !== action.payload.prevname ? value : action.payload.valuename; }) };
                }),
                dragshapelist: state.dragshapelist.map(figure => {
                    return {...figure, features: figure.features.map(feature => {
                        return feature.id !== action.payload.id ? feature : {...feature, valuename: feature.valuename.map(value => { return value !== action.payload.prevname ? value : action.payload.valuename; }) };
                    }), };
                }),
                dropshapelist: !state.dropshapelist.length ? [] : state.dropshapelist.map(figure => {
                    return {...figure, shape: {...figure.shape, features: figure.shape.features.map(feature => {
                        return feature.id !== action.payload.id ? feature : {...feature, valuename: feature.valuename.map(value => { return value !== action.payload.prevname ? value : action.payload.valuename; }) };
                    })} };
                }),
                openingdragfieldshapes: !state.openingdragfieldshapes.length ? [] : state.openingdragfieldshapes.map(figure => {
                    return {...figure, shape: {...figure.shape, features: figure.shape.features.map(feature => {
                        return feature.id !== action.payload.id ? feature : {...feature, valuename: feature.valuename.map(value => { return value !== action.payload.prevname ? value : action.payload.valuename; }) };
                    })} };
                }),
                playfieldshapes: !state.playfieldshapes.length ? [] : state.playfieldshapes.map(figure => {
                    return {...figure, shape: {...figure.shape, features: figure.shape.features.map(feature => {
                        return feature.id !== action.payload.id ? feature : {...feature, valuename: feature.valuename.map(value => { return value !== action.payload.prevname ? value : action.payload.valuename; }) };
                    })} };
                }),
                seeconceptshapes: {
                    ...state.seeconceptshapes,
                    shapes: state.seeconceptshapes.shapes.map(figure => {
                        return {...figure, features: figure.features.map(feature => {
                            return feature.id !== action.payload.id ? feature : {...feature, valuename: feature.valuename.map(value => { return value !== action.payload.prevname ? value : action.payload.valuename; }) };
                        }) };
                    }),
                },
                samplelist: state.samplelist.map(figure => {
                    return {...figure, features: figure.features.map(feature => {
                        return feature.id !== action.payload.id ? feature : {...feature, valuename: feature.valuename.map(value => { return value !== action.payload.prevname ? value : action.payload.valuename; }) };
                    }), };
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
                dragshapelist: state.dragshapelist.filter(figure => figure.id !== action.payload),
                dropshapelist: state.dropshapelist.filter(item => item.shape.id !== action.payload),
                opening: {
                    ...state.opening,
                    sequence: state.opening.sequence.filter(figure => figure.id !== action.payload),
                },
                openingdragfieldshapes: state.openingdragfieldshapes.filter(item => item.shape.id !== action.payload),
                playfieldshapes: state.playfieldshapes.filter(item => item.shape.id !== action.payload),
                samplelist: state.samplelist.filter(figure => figure.id !== action.payload),
                seeconceptshapes: {
                    ...state.seeconceptshapes,
                    shapes: state.seeconceptshapes.shapes.filter(figure => figure.id !== action.payload),
                },
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
                            return feature.id !== action.payload.featureid ? feature : {...feature, important: true };
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
                            return feature.id !== action.payload.featureid ? feature : {...feature, important: false };
                        })
                    };
                }),
                figureinfo: state.figureinfo.id !== action.payload.figureid ? state.figureinfo : {...state.figureinfo, impfeatures: state.figureinfo.impfeatures.filter(feature => feature.id !== action.payload.featureid), },
            }

        case FigureTypes.CONCEPT_OPTIONS:
            let check_sel = false;
            for (let i = 0; i < state.figures.length; ++i) {
                if (state.figures[i].id === action.payload.figId) {
                    if(state.figures[i].concept !== undefined) {
                        check_sel = true;
                    }
                }
            }
            return {
                ...state,
                figureinfo: Object.assign(state.figureinfo, { concepts: !check_sel ? action.payload.concepts : action.payload.concepts.map(concept => { return Object.assign(JSON.parse(JSON.stringify(concept)), { select: true }); }) }),
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
                            return feature.id !== action.payload.id ? feature : {...feature, valuename: val };
                        })
                    };
                }),
                figureinfo: state.figureinfo.id !== action.payload.figId ? state.figureinfo : {...state.figureinfo, impfeatures: state.figureinfo.impfeatures.map(feature => feature.id === action.payload.id ? {...feature, values: val, selvalue: action.payload.value } : feature) },
            }

        case FigureTypes.SELECT_CONCEPT:
            return {
                ...state,
                figures: state.figures.map(figure => {
                    return figure.id !== action.payload.figId ? figure : figure.concept === undefined ? Object.assign(figure, { concept: action.payload.concept.conceptname }) : {...figure, concept: action.payload.concept.conceptname };
                }),
                dragshapelist: state.dragshapelist.map(figure => {
                    return figure.id !== action.payload.figId ? figure : figure.concept === undefined ? Object.assign(figure, { concept: action.payload.concept.conceptname }) : {...figure, concept: action.payload.concept.conceptname };
                }),
                dropshapelist: state.dropshapelist.map(figure => {
                    return figure.shape.id !== action.payload.figId ? figure : figure.shape.concept === undefined ? {...figure, shape: Object.assign(figure.shape, { concept: action.payload.concept.conceptname }) } : {...figure, shape: {...figure.shape, concept: action.payload.concept.conceptname} };
                }),
                openingdragfieldshapes: state.openingdragfieldshapes.map(figure => {
                    return figure.shape.id !== action.payload.figId ? figure : figure.shape.concept === undefined ? {...figure, shape: Object.assign(figure.shape, { concept: action.payload.concept.conceptname }) } : {...figure, shape: {...figure.shape, concept: action.payload.concept.conceptname} };
                }),
                playfieldshapes: state.playfieldshapes.map(figure => {
                    return figure.shape.id !== action.payload.figId ? figure : figure.shape.concept === undefined ? {...figure, shape: Object.assign(figure.shape, { concept: action.payload.concept.conceptname }) } : {...figure, shape: {...figure.shape, concept: action.payload.concept.conceptname} };
                }),
                selconcept: state.selconcept.filter(conc => conc.conceptname !== action.payload.concept.conceptname).concat(action.payload.concept),
            }

        case FigureTypes.RENAME_CONCEPT:
            return {
                ...state,
                figures: state.figures.map(figure => {
                    return figure.concept !== action.payload.axeconc ? figure : {...figure, concept: action.payload.newconc};
                }),
                dragshapelist: state.dragshapelist.map(figure => {
                    return figure.concept !== action.payload.axeconc ? figure : {...figure, concept: action.payload.newconc};
                }),
                dropshapelist: state.dropshapelist.map(figure => {
                    return figure.shape.concept !== action.payload.axeconc ? figure : {...figure, shape: {...figure.shape, concept: action.payload.newconc} };
                }),
                openingdragfieldshapes: state.openingdragfieldshapes.map(figure => {
                    return figure.shape.concept !== action.payload.axeconc ? figure : {...figure, shape: {...figure.shape, concept: action.payload.newconc} };
                }),
                playfieldshapes: state.playfieldshapes.map(figure => {
                    return figure.shape.concept !== action.payload.axeconc ? figure : {...figure, shape: {...figure.shape, concept: action.payload.newconc} };
                }),
                selconcept: state.selconcept.map(conc => {
                    return conc.conceptname !== action.payload.axeconc ? conc : {...conc, conceptname: action.payload.newconc};
                }),
                opening: state.opening.expconcept === undefined ? state.opening : { expconcept: state.opening.expconcept.conceptname !== action.payload.axeconc ? state.opening.expconcept : {...state.opening.expconcept, conceptname: action.payload.newconc}, 
                    sequence: state.opening.sequence.map(shape => {
                        return shape.concept !== action.payload.axeconc ? shape : {...shape, concept: action.payload.newconc};
                    }),
                },
                samplelist: state.samplelist.map(shape => {
                    return shape.concept !== action.payload.axeconc ? shape : {...shape, concept: action.payload.newconc};
                }),
                seeconceptshapes: state.seeconceptshapes.conceptname === undefined ? state.seeconceptshapes : {...state.seeconceptshapes, 
                    conceptname: state.seeconceptshapes.conceptname !== action.payload.axeconc ? state.seeconceptshapes.conceptname : action.payload.newconc,
                    shapes: state.seeconceptshapes.shapes.map(shape => {
                        return shape.concept !== action.payload.axeconc ? shape : {...shape, concept: action.payload.newconc};
                    }),    
                },
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
                openingdragfieldshapes: state.openingdragfieldshapes.map(shape => shape.shape.concept === action.payload.conceptname ? {...shape, shape: Object.assign(shape.shape, {openconcept: true, hidden: false})} : {...shape, shape: Object.assign(shape.shape, {openconcept: false, hidden: false})}),
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

                
            })
            .catch();
            return state;

        case OpenTypes.OPEN_EXP:
            let drop_field = [];
            for(let i = 0; i < action.payload.experiment.placement.placeitem.length; ++i) {
                for(let j = 0; j < action.payload.experiment.shapes.shapeitem.length; ++j) {
                    if(action.payload.experiment.placement.placeitem[i].figureid == action.payload.experiment.shapes.shapeitem[j].id) {
                        drop_field.push({ x: action.payload.experiment.placement.placeitem[i].x, y: action.payload.experiment.placement.placeitem[i].y, shape: JSON.parse(JSON.stringify(action.payload.experiment.shapes.shapeitem[j])) });
                    }
                } 
            }
            let drag_field = [];
            for(let i = 0; i < action.payload.experiment.shapes.shapeitem.length; ++i) {
                let check = 0;
                for(let j = 0; j < action.payload.experiment.placement.placeitem.length; ++j) {
                    if(action.payload.experiment.shapes.shapeitem[i].id == action.payload.experiment.placement.placeitem[j].figureid) {
                        check = 1;
                        break;
                    }
                }
                if(!check) drag_field.push(action.payload.experiment.shapes.shapeitem[i]); 
            }
            let sel_conc = {};
            for(let i = 0; i < action.payload.experiment.concepts.conceptitem.length; ++i) {
                if(action.payload.experiment.opening.formingconcept == action.payload.experiment.concepts.conceptitem[i].id) {
                    sel_conc = action.payload.experiment.concepts.conceptitem[i];
                }
            }
            let shape_queue = [];
            let open_field = JSON.parse(JSON.stringify(drop_field));
            open_field.map(shape => shape.shape.concept === sel_conc.conceptname ? {...shape, shape: Object.assign(shape.shape, {openconcept: true, hidden: false})} : {...shape, shape: Object.assign(shape.shape, {openconcept: false, hidden: false})});
            for(let i = 0; i < action.payload.experiment.opening.sequence.figureid.length; ++i) {
                for(let j = 0; j < open_field.length; ++j) {
                    if(open_field[j].shape.id == action.payload.experiment.opening.sequence.figureid[i]) {
                        open_field[j].shape.hidden = true;
                        shape_queue.push(open_field[j].shape);
                        break;
                    }
                }
            }
            let play_field = JSON.parse(JSON.stringify(drop_field));
            play_field.map(shape => shape.shape.concept === sel_conc.conceptname ? {...shape, shape: Object.assign(shape.shape, {openconcept: true, hidden: false})} : {...shape, shape: Object.assign(shape.shape, {openconcept: false, hidden: false})});
            let sample_list = [];
            sample_list = shape_queue[0] !== undefined ? sample_list.concat(shape_queue[0]) : sample_list;
            play_field = shape_queue[0] !== undefined ? play_field.filter(shape => shape.shape.id !== shape_queue[0].id) : play_field;
            return {
                ...state,
                figures: action.payload.experiment.shapes.shapeitem,
                selconcept: action.payload.experiment.concepts.conceptitem,
                seeconceptshapes: { shapes: [] },
                figureinfo: { impfeatures: [], concepts: [] },
                figureimg: {},
                field: { width: action.payload.experiment.field.width, height: action.payload.experiment.field.width },
                opening: { expconcept: sel_conc, sequence: shape_queue },
                dragshapelist: drag_field,
                dropshapelist: drop_field,
                openingdragfieldshapes: open_field,
                playfieldshapes: play_field,
                samplelist: sample_list,
                userlist: [],
                actionfig: {},
            }

        case CreateTypes.CREATE_EXP:
            return {
                ...state,
                figures: [],
                selconcept: [],
                seeconceptshapes: { shapes: [] },
                figureinfo: { impfeatures: [], concepts: [] },
                figureimg: {},
                field: { width: 0, height: 0 },
                opening: { sequence: [] },
                dragshapelist: [],
                dropshapelist: [],
                openingdragfieldshapes: [],
                playfieldshapes: [],
                samplelist: [],
                userlist: [],
                actionfig: {},
            }

        case SwitchingTabsTypes.INIT_PLAY:
            const switch_sample = state.opening.sequence[0];
            let init_samplelist = [];
            init_samplelist = switch_sample !== undefined ? init_samplelist.concat(switch_sample) : init_samplelist;
            let init_playfield = JSON.parse(JSON.stringify(state.openingdragfieldshapes));
            init_playfield.map(shape => { return {...shape, shape: Object.assign(shape.shape, {hidden: false})}; });
            init_playfield = switch_sample !== undefined ? init_playfield.filter(shape => shape.shape.id !== switch_sample.id) : init_playfield;
            return {
                ...state,
                playfieldshapes: init_playfield,
                samplelist: init_samplelist,
                userlist: [],
                actionfig: {},
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