import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import FormData from 'form-data';
import fetch from 'node-fetch';

import FigureList from '../components/FigureEditor/FigureList';
import FigureInfo from '../components/FigureEditor/FigureInfo';
import FigureImg from '../components/FigureEditor/FigureImg';
import { addFigure } from '../actions/FigureEditorActions';
import { onlyImportantFeatures } from '../actions/FigureEditorActions';

function main(store) {

    render( < Provider store = { store } >
            <
            FigureList / >
            <
            /Provider>, document.getElementById("shape-ul"));

            render( < Provider store = { store } >
                <
                FigureInfo / >
                <
                /Provider>, document.getElementById("shape-description"));

                render( < Provider store = { store } >
                    <
                    FigureImg / >
                    <
                    /Provider>, document.getElementById("select-shape"));

                    let figId = 1;
                    const input = document.getElementById("upload"); input.addEventListener('change', () => {
                        const file_name = input.files[0].name.substr(0, input.files[0].name.length - 4);
                        let data = new FormData();
                        data.append('file', input.files[0]);
                        fetch("/api/upload", {
                                method: "POST",
                                body: data,
                            })
                            .then((response) => {
                                return response.json();
                            })
                            .then((result) => {
                                const action = addFigure(figId, result, file_name);
                                store.dispatch(action);
                                ++figId;
                            })
                            .catch();
                    });

                }

                export {
                    main as
                    default,
                };