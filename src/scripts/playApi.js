import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Task from '../components/PlayEditor/Task';
import Grid from '../components/PlayEditor/Grid';
import PlayShapeList from '../components/PlayEditor/PlayShapeList';

function main(store) {

    render( <Provider store={store}><Task /></Provider>, document.getElementById("criterion"));
    render( <Provider store={store}><Grid /></Provider>, document.getElementById("grid"));
    render( <Provider store={store}><PlayShapeList /></Provider>, document.getElementById("sample-list"));
}

export {
    main as default,
};