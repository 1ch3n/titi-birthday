/* ==================================
   TITI 333 BIRTHDAY SYSTEM
   FINAL JAVASCRIPT
================================== */


/* ================================
GLOBAL STATE
================================ */

let cakeState = {

    cake:"",
    frosting:"",
    decorations:[],
    candles:false

};


let selectedSticker = null;







/* ================================
LOADING
================================ */


let progress = 0;


let loading = setInterval(()=>{


progress += 2;


document.getElementById(
"loading-progress"
).style.width = progress + "%";


document.getElementById(
"loading-number"
).innerText = progress + "%";



if(progress >=100){

clearInterval(loading);


document.getElementById(
"loading-screen"
).style.display="none";


}


},40);










/* ================================
START GAME
================================ */


document
.getElementById("start-game")
.onclick=function(){


document
.getElementById("welcome")
.style.display="none";


document
.getElementById("cake-game")
.style.display="block";


};











/* ================================
CAKE IMAGE CHANGE
================================ */


document
.querySelectorAll(".cake-choice")
.forEach(button=>{


button.onclick=function(){


let image =
this.dataset.image;


document
.querySelector(".cake-body")
.style.backgroundImage =
`url("${image}")`;



cakeState.cake =
this.dataset.cake;



document
.getElementById(
"summary-base"
)
.innerText =
this.innerText;


};


});











/* ================================
FROSTING COLOR
================================ */


document
.querySelectorAll(".frosting-choice")
.forEach(button=>{


button.onclick=function(){


let color =
this.dataset.color;



let frosting =
document.getElementById(
"frosting-layer"
);



frosting.style.background = color;


/* change dripping color */

frosting.style.setProperty(
"--drip-color",
color
);



frosting.style.setProperty(
"--frosting-color",
color
);



cakeState.frosting =
this.innerText;



let summary =
document.getElementById(
"summary-frosting"
);



if(summary){

summary.innerText =
this.innerText;

}



};


});









/* ================================
ADD DECORATION BUTTONS
================================ */


document
.querySelectorAll(".decoration-btn")
.forEach(button=>{


button.onclick=function(){


addSticker(
this.dataset.image
);


};


});









/* ================================
CREATE STICKER
================================ */


function addSticker(src){


let sticker =
document.createElement("img");



sticker.src =
src;



sticker.className =
"cake-sticker";



/*
 random position on cake top
 no empty corner
*/


sticker.style.left =
Math.floor(
Math.random()*150
)
+"px";



sticker.style.top =
Math.floor(
Math.random()*35
)
+"px";





sticker.onclick=function(e){


e.stopPropagation();


selectSticker(this);


};




makeDraggable(sticker);



document
.getElementById(
"decoration-layer"
)
.appendChild(sticker);



cakeState.decorations.push(src);



document
.getElementById(
"summary-decoration"
)
.innerText =
cakeState.decorations.length
+
" stickers";


}









/* ================================
SELECT STICKER
================================ */


function selectSticker(sticker){


if(selectedSticker){


selectedSticker
.classList
.remove("selected");


}



selectedSticker =
sticker;



sticker
.classList
.add("selected");


}









/* ================================
DELETE STICKER
================================ */


document
.getElementById(
"delete-sticker"
)
.onclick=function(){


if(selectedSticker){


selectedSticker.remove();


selectedSticker=null;


}


};









/* ================================
RESET STICKERS
================================ */


document
.getElementById(
"clear-stickers"
)
.onclick=function(){


document
.getElementById(
"decoration-layer"
)
.innerHTML="";



cakeState.decorations=[];



document
.getElementById(
"summary-decoration"
)
.innerText="-";


};









/* ================================
UPLOAD STICKER
================================ */


document
.getElementById(
"decoration-upload"
)
.onchange=function(e){


let file =
e.target.files[0];


if(!file)
return;



let reader =
new FileReader();



reader.onload=function(event){


addSticker(
event.target.result
);


};



reader.readAsDataURL(file);


};









/* ================================
DRAG STICKERS
IPHONE TOUCH
================================ */


function makeDraggable(element){


let moving=false;


let offsetX=0;

let offsetY=0;



element.addEventListener(
"touchstart",
function(e){


selectSticker(element);



moving=true;



let touch =
e.touches[0];


offsetX =
touch.clientX -
element.offsetLeft;



offsetY =
touch.clientY -
element.offsetTop;


});






element.addEventListener(
"touchmove",
function(e){



if(!moving)
return;



let touch =
e.touches[0];



let parent =
document.getElementById(
"decoration-layer"
);



let rect =
parent.getBoundingClientRect();




element.style.left =

(
touch.clientX -
rect.left -
offsetX

)
+"px";




element.style.top =

(
touch.clientY -
rect.top -
offsetY

)
+"px";


});







element.addEventListener(
"touchend",
function(){


moving=false;


});


}









/* ================================
CANDLES
================================ */


document
.getElementById(
"light-candles"
)
.onclick=function(){



document
.querySelectorAll(
".candle"
)
.forEach(c=>{


c.classList.toggle(
"fire"
);


});



cakeState.candles=true;


};









/* ================================
FINISH CAKE
================================ */


document
.getElementById(
"finish-cake"
)
.onclick=function(){



document
.getElementById(
"cake-game"
)
.style.display="none";



document
.getElementById(
"cake-result"
)
.style.display="block";




let old =
document
.querySelector(
"#final-cake .cake"
);



if(old){

old.remove();

}



let clone =
document
.querySelector(".cake")
.cloneNode(true);



document
.getElementById(
"final-cake"
)
.appendChild(clone);



};









/* ================================
ENTER WORLD
================================ */


document
.getElementById(
"enter-world"
)
.onclick=function(){


document
.getElementById(
"cake-result"
)
.style.display="none";



document
.getElementById(
"birthday-world"
)
.style.display="block";



window.scrollTo({

top:0,

behavior:"smooth"

});


};









/* ================================
MUSIC
================================ */


let music =
document.getElementById(
"music"
);



document
.getElementById(
"music-btn"
)
.onclick=function(){



if(music.paused){


music.play();


this.innerText =
"🎵 Playing";


}

else{


music.pause();


this.innerText =
"🎧 Play";


}


};