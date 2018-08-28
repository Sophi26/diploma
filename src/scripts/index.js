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
import saveExperiment from './saveExperiment';
import earlyExperiments from './earlyExperiments';
import openExperiment from './openExperiment';
import createInMenu from './createInMenu';
import earlyExperimentsInMenu from './earlyExperimentsInMenu';
import sidebarButtons from './sidebarButtons';

function main() {

    earlyExperiments();
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
                field: { width: 0, height: 0 },
                opening: { sequence: [] },
                dragshapelist: [],
                dropshapelist: [],
                openingdragfieldshapes: [],
                playfieldshapes: [],
                samplelist: [],
                userlist: [],
                actionfig: {},
            };
            const store = createStore(reducer, initialState);

            createInMenu(store);
            openExperiment(store);
            sidebarButtons(store);
            earlyExperimentsInMenu(store);
            switchingTabs(store);
            saveExperiment(store);
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