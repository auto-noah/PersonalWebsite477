// Sound Links
const sound = {65:"http://carolinegabriel.com/demo/js-keyboard/sounds/040.wav",
                87:"http://carolinegabriel.com/demo/js-keyboard/sounds/041.wav",
                83:"http://carolinegabriel.com/demo/js-keyboard/sounds/042.wav",
                69:"http://carolinegabriel.com/demo/js-keyboard/sounds/043.wav",
                68:"http://carolinegabriel.com/demo/js-keyboard/sounds/044.wav",
                70:"http://carolinegabriel.com/demo/js-keyboard/sounds/045.wav",
                84:"http://carolinegabriel.com/demo/js-keyboard/sounds/046.wav",
                71:"http://carolinegabriel.com/demo/js-keyboard/sounds/047.wav",
                89:"http://carolinegabriel.com/demo/js-keyboard/sounds/048.wav",
                72:"http://carolinegabriel.com/demo/js-keyboard/sounds/049.wav",
                85:"http://carolinegabriel.com/demo/js-keyboard/sounds/050.wav",
                74:"http://carolinegabriel.com/demo/js-keyboard/sounds/051.wav",
                75:"http://carolinegabriel.com/demo/js-keyboard/sounds/052.wav",
                79:"http://carolinegabriel.com/demo/js-keyboard/sounds/053.wav",
                76:"http://carolinegabriel.com/demo/js-keyboard/sounds/054.wav",
                80:"http://carolinegabriel.com/demo/js-keyboard/sounds/055.wav",
                186:"http://carolinegabriel.com/demo/js-keyboard/sounds/056.wav"};



// Grab all key elements from html
const keys = document.getElementById('keys');
const noteA = document.getElementById("key-A");
const noteW = document.getElementById("key-W");
const noteS = document.getElementById("key-S");
const noteE = document.getElementById("key-E");
const noteD = document.getElementById("key-D");
const noteF = document.getElementById("key-F");
const noteT = document.getElementById("key-T");
const noteG = document.getElementById("key-G");
const noteY = document.getElementById("key-Y");
const noteH = document.getElementById("key-H");
const noteU = document.getElementById("key-U");
const noteJ = document.getElementById("key-J");
const noteK = document.getElementById("key-K");
const noteO = document.getElementById("key-O");
const noteL = document.getElementById("key-L");
const noteP = document.getElementById("key-P");
const noteSemicolon = document.getElementById("key-Se");



//
//// Handle Key Text
//
const text = document.querySelectorAll(".k-text"); // list of all p tags with the given class name

// Enable key name display
keys.addEventListener('mouseover', (e) => {
    text.forEach((tag) => {
        tag.style.display = "flex";
        tag.style.marginLeft = "calc(.25em + .4vw)"
    })
})

// Disable key name display
keys.addEventListener('mouseout', (e) => {
    text.forEach((tag) => {
        tag.style.display = "none";
    })
})



//
//// Handle playing a Key on the Keyboard
//

