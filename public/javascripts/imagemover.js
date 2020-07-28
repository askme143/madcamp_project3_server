const slides=document.querySelector(".slider").children;
const indicator=document.querySelector(".indicator");
let index=0;

// create circle indicators
function circleIndicator(){
    for(let i=0; i< slides.length; i++){
        const div=document.createElement("div");
            div.setAttribute("onclick","indicateSlide(this)")
            div.id=i;
            if(i==0){
                div.className="active";
            }
            indicator.appendChild(div);
    }
}
circleIndicator();

function indicateSlide(element){
        index=element.id;
        changeSlide();
        updateCircleIndicator();
        resetTimer();
}
     
function updateCircleIndicator(){
    for(let i=0; i<indicator.children.length; i++){
        indicator.children[i].classList.remove("active");
    }
    indicator.children[index].classList.add("active");
}

function nextSlide(){
    if(index==slides.length-1){
    index=0;
    }
    else{
    index++;
    }
    changeSlide();
}

function changeSlide(){
        for(let i=0; i<slides.length; i++){
            slides[i].classList.remove("active");
        }

    slides[index].classList.add("active");
}

function resetTimer(){
    // when click to indicator or controls button 
    // stop timer 
    clearInterval(timer);
    // then started again timer
    timer=setInterval(autoPlay,4000);
}
 
  
function autoPlay(){
    nextSlide();
    updateCircleIndicator();
}

let timer=setInterval(autoPlay,4000);


 



