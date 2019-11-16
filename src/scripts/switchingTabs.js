import { initPlay } from '../actions/SwitchingTabsActions';
import hypothesis from './hypothesis';

function main(store) {

    // document.getElementById("tab1").style.display = 'block';
    document.getElementById("tab5").style.display = 'block';

    const listTabs = document.querySelectorAll("#tabs li");

    for (let i = 0; i < listTabs.length; i++) {

        let tab = listTabs[i];
        tab.addEventListener('click', () => {

            if (!tab.classList.contains("active-tab")) {

                let prevTab = document.querySelector(".active-tab");
                let prevContent = prevTab.firstElementChild.getAttribute("href").slice(1);
                document.getElementById(prevContent).style.display = 'none';
                prevTab.classList.remove("active-tab");

                tab.classList.add("active-tab");
                let newContent = tab.firstElementChild.getAttribute("href").slice(1);
                document.getElementById(newContent).style.display = 'block';
            }
        });
    }

    document.getElementById("play-icon").addEventListener('click', () => {

        fetch("/api/initexp", {
                method: "POST",
                body: JSON.stringify({
                    exp_name: document.getElementById("exp-name").textContent,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {

                const action = initPlay(data.test_id);
                store.dispatch(action);

                const drag_play_td = document.querySelectorAll(".draggable-play");
                for (let i = 0; i < drag_play_td.length; ++i) {
                    drag_play_td[i].setAttribute("draggable", true);   
                }
                // document.getElementById("select-btn").setAttribute("disabled", false);
                document.getElementById("select-btn").removeAttribute("disabled");
                document.getElementById("select-btn").style.cursor = "pointer";
                document.getElementById("select-btn").style.backgroundColor = "rgba(3, 3, 33, .85)";
                // hypothesis(store);
            })
            .catch();
    });
}

export {
    main as
    default,
};