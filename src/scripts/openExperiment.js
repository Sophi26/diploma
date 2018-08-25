import { openExp } from '../actions/OpenActions';

function main(store) {

    const exps = document.querySelectorAll(".open-experiment");
    for(let i=0; i < exps.length; i++) {

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
            })
            .catch();
        });
    }

    const copy_exps = document.querySelectorAll(".copy-experiment");
    for(let i=0; i < copy_exps.length; i++) {

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
            })
            .catch();
        });
    }
}

export {
    main as
    default,
};