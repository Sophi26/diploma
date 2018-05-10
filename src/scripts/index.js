//import { createStore } from 'redux';

import createExperiment from './createExperiment';
import switchingTabs from './switchingTabs';
import featureEditor from './featureEditor';
import hypothesis from './hypothesis';

//import reducer from '../reducers/FeatureEditor';
//import getFeatures from './getFeatures';

function main() {

    /*console.log('BEGIN!!!');
    const feature_list = getFeatures();
    while (feature_list === undefined) {}
    console.log(feature_list);
    const initialState = { faetures: feature_list }; //массив объектов
    console.log('INITIAL STATE:');
    console.log(initialState);
    const store = createStore(reducer, initialState);
    console.log('STORE CREATE:');
    console.log(store);*/

    createExperiment();
    switchingTabs();
    featureEditor();
    hypothesis();
}

export {
    main as
    default,
};