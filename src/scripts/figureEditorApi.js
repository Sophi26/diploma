import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import FormData from 'form-data';
import fetch from 'node-fetch';

/*import FigureList from '../components/FigureEditor/FigureList';
import { addFigure } from '../actions/FigureEditorActions';
import { onlyImportantFeatures } from '../actions/FigureEditorActions';*/

function main(store) {

    /*render( < Provider store = { store } >
        <
        FigureList / >
        <
        /Provider>,
        document.getElementById("shape-ul"));*/

    const input = document.getElementById("upload");
    input.addEventListener('change', () => {
        let data = new FormData();
        data.append('file', input.files[0]);
        const file = data.getAll('file')[0];
        fetch("/api/upload", {
                method: "POST",
                body: data,
                //headers: data.getHeaders()
            })
            .then((response) => {
                return response.json();
            })
            .then((result) => {
                console.log(result.letter);
            })
            .catch();
    });

}

export {
    main as
    default,
};