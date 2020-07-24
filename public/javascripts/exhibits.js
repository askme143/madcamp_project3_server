function alert_button(str) {
    alert(str);
}

function request_exhib_total(page) {
    page -= 1;

    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState == XMLHttpRequest.DONE
            && httpRequest.status == 200) {
        }
    }

    httpRequest.open("GET", "/exhibits/total?page=" + String(page))
    httpRequest.send()
}