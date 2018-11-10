import $ from 'jquery';

import { openExp } from '../actions/OpenActions';

function main(store) {

    const exps = document.querySelectorAll(".open-experiment");
    for (let i = 0; i < exps.length; i++) {

        exps[i].addEventListener('click', () => {

            fetch("/api/open", {
                    method: "POST",
                    body: JSON.stringify({
                        filename: document.getElementById("exp-name").textContent + '.xml',
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

                    document.getElementById("start").style.display = 'none';
                    document.getElementById("creation").style.display = 'block';
                    document.getElementById("f-width").value = data.experiment.field.width;
                    document.getElementById("f-height").value = data.experiment.field.height;
                })
                .catch();
        });
    }

    const input = document.getElementById("upload-file");
    input.addEventListener('change', () => {
        const file_name = input.files[0].name.substr(0, input.files[0].name.length - 4);
        let data = new FormData();
        data.append('file', input.files[0]);
        fetch("/api/uploadfile", {
                method: "POST",
                body: data,
            })
            .then((response) => {
                return response.json();
            })
            .then((result) => {

                const action = openExp(result);
                store.dispatch(action);

                document.getElementById("exp-name").textContent = file_name;
                document.getElementById("start").style.display = 'none';
                document.getElementById("creation").style.display = 'block';
                $('#hidden-menu-ticker').prop('checked', false);
                document.getElementById("f-width").value = result.experiment.field.width;
                document.getElementById("f-height").value = result.experiment.field.height;
            })
            .catch();
    });

    const copy_exps = document.querySelectorAll(".copy-experiment");
    for (let i = 0; i < copy_exps.length; i++) {

        copy_exps[i].addEventListener('click', () => {

            fetch("/api/open", {
                    method: "POST",
                    body: JSON.stringify({
                        filename: document.getElementById("exp-name").textContent + '.xml',
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

                    document.getElementById("start").style.display = 'none';
                    document.getElementById("creation").style.display = 'block';
                    document.getElementById("f-width").value = data.experiment.field.width;
                    document.getElementById("f-height").value = data.experiment.field.height;
                })
                .catch();
        });
    }
}

export {
    main as
    default,
};