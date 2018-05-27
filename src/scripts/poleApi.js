import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import FormData from 'form-data';
import fetch from 'node-fetch';

import ShapeList from '../components/PoleEditor/ShapeList';
import FieldTable from '../components/PoleEditor/FieldTable';
import { createField } from '../actions/PoleEditorActions';

function main(store) {

    render( <Provider store={store}><ShapeList /></Provider>, document.getElementById("sh-li"));
    render( <Provider store={store}><FieldTable /></Provider>, document.getElementById("f-table"));

    const width_input = document.getElementById("f-width");
    const height_input = document.getElementById("f-height");

    width_input.addEventListener('change', () => {

        const action = createField(width_input.value, height_input.value);
        store.dispatch(action);
    });
    
    height_input.addEventListener('change', () => {

        const action = createField(width_input.value, height_input.value);
        store.dispatch(action);
    });
}

export {
    main as default,
};