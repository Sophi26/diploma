import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import FormData from 'form-data';
import fetch from 'node-fetch';

import SeeConceptList from '../components/SeeEditor/SeeConceptList';
import FlexConceptShapes from '../components/SeeEditor/FlexConceptShapes';
import FlexAllShapes from '../components/SeeEditor/FlexAllShapes';

function main(store) {

    render( < Provider store = { store } >
            <
            SeeConceptList / >
            <
            /Provider>, document.getElementById("see-conc-list"));

            render( < Provider store = { store } >
                <
                FlexConceptShapes / >
                <
                /Provider>, document.getElementById("shapes-select-concept"));

                render( < Provider store = { store } >
                    <
                    FlexAllShapes / >
                    <
                    /Provider>, document.getElementById("see-all-fig"));
                }

                export {
                    main as
                    default,
                };