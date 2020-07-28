var imageBoxLinkList = document.querySelectorAll(".img_box a");
var exhibitImageList = document.querySelectorAll(".img_box img");
var titleList = document.querySelectorAll(".title > a");
var periodList = document.querySelectorAll(".period");
var placeList = document.querySelectorAll(".place");
var feeList = document.querySelectorAll(".fee");
var resvBtnList = document.querySelectorAll(".resv_btn");
var mapBtnList = document.querySelectorAll(".map_btn");

var listItemList = document.querySelectorAll('.list_item');
var listGroupList = document.querySelectorAll('.list_group');

var searchBtn = document.querySelector('.searchButton');

var currentPage = 1;
var district = "";
var dateFrom = "";
var dateTo = "";
var early = "";
var late = "";
var name = "";
var link="#";
// var page = 1;

var totalPage;
var exhibitsPerPage;

const pagePerNav = 10;
var naverSearchUrl = "https://search.naver.com/search.naver?where=nexearch&sm=tab_etc&mra=bjBC&pkid=360&query=";

function requestExhibitsTotal(page) {
    $.getJSON("/exhibits/total?page=" + String(page)
                + "&early_date=" + early
                + "&late_date=" + late
                + "&search_name=" + name
                + "&district=" + district
                + "&date_from=" + dateFrom
                + "&date_to=" + dateTo, (data) => {
        const {total_page, exhibits_per_page, exhibits} = data;
        const len = exhibits.length;

        for (var i = 0; i < len; i++) {
            const exhibit = exhibits[i];
            
            if (listItemList[i].getAttribute('class') == "blind_item") {
                listItemList[i].setAttribute('class', "list_item");
                if (i % 2 == 0)
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

            exhibitImageList[i].src = exhibit.thumb_url;
            titleList[i].text = exhibit.title;
            periodList[i].innerHTML = period;
            placeList[i].innerHTML = exhibit.place;
            feeList[i].innerHTML = "";
            // feeList[i].innerHTML = exhibit.fee;

            imageBoxLinkList[i].setAttribute('href', naverSearchUrl + exhibit.title);
            imageBoxLinkList[i].setAttribute('target', '_blank');
            titleList[i].setAttribute('href', naverSearchUrl + exhibit.title);
            titleList[i].setAttribute('target', '_blank');

            if (exhibit.place_url == "null") {
                mapBtnList[i].setAttribute('class', 'blind');
            } else {
                mapBtnList[i].setAttribute('class', 'map_btn');
                mapBtnList[i].setAttribute('href', exhibit.place_url);
                mapBtnList[i].setAttribute('target', '_blank');
            }

            if (exhibit.reserv_url == "null") {
                resvBtnList[i].setAttribute('class', 'blind');
            } else {
                resvBtnList[i].setAttribute('class', 'resv_btn');
                resvBtnList[i].setAttribute('href', exhibit.reserv_url);
                resvBtnList[i].setAttribute('target', '_blank');
            }
        }
        for (var i = len; i < exhibits_per_page; i++) {
            listItemList[i].setAttribute('class', "blind_item");
            if (i % 2 == 0)
                listGroupList[i/2].setAttribute('class', "blind");
        }

        totalPage = total_page;
        exhibitsPerPage = exhibits_per_page;

        showNav(page);
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
        exhibitsPrevBtn.setAttribute('href', link);
    }
    if (nextPage > totalPage) {
        nextPage = totalPage + 1;
        exhibitsNextBtn.setAttribute('class', "icon next-page-dimmed");
    } else {
        exhibitsNextBtn.setAttribute('class', "icon next-page");
        exhibitsNextBtn.addEventListener('click', onClickNavButton);
        exhibitsNextBtn.setAttribute('href', link);
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
            numberBtn.setAttribute('href', link);
        }

        exhibitNav.appendChild(numberBtn);
    }
    exhibitNav.appendChild(exhibitsNextBtn);
}

function showFilter() {
    const inputBoxList = document.querySelectorAll('.input_txt');
    const districtList = document.querySelectorAll('.district_list a');
    const applyBtn = document.querySelector('.apply_btn');

    for (var i = 0; i < 2; i++) {
        inputBoxList[i].addEventListener('input', onInputDate);
    }
    for (var i = 0; i < districtList.length; i++) {
        districtList[i].addEventListener('click', onClickDistrict);
    }

    applyBtn.addEventListener('click', onClickApply);

    $(function() {
        $(".calendar").datepicker({
            dayNames: ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'],
            dayNamesMin: ['월', '화', '수', '목', '금', '토', '일'], 
            monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
            monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
        });
    });

    const calendarBtnList = document.querySelectorAll('a.ui-state-default');
    const calendarList = document.querySelectorAll('.calendar');
    console.log(document);
    
    for (var i = 0; i < calendarList.length; i++) {
        console.log("1");
        calendarList[i].addEventListener('click', onClickCalendar);
    }
}

/* Event listeners */
const onClickNavButton = (ev) => {
    const target = ev.target;
    const newPage = parseInt(target.getAttribute('data-page'));

    flushDate();

    requestExhibitsTotal (newPage);
    showNav (newPage);
    page = newPage;
}

const onClickSearchButton = (ev) => {
    var search_name = document.querySelector(".searchTerm").value;
    console.log("name                "+search_name);
    var name_address = "http://192.249.19.245:3680/exhibits.html?name="
    window.location.href = name_address + search_name;
}

const onClickDistrict = (ev) => {
    district = ev.target.getAttribute('data-district');

    flushDate();

    requestExhibitsTotal (1);
    showNav (1);
    page = 1;
}
const onClickApply = (ev) => {
    const strFrom = document.querySelector('#date_from').value;
    const strTo = document.querySelector('#date_to').value;
    var from = strFrom.replace(/[^0-9]/g, '').substring(0, 8);
    var to = strTo.replace(/[^0-9]/g, '').substring(0, 8);
    
    if (from.length > 0 && from.length < 8
         || to.length > 0 && to.length < 8) {
        /* handle invalid input */
        return;
    }

    if (parseInt(from) > parseInt(to)) {
        const temp = from;
        from = to;
        to = temp;

        document.querySelector('#date_from').value = strTo;
        document.querySelector('#date_to').value = strFrom;
    }

    dateFrom = from;
    dateTo = to;

    requestExhibitsTotal(1);
}
const onClickCalendar = (ev) => {
    ev.target.addEventListener('blur', onChangeCalendar);
}
const onInputDate = (ev) => {
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
const onChangeCalendar = (ev) => {
    setTimeout(() => {
        console.log("2");
        const from = document.querySelector('#date_from_btn').value;
        const to = document.querySelector('#date_to_btn').value;
        console.log(from);
        if (from.length != 0) {
            const fromList = from.split('/');
            const value = fromList[2]+ "." + fromList[0] + "." + fromList[1] + ".";
            document.querySelector('#date_from').value = value;
            console.log(document.querySelector('#date_from').value);
        }
        if (to.length != 0) {
            const toList = to.split('/');
            const value = toList[2] + "." + toList[0] + "." + toList[1] + ".";
            document.querySelector('#date_to').value = value;
            console.log(document.querySelector('#date_to').value);
        }
    }, 500);
}

/* helpers */
function flushDate() {
    document.querySelector('#date_from').value = "";
    document.querySelector('#date_to').value = "";
    dateFrom = "";
    dateTo = "";
}

searchBtn.addEventListener("click", onClickSearchButton);
// console.log(window.location.href.split('?'));

if (window.location.href.split('?').length > 1) {
    var today = new Date();
    var today_year = today.getFullYear();
    var today_month = today.getMonth()+1;
    var today_day = today.getDate();
    if (window.location.href.split('?')[1].split('=')[0] == "order") {
        if (window.location.href.split('?')[1].split('=')[1] == "early") {
            early = (today_year*10000 + today_month*100 + today_day).toString();
            dateTo="";
            requestExhibitsTotal(1);
            showFilter();
        }else if (window.location.href.split('?')[1].split('=')[1] == "late") {
            early = "";
            late=(today_year*10000 + today_month*100 + today_day).toString();
            requestExhibitsTotal(1);
            showFilter();
        }
    } else if (window.location.href.split('?')[1].split('=')[0] == "name"){
        name = window.location.href.split('?')[1].split('=')[1];
        requestExhibitsTotal(1);
        showFilter();
    }
} else {
    requestExhibitsTotal(1);
    showFilter(); 
}