// ** KEYDOWN **
//
// (1) Play a note
//      - Re-size the key after press
//      - Play the audio relating to the pressed key
// (2) Check for 'weeseeyou'
let prev = null; // use this to keep track of 'weseeyou'
document.addEventListener('keydown', (e) => {
    if (prev !== "weseeyou") // Don't play notes if Great One is present
    {
        // Grab the specific key pressed
        if (e.key === "w") {var element = noteW;}
        if (e.key === "e") {var element = noteE;}
        if (e.key === "t") {var element = noteT;}
        if (e.key === "y") {var element = noteY;}
        if (e.key === "u") {var element = noteU;}
        if (e.key === "o") {var element = noteO;}
        if (e.key === "p") {var element = noteP;}
        if (e.key === "a") {var element = noteA;}
        if (e.key === "s") {var element = noteS;}
        if (e.key === "d") {var element = noteD;}
        if (e.key === "f") {var element = noteF;}
        if (e.key === "g") {var element = noteG;}
        if (e.key === "h") {var element = noteH;}
        if (e.key === "j") {var element = noteJ;}
        if (e.key === "k") {var element = noteK;}
        if (e.key === "l") {var element = noteL;}
        if (e.key === ";") {var element = noteSemicolon;}

        // Make key look "pressed"
        element.style.transform = "scale(.95, .90)";

        // Play the note
        let audio = new Audio(sound[e.keyCode]);
        audio.play();


        // Check for 'weseeyou'
        if (e.keyCode === 87) {prev = "w";} 
        else if (prev === 'w' && e.keyCode === 69) {prev = "we";} 
        else if (prev === "we" && e.keyCode === 83) {prev = "wes";}
        else if (prev === "wes" && e.keyCode === 69) {prev = "wese";} 
        else if (prev === "wese" && e.keyCode === 69) {prev = "wesee";} 
        else if (prev === "wesee" && e.keyCode === 89) {prev = "weseey";}
        else if (prev === "weseey" && e.keyCode === 79) {prev = "weseeyo";} 
        else if (prev === "weseeyo" && e.keyCode === 85) {prev = "weseeyou"; changePiano();}
        else {prev = ""}
    }
})
// Alter the Piano for the Great One
const changePiano = function() {
    // Play Scary Audio
    let scary = new Audio("https://orangefreesounds.com/wp-content/uploads/2020/09/Creepy-piano-sound-effect.mp3?_=1");
    scary.play();

    // Disable Key visibitity
    keys.style.display = "none";

    // Change text
    document.getElementById("piano-text").innerHTML = "I Have Awoken."

    // New Background
    document.getElementById("piano-content").style.opacity = "0";
    document.getElementById("piano-content").style.backgroundImage = "url(/static/main/images/texture.jpeg)";
    document.getElementById("piano-content").style.backgroundPosition = "center";
    document.getElementById("piano-content").style.backgroundSize = "cover";
        // Fade it in (0 to 100 baby)
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".05";}, 25);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".075";}, 50);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".1";}, 75);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".125";}, 100);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".15";}, 150);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".175";}, 200);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".2";}, 250);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".225";}, 300);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".25";}, 350);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".275";}, 400);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".3";}, 450);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".325";}, 500);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".35";}, 550);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".375";}, 600);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".4";}, 650);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".425";}, 700);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".45";}, 750);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".475";}, 800);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".5";}, 850);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".525";}, 900);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".55";}, 950);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".575";}, 1000);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".6";}, 1050);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".625";}, 1100);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".65";}, 1150);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".675";}, 1200);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".7";}, 1250);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".725";}, 1300);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".75";}, 1350);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".775";}, 1400);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".8";}, 1450);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".825";}, 1500);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".85";}, 1550);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".875";}, 1600);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".9";}, 1650);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".925";}, 1700);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".95";}, 1750);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = ".975";}, 1800);
    setTimeout(() => {document.getElementById("piano-content").style.opacity = "1";}, 1850);
}

// ** KEYUP **
//
// Make key look regular after keypress is finished
document.addEventListener('keyup', (e) => {
    // Grab the specific key pressed
    if (e.key === "w") {var element = noteW;}
    if (e.key === "e") {var element = noteE;}
    if (e.key === "t") {var element = noteT;}
    if (e.key === "y") {var element = noteY;}
    if (e.key === "u") {var element = noteU;}
    if (e.key === "o") {var element = noteO;}
    if (e.key === "p") {var element = noteP;}
    if (e.key === "a") {var element = noteA;}
    if (e.key === "s") {var element = noteS;}
    if (e.key === "d") {var element = noteD;}
    if (e.key === "f") {var element = noteF;}
    if (e.key === "g") {var element = noteG;}
    if (e.key === "h") {var element = noteH;}
    if (e.key === "j") {var element = noteJ;}
    if (e.key === "k") {var element = noteK;}
    if (e.key === "l") {var element = noteL;}
    if (e.key === ";") {var element = noteSemicolon;}

    // Reset key size
    element.style.transform = "scale(1, 1)"
})