import $ from 'jquery';

import { openExp } from '../actions/OpenActions';

function main(store) {

    fetch("/api/early", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((result) => {

            const expList = document.getElementById("early-experiments");

            for (let i = 0; i < result.length; i++) {

                let expitem = document.createElement("li");
                let expName = document.createElement("a");
                expName.appendChild(document.createTextNode(result[i].slice(0, -4)));
                expitem.appendChild(expName);
                expList.appendChild(expitem);
                expName.addEventListener('click', () => {
                    fetch("/api/open", {
                            method: "POST",
                            body: JSON.stringify({
                                filename: result[i],
                            }),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
                        .then((response) => {
                            return response.json();
                        })
                        .then((data) => {

                            const action = openExp(data);
                            store.dispatch(action);

                            document.getElementById("exp-name").textContent = result[i].slice(0, -4);
                            document.getElementById("start").style.display = 'none';
                            document.getElementById("creation").style.display = 'block';
                            document.getElementById("early-experiments").style.display = 'none';
                            $('#hidden-menu-ticker').prop('checked', false);
                            document.getElementById("f-width").value = data.experiment.field.width;
                            document.getElementById("f-height").value = data.experiment.field.height;
                        })
                        .catch();
                });
            }
        })
        .catch();

    const recent_button = document.getElementById("open-recent-button");
    const early_list = document.getElementById("early-experiments");

    recent_button.addEventListener('mouseover', () => {

        early_list.style.display = 'block';
    });

    let timerId;
    recent_button.addEventListener('mouseout', () => {

        timerId = setTimeout(() => {
            early_list.style.display = 'none';
        }, 300);
    });

    early_list.addEventListener('mouseover', () => {

        clearTimeout(timerId);
        early_list.style.display = 'block';
    });

    early_list.addEventListener('mouseout', () => {

        early_list.style.display = 'none';
    });
}

export {
    main as
    default,
};