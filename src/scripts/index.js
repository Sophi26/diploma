import { createStore } from 'redux';

import reducer from '../reducers';
import createExperiment from './createExperiment';
import switchingTabs from './switchingTabs';
import featureEditor from './featureEditor';
import figureEditorApi from './figureEditorApi';
import seeMaterialApi from './seeMaterialApi';
import poleApi from './poleApi';
import openingApi from './openingApi';
import playApi from './playApi';
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
                selconcept: [],
                seeconceptshapes: { shapes: [] },
                figureinfo: { impfeatures: [], concepts: [] },
                figureimg: {},
                features: result,
                values: { id: result[0].id, valuename: result[0].valuename },
                field: { width: 0, height: 0, placement: [] },
                opening: { sequence: [] },
                dragshapelist: [],
                dropshapelist: [],
                openingdragfieldshapes: [],
                playfieldshapes: [],
                samplelist: [],
                userlist: [],
            };
            const store = createStore(reducer, initialState);

            switchingTabs();
            featureEditor(store);
            figureEditorApi(store);
            seeMaterialApi(store);
            poleApi(store);
            openingApi(store);
            playApi(store);
            hypothesis(store);
        })
        .catch();
}

export {
    main as
    default,
};