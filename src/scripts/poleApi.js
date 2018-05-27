import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import FormData from 'form-data';
import fetch from 'node-fetch';

import ShapeList from '../components/PoleEditor/ShapeList';
import FieldTable from '../components/PoleEditor/FieldTable';

function main(store) {

    render( <Provider store={store}><ShapeList /></Provider>, document.getElementById("sh-li"));
    render( <Provider store={store}><FieldTable /></Provider>, document.getElementById("f-table"));
}

export {
    main as default,
};