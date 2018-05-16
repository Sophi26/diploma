import { createStore } from 'redux';

import reducer from '../reducers';
import createExperiment from './createExperiment';
import switchingTabs from './switchingTabs';
import featureEditor from './featureEditor';
import figureEditorApi from './figureEditorApi';
import hypothesis from './hypothesis';

function main() {

    createExperiment();

    fetch("/api/attributes", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((result) => {

            const initialState = {
                figures: [],
                figureinfo: { impfeatures: [] },
                figureimg: {},
                features: result,
                values: { id: result[0].id, valuename: result[0].valuename },
            };
            const store = createStore(reducer, initialState);

            switchingTabs();
            featureEditor(store);
            figureEditorApi(store);
            hypothesis();
        })
        .catch();
}

export {
    main as
    default,
};