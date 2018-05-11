import { createStore } from 'redux';

import reducer from '../reducers/index';
import createExperiment from './createExperiment';
import switchingTabs from './switchingTabs';
import featureEditor from './featureEditor';
import figureEditor from './figureEditor';
import hypothesis from './hypothesis';

function main() {

    const store = createStore(reducer);

    createExperiment();
    switchingTabs();
    featureEditor();
    figureEditor(store);
    hypothesis();
}

export {
    main as
    default,
};