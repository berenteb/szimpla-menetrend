function searchStops() {
    let search_text = document.getElementById("search-bar").value;
    let stop_list = document.querySelectorAll("div#stop-list a.stop-link");
    let container = document.getElementById("stop-search-results");
    let full_list = document.getElementById("stop-list");
    container.innerHTML = '';
    if (search_text !== "") {
        for (let node of stop_list) {
            let name = node.querySelector("h2").innerHTML;
            if (name.toLowerCase().includes(search_text.toLowerCase())) {
                container.appendChild(node.cloneNode(true));
            }
        }
        full_list.style.display = "none";
        container.style.display = "block";
    } else {
        full_list.style.display = "block";
        container.style.display = "none";
    }
}