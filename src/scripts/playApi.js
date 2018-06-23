import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Task from '../components/PlayEditor/Task';
import Grid from '../components/PlayEditor/Grid';
import PlayShapeList from '../components/PlayEditor/PlayShapeList';
import ActionBlock from '../components/PlayEditor/ActionBlock';

import { okActionFigure } from '../actions/PlayEditorActions';
import { cancleActionFigure } from '../actions/PlayEditorActions';
import { rotateActionFigure } from '../actions/PlayEditorActions';
import { flipHActionFigure } from '../actions/PlayEditorActions';
import { flipVActionFigure } from '../actions/PlayEditorActions';

function main(store) {

    render( <Provider store={store}><Task /></Provider>, document.getElementById("criterion"));
    render( <Provider store={store}><Grid /></Provider>, document.getElementById("grid"));
    render( <Provider store={store}><PlayShapeList /></Provider>, document.getElementById("sample-list"));
    render( <Provider store={store}><ActionBlock /></Provider>, document.getElementById("active-fig"));

    const ok_btn = document.getElementById("yes-btn");
    const cancle_btn = document.getElementById("no-btn");

    ok_btn.addEventListener('click', () => {
        const action = okActionFigure();
        store.dispatch(action);
    });

    cancle_btn.addEventListener('click', () => {
        const action = cancleActionFigure();
        store.dispatch(action);
    });

    const rotate_btn = document.getElementById("rotate");
    const flip_h_btn = document.getElementById("flip-h");
    const flip_v_btn = document.getElementById("flip-v");

    rotate_btn.addEventListener('click', () => {
        const action = rotateActionFigure();
        store.dispatch(action);
    });

    flip_h_btn.addEventListener('click', () => {
        const action = flipHActionFigure();
        store.dispatch(action);
    });

    flip_v_btn.addEventListener('click', () => {
        const action = flipVActionFigure();
        store.dispatch(action);
    });
}

export {
    main as default,
};