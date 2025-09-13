const templateList = document.getElementById("templateList");

function loadTemplates() {
    templateList.innerHTML = "";

    templates.forEach(item => {
        const card = `
        <div class="card item-container">
            <img src="${item.image}">
            <h3 class="heading">${item.name}</h3>
            <p>${item.description}</p>
            <a href="${item.link}" target="_blank" class="menuButton">Goto Pages</a>
        </div>`;
        
        templateList.innerHTML += card;
    });

}

loadTemplates();