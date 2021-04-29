function toggleHamburgerMenu() {
    document.getElementById("hamburger-menu").style.display = document.getElementById("hamburger-menu").style.display === "flex" ? "none" : "flex";
}

function getLocation() {
    if (navigator.geolocation) {
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };
        navigator.geolocation.getCurrentPosition((pos) => {
            location.href = `/nearest-stop?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`;
        }, (err) => {
            alert(err.message);
            location.href = "/stops/";
        },options);
    } else {
        alert("A böngésző nem támogatja a helymeghatározást.");
        location.href = "/stops/";
    }
}