<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>TITI'S 24TH BIRTHDAY ♡</title>

<link rel="stylesheet" href="style.css">

</head>


<body>


<!-- ===========================
LOADING SCREEN
=========================== -->

<div id="loading-screen">

    <div class="loading-logo">
        ♡ TITI.EXE ♡
    </div>

    <p>
        Preparing your birthday surprise...
    </p>


    <div class="loading-bar">
        <div id="loading-progress"></div>
    </div>


    <span id="loading-number">
        0%
    </span>


</div>







<!-- ===========================
WELCOME PAGE
=========================== -->


<section id="welcome">


<div class="sticker star">
    ✦
</div>


<div class="sticker bow">
    🎀
</div>


<div class="magazine-title">

JAPANESE LOVE MAGAZINE

<br>

ISSUE NO.24

</div>



<h1>

Happy Birthday
<br>

Titi ♡

</h1>


<p>

(★´･x･ﾉﾉ ‘` ┌iii┐ ε-(･ε･´) ♪

</p>


<button id="start-game">

Create Birthday Cake

</button>


</section>









<!-- ===========================
CAKE CUSTOMIZATION GAME
=========================== -->


<section id="cake-game">


<h2>

🎂 Create Titi's Birthday Cake

</h2>



<p>

Customize your own cake before entering Titi's world.

</p>





<!-- CAKE PREVIEW -->

<div id="cake-preview">


<div class="cake-shadow"></div>


<div class="cake">


<div class="cake-top">


<span id="cake-message">

Happy Birthday

</span>


</div>



<div class="cake-body">

</div>


<div id="decoration-layer">

</div>


<div id="candle-layer">


<div class="candle"></div>
<div class="candle"></div>
<div class="candle"></div>

</div>



</div>


</div>









<!-- STEP 1 CAKE BASE -->

<div class="custom-step active"
id="cake-base-step">


<h3>

01 Choose Cake Style

</h3>



<div class="choice-grid">


<button class="cake-choice"
data-cake="sushi">


🍣

<br>

Sushi Cake


</button>



<button class="cake-choice"
data-cake="strawberry">


🍓

<br>

Strawberry Chocolate


</button>





<button class="cake-choice"
data-cake="tea">


🍵

<br>

Black Tea


</button>





<button class="cake-choice"
data-cake="pudding">


🍮

<br>

Pudding Cake


</button>



</div>


</div>









<!-- STEP 2 DECORATION -->

<div class="custom-step">


<h3>

02 Add Decorations

</h3>



<p>

Upload your own stickers ♡

</p>



<input 
type="file"
id="decoration-upload"
accept="image/*"
multiple
>



<div class="preset-decoration">


<button data-decoration="dudu">
Dudu & Bubu
</button>


<button data-decoration="pompompurin">
Pompompurin
</button>


<button data-decoration="panda">
Panda
</button>


<button data-decoration="gloomybear">
Gloomy Bear
</button>


<button data-decoration="japan">
Japan
</button>


<button data-decoration="photo">
Our Photo
</button>


</div>



</div>









<!-- STEP 3 MESSAGE -->


<div class="custom-step">


<h3>

03 Write Cake Message

</h3>



<div class="message-buttons">


<button>
Happy 24 Titi
</button>


<button>
My Babyyy
</button>


<button>
Love U 4ever
</button>


</div>




<input

id="cake-text-input"

placeholder="Write your own message"

>


</div>









<!-- STEP 4 CANDLES -->


<div class="custom-step">


<h3>

04 Make A Wish ✨

</h3>



<button id="light-candles">

Light Candles 🕯️

</button>


<p>

Tap candles to make them glow

</p>


</div>









<button id="finish-cake">

Finish My Cake 🎂

</button>




</section>









<!-- ===========================
FINAL CAKE RESULT
=========================== -->


<section id="cake-result">


<h1>

Your cake for Titi is ready ♡

</h1>



<div id="final-cake">

</div>



<div class="cake-summary">


<p>

Cake:

<span id="summary-base">

-

</span>

</p>



<p>

Decorations:

<span id="summary-decoration">

-

</span>

</p>


<p>

Message:

<span id="summary-message">

-

</span>

</p>


</div>




<button id="enter-world">

Enter Titi's World ♡

</button>


</section>









<!-- ===========================
MAIN LOVE WEBSITE
=========================== -->


<main id="birthday-world">







<!-- HERO MAGAZINE COVER -->


<section class="hero">


<div class="issue">

TOKYO LOVE ISSUE
<br>
24

</div>



<h1>

Happy 24th Birthday

<br>

My Guardian ♡

</h1>



<p>

Wish you the happiest day ever &lt;3

</p>



<img

src="[PHOTO_URL]"

class="main-photo"

>



<div class="love-note">


Another year older,
another year of memories together.

Thank you for being my safe place,
my biggest supporter,
and my favorite person.


</div>


</section>









<!-- LOVE CARDS -->


<section id="love-cards">


<h2>

24 Reasons I Love You

</h2>



<div class="cards">


<div class="love-card">

<div class="front">

001

</div>


<div class="back">

Your smile ♡

</div>

</div>





<div class="love-card">

<div class="front">

002

</div>


<div class="back">

Your kindness ♡

</div>

</div>




<div class="love-card">

<div class="front">

003

</div>


<div class="back">

You make me laugh ♡

</div>


</div>


</div>


</section>









<!-- SYSTEM STATUS -->


<section id="status">


<h2>

TITI STATUS

</h2>



<div class="status-card">


<p>

AGE:
24

</p>


<p>

STATUS:
ONLINE ♡

</p>


<p>

LOVE LEVEL:

100%

</p>



<div class="progress">

<div></div>

</div>



</div>


</section>









<!-- SECRET LOVE FILE -->


<section id="secret">


<h2>

Secret File

</h2>


<div class="file">


📁 titi_final_message.txt


<br><br>


<button id="open-letter">

Open File

</button>


</div>



<div id="love-letter">

</div>


</section>









<!-- ENDING -->


<section id="ending">


<h1>

Happy 24th Birthday Titi ♡

</h1>



<p>

Thank you for being my favorite human.

</p>


<button onclick="location.reload()">

Replay

</button>


</section>






</main>









<!-- MOBILE NAV -->


<nav>


<button>

HOME

</button>


<button>

LOVE

</button>


<button>

CAKE

</button>


<button>

SECRET

</button>


</nav>






<audio id="music">

<source src="[SONG_URL]">

</audio>




<script src="script.js"></script>


</body>

</html>
