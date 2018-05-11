import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import FigureList from '../components/FigureEditor/FigureList';
import { addFigure } from '../actions/FigureEditorActions';
import { onlyImportantFeatures } from '../actions/FigureEditorActions';

function main(store) {

    render( < Provider store = { store } >
        <
        FigureList / >
        <
        /Provider>,
        document.getElementById("shape-ul"));

    const input = document.getElementById("upload");
    input.addEventListener('change', () => {
        fetch("/api/upload", {
                method: "POST",
                files: {
                    svgFile: input.files,
                },
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                return response.json();
            })
            .then((result) => {
                console.log(result);
            })
            .catch();
    });

}

export {
    main as
    default,
};