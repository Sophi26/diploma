import { initPlay } from '../actions/SwitchingTabsActions';

function main(store) {

    document.getElementById("tab1").style.display = 'block';

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

        const action = initPlay();
        store.dispatch(action);
    });
}

export {
    main as
    default,
};