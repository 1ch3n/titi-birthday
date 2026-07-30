/* ==================================
   TITI BIRTHDAY SYSTEM
   MULTI PAGE JAVASCRIPT
================================== */


/* ================================
PAGE NAVIGATION
================================ */


function goTo(page){

    window.location.href = page;

}




document
.querySelectorAll("[data-page]")
.forEach(btn=>{

    btn.onclick=function(){

        goTo(this.dataset.page);

    }

});







/* ================================
LOADING SCREEN
================================ */


let loadingProgress =
document.getElementById(
"loading-progress"
);


let loadingNumber =
document.getElementById(
"loading-number"
);



if(loadingProgress && loadingNumber){


let progress=0;


let loading=setInterval(()=>{


progress+=2;


loadingProgress.style.width=
progress+"%";


loadingNumber.innerText=
progress+"%";



if(progress>=100){


clearInterval(loading);


let screen=
document.getElementById(
"loading-screen"
);


if(screen){

screen.style.display="none";

}


}



},40);


}









/* ================================
MUSIC SYSTEM
================================ */


let music =
document.getElementById(
"music"
);



let musicBtn =
document.getElementById(
"music-btn"
);



if(musicBtn && music){


musicBtn.onclick=function(){



if(music.paused){


music.play();


musicBtn.innerText=
"🎵 Playing";


}


else{


music.pause();


musicBtn.innerText=
"🎧 Play";


}


};


}









/* ================================
CAKE SYSTEM
================================ */


let cakeState={

cake:"",
frosting:"",
decorations:[],
candles:false

};



let selectedSticker=null;









/* ================================
CAKE IMAGE
================================ */


document
.querySelectorAll(".cake-choice")
.forEach(btn=>{


btn.onclick=function(){


let body=
document.querySelector(
".cake-body"
);



if(body){


body.style.backgroundImage=
`url("${this.dataset.image}")`;


}



cakeState.cake=
this.dataset.cake;



let summary=
document.getElementById(
"summary-base"
);



if(summary){

summary.innerText=
this.dataset.cake;

}



};


});











/* ================================
FROSTING COLOR
================================ */


document
.querySelectorAll(".frosting-choice")
.forEach(button=>{


button.onclick=function(){


let color=this.dataset.color;


let frosting=document.getElementById(
"frosting-layer"
);



frosting.style.setProperty(
"--frosting-color",
color
);



cakeState.frosting=this.innerText;



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
DECORATIONS
================================ */


document
.querySelectorAll(".decoration-btn")
.forEach(btn=>{


btn.onclick=function(){


addSticker(
this.dataset.image
);


};


});







function addSticker(src){


let sticker=
document.createElement(
"img"
);



sticker.src=src;


sticker.className=
"cake-sticker";



sticker.style.left=
Math.random()*150+"px";


sticker.style.top=
Math.random()*60+"px";



sticker.onclick=function(e){


e.stopPropagation();


selectSticker(this);


};



let layer =
document.getElementById(
"decoration-layer"
);


if(layer){

    layer.appendChild(sticker);

}



cakeState.decorations.push(src);



let summary=
document.getElementById(
"summary-decoration"
);



if(summary){

summary.innerText=
cakeState.decorations.length+
" stickers";

}



}









function selectSticker(sticker){


if(selectedSticker){

selectedSticker.classList.remove(
"selected"
);

}



selectedSticker=sticker;


sticker.classList.add(
"selected"
);


}









/* DELETE */


let deleteBtn=
document.getElementById(
"delete-sticker"
);



if(deleteBtn){


deleteBtn.onclick=function(){


if(selectedSticker){


selectedSticker.remove();


selectedSticker=null;


}



};


}











/* RESET */


let clearBtn=
document.getElementById(
"clear-stickers"
);



if(clearBtn){


clearBtn.onclick=function(){


let layer=
document.getElementById(
"decoration-layer"
);



if(layer){

layer.innerHTML="";

}


cakeState.decorations=[];


};



}









/* UPLOAD */


let upload=
document.getElementById(
"decoration-upload"
);



if(upload){


upload.onchange=function(e){


let file=
e.target.files[0];



if(!file)return;



let reader=
new FileReader();



reader.onload=function(event){


addSticker(
event.target.result
);


};



reader.readAsDataURL(file);



};


}











/* ================================
CANDLES
================================ */


let candleBtn=
document.getElementById(
"light-candles"
);



if(candleBtn){


candleBtn.onclick=function(){


document
.querySelectorAll(".candle")
.forEach(c=>{


c.classList.toggle(
"fire"
);


});



cakeState.candles=true;


};



}











/* ================================
WISH PAGE
================================ */


let saveWish=
document.getElementById(
"save-wish"
);



let wishInput=
document.getElementById(
"wish-input"
);



let wishDisplay=
document.getElementById(
"saved-wish"
);




if(saveWish){


saveWish.onclick=function(){



let wish=
wishInput.value;



localStorage.setItem(
"titiWish",
wish
);



wishDisplay.innerText=
wish;



};



}



if(wishDisplay){


let oldWish=
localStorage.getItem(
"titiWish"
);



if(oldWish){

wishDisplay.innerText=
oldWish;

}



}
/* ================================
LOAD SAVED CAKE
================================ */

let wishCake =
document.getElementById(
"wish-cake"
);

if(wishCake){

    let savedCake =
    localStorage.getItem(
    "titiCake"
    );

    if(savedCake){

        wishCake.innerHTML =
        savedCake;

    }

    else{

        wishCake.innerHTML =
        "<p>🎂 No cake found.<br>Please make a cake first! ♡</p>";

    }

}

/* ================================
BLOW CANDLES
================================ */

let blowBtn =
document.getElementById(
"blow-candle"
);


if(blowBtn){

    blowBtn.onclick=function(){


        let candles =
        document.querySelectorAll(
        "#wish-cake .candle"
        );


        candles.forEach(candle=>{

            candle.classList.remove("fire");

        });



        blowBtn.innerHTML =
        "✨ Wish Made ♡";



        // show celebration

        let celebration =
        document.getElementById(
        "celebration"
        );


        if(celebration){

            celebration.style.display="flex";

        }


    };

}



// close celebration button

let closeCelebration =
document.getElementById(
"close-celebration"
);


if(closeCelebration){

closeCelebration.onclick=function(){

document.getElementById(
"celebration"
).style.display="none";


};

}

/* ================================
FINISH CAKE
================================ */

let finishBtn =
document.getElementById(
"finish-cake"
);

if(finishBtn){

    finishBtn.onclick=function(){

        let cake =
        document.querySelector(".cake");

        if(cake){

            localStorage.setItem(
                "titiCake",
                cake.outerHTML
            );

        }

        alert("Cake saved! ♡");
    };

}



/* ================================
MESSAGE CARDS
================================ */


document
.querySelectorAll(".love-card")
.forEach(card=>{


card.onclick=function(){


this.classList.toggle(
"flip"
);



};


});









/* ================================
HOME BUTTONS
================================ */


let cakeBtn=
document.getElementById(
"cake-button"
);



if(cakeBtn){

cakeBtn.onclick=function(){

goTo("cake.html");

};

}



let messageBtn=
document.getElementById(
"message-button"
);



if(messageBtn){

messageBtn.onclick=function(){

goTo("message.html");

};

}



let wishBtn=
document.getElementById(
"wish-button"
);



if(wishBtn){

wishBtn.onclick=function(){

goTo("wish.html");

};

}
