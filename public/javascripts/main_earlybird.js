var container = document.querySelector(".table2")
var imageBoxLinkList = container.querySelectorAll(".exhibition-box a");
var exhibitImageList = container.querySelectorAll("img");
var titleList = container.querySelectorAll(".exhibition-name");
var periodList = container.querySelectorAll("p");

var dateFrom="";

var today = new Date();
var today_year = today.getFullYear();
var today_month = today.getMonth()+1;
var today_day = today.getDate();


const naverSearchUrl = "https://search.naver.com/search.naver?where=nexearch&sm=tab_etc&mra=bjBC&pkid=360&query=";

function requestEarlyBirdExhibits() {
    $.getJSON("/exhibits/earlybird?date_from=" + dateFrom, (data) => {
        const {total_page, exhibits_per_page, exhibits} = data;
        // console.log(exhibits);
        const len = exhibits.length;
    
        // console.log(today);
        var count=0;
        for (var i = 0; i < len; i++) {
            const exhibit = exhibits[i];

            if (exhibit.start_y<today_year){
                continue;
            }  else if (exhibit.start_y==today_year) {
                if (exhibit.start_m<today_month) {
                    continue;
                } else if (exhibit.start_m==today_month) {
                    if(exhibit.start_d<today_day) {
                        continue;
                    }
                }
            }
            
            count=count+1;
            console.log(count);
            
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
            // print(period)

            console.log(exhibit.title)
            if (count<=4){
                console.log(titleList);
                console.log(periodList);
                console.log(imageBoxLinkList);
                console.log(exhibitImageList);
                console.log(i);
                // console.log(count)
                titleList[count-1].innerHTML = exhibit.title;
                
                exhibitImageList[count-1].src = exhibit.thumb_url;
                // titleList[i].text = exhibit.title;
                periodList[count-1].innerHTML = period;
            
                imageBoxLinkList[count-1].setAttribute('href', naverSearchUrl + exhibit.title);
                imageBoxLinkList[count-1].setAttribute('target', '_blank');
                titleList[count-1].setAttribute('href', naverSearchUrl + exhibit.title);
                titleList[count-1].setAttribute('target', '_blank');
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

requestEarlyBirdExhibits();
