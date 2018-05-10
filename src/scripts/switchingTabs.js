function main() {

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
}

export {
    main as
    default,
};