function main() {

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

        const expFlexContainer = document.getElementById("experiments-flex-container");

        for(let i=0; i < result.length; i++) {

            let expFlexBlock = document.createElement("div");
            expFlexBlock.setAttribute('class', 'experiment');
            let nameBlock = document.createElement("div");
            nameBlock.setAttribute('class', 'name-block');
            let expName = document.createElement("p");
            expName.appendChild(document.createTextNode(result[i].slice(0, -4)));
            nameBlock.appendChild(expName);
            let menuIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            menuIcon.setAttribute('width', '34px');
            menuIcon.setAttribute('height', '34px');
            menuIcon.setAttribute('viewBox', '0 0 24 24');
            let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute('fill', 'rgba(3, 3, 33, .7)');
            path.setAttribute('d', 'M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z');
            menuIcon.appendChild(path);
            nameBlock.appendChild(menuIcon);
            expFlexBlock.appendChild(nameBlock);

            let contextMenu = document.createElement("ul");
            contextMenu.setAttribute('class', 'con-menu');
            let menuItem = document.createElement("li");
            let itemName = document.createElement("a");
            itemName.appendChild(document.createTextNode('Открыть'));
            menuItem.appendChild(itemName);
            contextMenu.appendChild(menuItem);
            itemName.addEventListener('click', () => {
                document.getElementById("exp-name").textContent = result[i].slice(0, -4);
            });
            menuItem = document.createElement("li");
            itemName = document.createElement("a");
            itemName.appendChild(document.createTextNode('Переименовать'));
            menuItem.appendChild(itemName);
            contextMenu.appendChild(menuItem);
            menuItem = document.createElement("li");
            itemName = document.createElement("a");
            itemName.appendChild(document.createTextNode('Копировать'));
            menuItem.appendChild(itemName);
            contextMenu.appendChild(menuItem);
            menuItem = document.createElement("li");
            itemName = document.createElement("a");
            itemName.appendChild(document.createTextNode('Удалить'));
            menuItem.appendChild(itemName);
            contextMenu.appendChild(menuItem);
            expFlexBlock.appendChild(contextMenu);

            expFlexContainer.insertBefore(expFlexBlock, expFlexContainer.firstChild);

            menuIcon.addEventListener('mouseover', () => {

                contextMenu.style.display = 'block';
            });

            menuIcon.addEventListener('mouseout', () => {

                contextMenu.style.display = 'none';
            });

            contextMenu.addEventListener('mouseover', () => {

                contextMenu.style.display = 'block';
            });

            contextMenu.addEventListener('mouseout', () => {

                contextMenu.style.display = 'none';
            });
        }
    })
    .catch();
}

export {
    main as
    default,
};