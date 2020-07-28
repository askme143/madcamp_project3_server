var container = document.querySelector(".table2")
var imageBoxLinkList2 = container.querySelectorAll(".exhibition-box a");
var exhibitImageList2 = container.querySelectorAll("img");
var titleList2 = container.querySelectorAll(".exhibition-name");
var periodList2 = container.querySelectorAll("p");



var today = new Date();
var today_year = today.getFullYear();
var today_month = today.getMonth()+1;
var today_day = today.getDate();
var early = (today_year*10000+today_month*100+today_day).toString();
var late = "";

var naverSearchUrl = "https://search.naver.com/search.naver?where=nexearch&sm=tab_etc&mra=bjBC&pkid=360&query=";

function requestEarlyBirdExhibits() {
    $.getJSON("/exhibits/earlybird?early_date=" + early
                    + "&late_date=" + late, (data) => {
        const {total_page, exhibits_per_page, exhibits} = data;
        // console.log(exhibits);
        const len = exhibits.length;
    
        // console.log(today);
        var count=0;
        for (var i = 0; i < len; i++) {
            const exhibit = exhibits[i];

            // if (exhibit.start_y<today_year){
            //     continue;
            // }  else if (exhibit.start_y==today_year) {
            //     if (exhibit.start_m<today_month) {
            //         continue;
            //     } else if (exhibit.start_m==today_month) {
            //         if(exhibit.start_d<today_day) {
            //             continue;
            //         }
            //     }
            // }
            
            count=count+1;
            // console.log(count);
            
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

            // console.log(exhibit.title)
            if (count<=4){
                // console.log(titleList);
                // console.log(periodList);
                // console.log(imageBoxLinkList);
                // console.log(exhibitImageList);
                // console.log(i);
                // console.log(count)
                titleList2[count-1].innerHTML = exhibit.title;
                
                exhibitImageList2[count-1].src = exhibit.thumb_url;
                // titleList[i].text = exhibit.title;
                periodList2[count-1].innerHTML = period;
            
                imageBoxLinkList2[count-1].setAttribute('href', naverSearchUrl + exhibit.title);
                imageBoxLinkList2[count-1].setAttribute('target', '_blank');
                // titleList2[count-1].setAttribute('href', naverSearchUrl + exhibit.title);
                // titleList2[count-1].setAttribute('target', '_blank');
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
