const { remote } = require("electron");
const { dialog } = remote;

import $ from 'jquery';

import { saveExp } from '../actions/SaveActions';
import { saveAsExp } from '../actions/SaveActions';

function main(store) {

    const save = document.getElementById("save-button");

    save.addEventListener('click', () => {

        let f_name = document.getElementById("exp-name").textContent;

        if (f_name === 'Недавние') {
            $('#hidden-menu-ticker').prop('checked', false);
            return;
        }

        if (f_name === 'Новый') {

            dialog.showSaveDialog({
                    defaultPath: "C:\\Users\\Софья\\Documents\\GitHub\\diploma\\library\\experiments\\Experiment.xml",
                    filters: [{ name: 'Custom File Type', extensions: ['xml'] }]
                },
                (fileName) => {

                    if (fileName === undefined) {
                        $('#hidden-menu-ticker').prop('checked', false);
                        return;
                    }

                    let filepath_arr = fileName.split('\\');
                    let file_name = filepath_arr[filepath_arr.length - 1];
                    document.getElementById("exp-name").textContent = file_name.substr(0, file_name.length - 4);

                    const action = saveAsExp(file_name);
                    store.dispatch(action);

                    $('#hidden-menu-ticker').prop('checked', false);
                });
        } else {

            f_name += '.xml';
            const action = saveExp(f_name);
            store.dispatch(action);

            $('#hidden-menu-ticker').prop('checked', false);
        }
    });

    const save_as = document.getElementById("save-as-button");

    save_as.addEventListener('click', () => {

        if (document.getElementById("exp-name").textContent === 'Недавние') {
            $('#hidden-menu-ticker').prop('checked', false);
            return;
        }

        dialog.showSaveDialog({
                defaultPath: "C:\\Users\\Софья\\Documents\\GitHub\\diploma\\library\\experiments\\Experiment.xml",
                filters: [{ name: 'Custom File Type', extensions: ['xml'] }]
            },
            (fileName) => {

                if (fileName === undefined) {
                    $('#hidden-menu-ticker').prop('checked', false);
                    return;
                }

                let filepath_arr = fileName.split('\\');
                let file_name = filepath_arr[filepath_arr.length - 1];
                document.getElementById("exp-name").textContent = file_name.substr(0, file_name.length - 4);

                const action = saveAsExp(file_name);
                store.dispatch(action);

                $('#hidden-menu-ticker').prop('checked', false);
            });
    });
}

export {
    main as
    default,
};