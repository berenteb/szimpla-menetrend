function toggleFilter(bool) {
    let rows = document.getElementsByClassName("past-departure");
    for (let row of rows) {
        if (bool) {
            row.classList.add("hide");
        } else {
            row.classList.remove("hide");
        }
    }
    let button = document.getElementById("filter-button");
    let new_button = button.cloneNode(true);
    button.replaceWith(new_button);
    new_button.textContent = bool ? "Régiek megjelenítése" : "Régiek elrejtése";
    new_button.addEventListener("click", () => { toggleFilter(!bool)});
}

window.onload = () => {
    document.getElementById("filter-button").addEventListener("click",()=>{toggleFilter(false)});
}