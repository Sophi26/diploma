import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Task from '../components/PlayEditor/Task';
import Grid from '../components/PlayEditor/Grid';
import PlayShapeList from '../components/PlayEditor/PlayShapeList';
import ActionBlock from '../components/PlayEditor/ActionBlock';

function main(store) {

    render( <Provider store={store}><Task /></Provider>, document.getElementById("criterion"));
    render( <Provider store={store}><Grid /></Provider>, document.getElementById("grid"));
    render( <Provider store={store}><PlayShapeList /></Provider>, document.getElementById("sample-list"));
    render( <Provider store={store}><ActionBlock /></Provider>, document.getElementById("active-fig"));

    const ok_btn = document.getElementById("yes-btn");
    const cancle_btn = document.getElementById("no-btn");

    ok_btn.addEventListener('click', () => {

    });

    cancle_btn.addEventListener('click', () => {

    });
}

export {
    main as default,
};