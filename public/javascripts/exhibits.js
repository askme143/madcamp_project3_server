var imageBoxList = document.querySelectorAll(".img_box img");
var titleList = document.querySelectorAll(".title > a");
var periodList = document.querySelectorAll(".period");
var placeList = document.querySelectorAll(".place");
var feeList = document.querySelectorAll(".fee");

var listGroupList = document.querySelectorAll('.list_group');

var currentPage = 1;
var totalPage;
var exhibitsPerPage;

const pagePerNav = 10;

function requestExhibitsTotal(page) {
    $.getJSON("/exhibits/total?page=" + String(page), (data) => {
        const {total_page, exhibits_per_page, exhibits} = data;
        const len = exhibits.length;

        for (var i = 0; i < len; i++) {
            const exhibit = exhibits[i];
            
            if (i % 2 == 0 && listGroupList[i/2].getAttribute('class') == "blind") {
                listGroupList[i/2].setAttribute('class', "list_group");
            }

            var finishDate;
            if (exhibit.finish_d == 0) {
                finishDate = "오픈런";
            } else {
                finishDate = String(exhibit.finish_y) + "."
                                + appendZero(exhibit.finish_m) + "."
                                + appendZero(exhibit.finish_d) + ".";
            }

            var startDate = String(exhibit.start_y) + "."
                                + appendZero(exhibit.start_m) + "."
                                + appendZero(exhibit.start_d) + ".";

            var period = startDate + " ~ " + finishDate;

            imageBoxList[i].src = exhibit.thumb_url;
            titleList[i].text = exhibit.title;
            periodList[i].innerHTML = period;
            placeList[i].innerHTML = exhibit.place;
            feeList[i].innerHTML = exhibit.fee;
        }
        for (var i = len; i < exhibits_per_page; i++) {
            if (i % 2 == 0)
                listGroupList[i/2].setAttribute('class', "blind");
        }

        totalPage = total_page;
        exhibitsPerPage = exhibits_per_page;
    })
}
function appendZero(number) {
    var str = String(number);
    if (number < 10)
        str = "0" + str;
    return str;
}

function showNav(page) {
    const exhibitNav = document.querySelector(".exhibition_nav");

    exhibitNav.innerHTML = "";

    const exhibitsPrevBtn = document.createElement("a");
    const exhibitsNextBtn = document.createElement("a");
    
    prevPage = (page - 1) - (page - 1) % pagePerNav;
    nextPage = prevPage + pagePerNav + 1;

    exhibitsPrevBtn.setAttribute('data-page', String(prevPage));
    exhibitsNextBtn.setAttribute('data-page', String(nextPage));
    
    if (prevPage == 0) {
        exhibitsPrevBtn.setAttribute('class', "icon prev-page-dimmed");
    } else {
        exhibitsPrevBtn.setAttribute('class', "icon prev-page");
        exhibitsPrevBtn.addEventListener('click', onClickNavButton);
        exhibitsPrevBtn.setAttribute('href', "#");
    }
    if (nextPage > totalPage) {
        nextPage = totalPage + 1;
        exhibitsNextBtn.setAttribute('class', "icon next-page-dimmed");
    } else {
        exhibitsNextBtn.setAttribute('class', "icon next-page");
        exhibitsNextBtn.addEventListener('click', onClickNavButton);
        exhibitsNextBtn.setAttribute('href', "#");
    }
    
    exhibitNav.appendChild(exhibitsPrevBtn);
    for (var i = prevPage+1; i < nextPage; i++) {
        numberBtn = document.createElement("a");
        numberBtn.setAttribute('data-page', String(i));
        numberBtn.innerHTML = String(i);
        if (page == i) {
            numberBtn.setAttribute('class', "selected");
        } else {
            numberBtn.addEventListener('click', onClickNavButton);
            numberBtn.setAttribute('href', "#");
        }

        exhibitNav.appendChild(numberBtn);
    }
    exhibitNav.appendChild(exhibitsNextBtn);
}

function showFilter() {
    const inputBoxList = document.querySelectorAll('.input_txt');

    for (var i = 0; i < 2; i++) {
        inputBoxList[i].addEventListener('input', dateInputListener);
    }
}

/* Event listeners */
const onClickNavButton = (ev) => {
    const target = ev.target;
    const newPage = parseInt(target.getAttribute('data-page'));

    requestExhibitsTotal (newPage);
    showNav (newPage);
    page = newPage;
}
const dateInputListener = (ev) => {
    var str = ev.target.value.replace(/[^0-9]/g, '').substring(0, 8);
    console.log(str);

    if (str.length == 8) {
        var year = str.substring(0, 4);
        var month = str.substring(4, 6);
        var date = str.substring(6, 8);

        if (parseInt(month) > 12) {
            month = "12";
        } else if (parseInt(month) == 0) {
            month = "1";
        }

        const lastDate = new Date(year, month, 0).getDate();
        if (parseInt(date) > lastDate) {
            date = String(lastDate);
        } else if (date == 0) {
            date = "1";
        }

        if (month.length == 1) month = "0" + month;
        if (date.length == 1) date = "0" + date;

        str = (year + "." + month + "." + date + ".")
    }

    ev.target.value = str;
}

requestExhibitsTotal(1);
showNav(1);
showFilter();