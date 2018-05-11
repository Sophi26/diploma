import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducer from '../reducers/FeatureEditorReducer';
import FeatureList from '../components/FeatureEditor/FeatureList';
import ValueList from '../components/FeatureEditor/ValueList';
import { addFeature } from '../actions/FeatureEditorActions';
import { addValue } from '../actions/FeatureEditorActions';

function main() {

    fetch("/api/attributes", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((result) => {

            const initialState = {
                features: result,
                values: { id: result[0].id, valuename: result[0].valuename },
            };
            const store = createStore(reducer, initialState);

            render( < Provider store = { store } >
                <
                FeatureList / >
                <
                /Provider>,
                document.getElementById("feature-ul"));

            render( < Provider store = { store } >
                <
                ValueList / >
                <
                /Provider>,
                document.getElementById("value-ul"));

            const input = document.getElementById("f-add-feature");
            input.addEventListener('focus', () => {
                if (input.value == 'Имя')
                    input.value = '';
            });
            input.addEventListener('blur', () => {
                if (input.value == '')
                    input.value = 'Имя';
            });

            const add_feature_btn = document.querySelector(".plus");
            add_feature_btn.addEventListener('click', () => {

                if (input.value != 'Имя') {
                    const feature_name = input.value;
                    fetch("/api/attributes", {
                            method: "POST",
                            body: JSON.stringify({
                                featurename: feature_name,
                            }),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                        .then((response) => {
                            return response.json();
                        })
                        .then((data) => {

                            const action = addFeature(data.id[0], data.featurename[0]);
                            store.dispatch(action);
                        })
                        .catch();
                    input.value = 'Имя';
                }
            });

            const input_value = document.getElementById("f-add-attribute");
            input_value.addEventListener('focus', () => {
                if (input_value.value == 'Имя')
                    input_value.value = '';
            });
            input_value.addEventListener('blur', () => {
                if (input_value.value == '')
                    input_value.value = 'Имя';
            });

            const add_value_btn = document.querySelectorAll(".plus")[1];
            add_value_btn.addEventListener('click', () => {

                if (input_value.value != 'Имя') {
                    const value_name = input_value.value;
                    fetch("/api/values", {
                            method: "POST",
                            body: JSON.stringify({
                                featurename: document.querySelector(".active-feature").textContent,
                                valuename: value_name,
                            }),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                        .then((response) => {
                            return response.json();
                        })
                        .then((data) => {

                            const value_action = addValue(document.querySelector(".active-feature").textContent, data.valuename);
                            store.dispatch(value_action);
                        })
                        .catch();
                    input_value.value = 'Имя';
                }
            });
        })
        .catch();
}

export {
    main as
    default,
};