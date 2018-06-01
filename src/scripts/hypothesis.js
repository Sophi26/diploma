import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import OkList from '../components/PlayEditor/OkList';
import HypList from '../components/PlayEditor/HypList';
import { nextSample } from '../actions/PlayEditorActions';

function main(store) {

    const btn = document.getElementById("select-btn");

    btn.addEventListener('click', () => {

        const modal_shadow = document.querySelectorAll(".modal-shadow")[1];
        modal_shadow.style.display = 'block';

        const ok_window = document.getElementById("ok-window");
        ok_window.style.display = 'block';

        render( <Provider store={store}><OkList /></Provider>, document.getElementById("ok-user-list"));

        const hypBtn = document.getElementById("call-hyp");
        const hyp_window = document.getElementById("hyp-window");

        hypBtn.addEventListener('click', () => {

            ok_window.style.display = 'none';
            hyp_window.style.display = 'block';

            render( <Provider store={store}><HypList /></Provider>, document.getElementById("hyp-user-list"));
        
            const hyp_ok_btn = document.getElementById("next-sample");
            let next = 0;
            hyp_ok_btn.addEventListener('click', () => {

                ++next;
                const action = nextSample(next);
                store.dispatch(action);

                modal_shadow.style.display = 'none';
                ok_window.style.display = 'none';
                hyp_window.style.display = 'none';
            });
        });

        modal_shadow.addEventListener('click', () => {

            modal_shadow.style.display = 'none';
            ok_window.style.display = 'none';
            hyp_window.style.display = 'none';
        });
    });
}

export {
    main as
    default,
};