var table = document.querySelector(".table1")
var imageBoxLinkList1 = table.querySelectorAll(".exhibition-box a");
var exhibitImageList1 = table.querySelectorAll("img");
var titleList1 = table.querySelectorAll(".exhibition-name");
var periodList1 = table.querySelectorAll("p");

var dateFrom="";

var today = new Date();
var today_year = today.getFullYear();
var today_month = today.getMonth()+1;
var today_day = today.getDate();
var early = "";
var late = (today_year*10000+today_month*100+today_day).toString();


var naverSearchUrl = "https://search.naver.com/search.naver?where=nexearch&sm=tab_etc&mra=bjBC&pkid=360&query=";

function requestLateBirdExhibits() {
    $.getJSON("/exhibits/almostdone?early_date=" + early
                    + "&late_date=" + late, (data) => {
        const {total_page, exhibits_per_page, exhibits} = data;
        const len = exhibits.length;
        var count=0;
        for (var i = 0; i < len; i++) {
            const exhibit = exhibits[i];

            count=count+1;
            
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
 
            if (count<=4){
                console.log(exhibit.title)
               
                titleList1[count-1].innerHTML = exhibit.title;
                
                exhibitImageList1[count-1].src = exhibit.thumb_url;

                periodList1[count-1].innerHTML = period;
            
                imageBoxLinkList1[count-1].setAttribute('href', naverSearchUrl + exhibit.title);
                imageBoxLinkList1[count-1].setAttribute('target', '_blank');
            }
        }
    })
}
      

function appendZero(number) {
    var str = String(number);
    if (number < 10)
        str = "0" + str;
    return str;
}

requestLateBirdExhibits();
