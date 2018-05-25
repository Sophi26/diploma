import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import FormData from 'form-data';
import fetch from 'node-fetch';

import ShapeList from '../components/PoleEditor/ShapeList';

function main(store) {

    render( < Provider store = { store } >
        <
        ShapeList / >
        <
        /Provider>, document.getElementById("sh-li"));
    }

    export {
        main as
        default,
    };