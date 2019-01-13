import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import OkList from '../components/PlayEditor/OkList';
import HypList from '../components/PlayEditor/HypList';
import { nextSample } from '../actions/PlayEditorActions';
import { endSelection } from '../actions/PlayEditorActions';
import { okSelection } from '../actions/PlayEditorActions';
import { cancleSelection } from '../actions/PlayEditorActions';
import { cancleHypothesis } from '../actions/PlayEditorActions';
import { endExperiment } from '../actions/PlayEditorActions';

function main(store) {

    const btn = document.getElementById("select-btn");
    const modal_shadow = document.querySelectorAll(".modal-shadow")[1];
    const ok_window = document.getElementById("ok-window");
    const hyp_window = document.getElementById("hyp-window");
    const hypBtn = document.getElementById("call-hyp");
    const cancleHypBtn = document.getElementById("cancle-call-hyp");
    const hyp_ok_btn = document.getElementById("next-sample");
    const hyp_cancle_btn = document.getElementById("cancle-next-sample");

    btn.addEventListener('click', () => {

                const action = endSelection();
                store.dispatch(action);

                modal_shadow.style.display = 'block';
                ok_window.style.display = 'block';

                render( < Provider store = { store } >
                    <
                    OkList / >
                    <
                    /Provider>, document.getElementById("ok-user-list"));
                });

            cancleHypBtn.addEventListener('click', () => {

                const action = cancleSelection();
                store.dispatch(action);

                ok_window.style.display = 'none';
                modal_shadow.style.display = 'none';
            });

            let next = 0; hypBtn.addEventListener('click', () => {

                    next = 0;
                    const action = okSelection();
                    store.dispatch(action);

                    ok_window.style.display = 'none';
                    hyp_window.style.display = 'block';

                    render( < Provider store = { store } >
                        <
                        HypList / >
                        <
                        /Provider>, document.getElementById("hyp-user-list"));
                    });

                hyp_ok_btn.addEventListener('click', () => {

                    ++next;

                    const action = nextSample(next);
                    store.dispatch(action);

                    const act = endExperiment();
                    store.dispatch(act);

                    document.getElementById("f-add-hyp").value = "Ваше мнение...";

                    modal_shadow.style.display = 'none';
                    hyp_window.style.display = 'none';
                });

                hyp_cancle_btn.addEventListener('click', () => {

                    const action = cancleHypothesis();
                    store.dispatch(action);

                    modal_shadow.style.display = 'none';
                    hyp_window.style.display = 'none';
                });

                modal_shadow.addEventListener('click', () => {

                    modal_shadow.style.display = 'none';
                    ok_window.style.display = 'none';
                    hyp_window.style.display = 'none';
                });
            }

            export {
                main as
                default,
            };