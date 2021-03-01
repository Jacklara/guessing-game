//access the DOM element 'msg
const msgEl = document.getElementById('msg');

//create a random number
const randomNum = getRandomNumber();

//function get random number
function getRandomNumber(){
    return Math.floor(Math.random()*100) + 1;
}
console.log('Number: ' + randomNum);

//initalize the speech recognition object
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

//create a new instance called recognition
let recognition = new window.SpeechRecognition();

recognition.start();

recognition.addEventListener('result', onSpeak);

function onSpeak(e) {
    const msg = e.results[0][0].transcript;
    console.log(msg);

    writeMessage(msg);
    checkNumber(msg)
}
//display user input into the UI
function writeMessage(msg) {
    msgEl.innerHTML = `
        <div>You said: </div>
        <span class="box">${msg}</span>
    `
}
//check the users name against the number
function checkNumber(msg) {
    const num = +msg;
    //check number to see if its valid
    if (Number.isNaN(num)) {
        msgEl.innerHTML += `<div>That is not a valid number</div>`;
        return;
    }
    //check to see if number is in range 
    if (num > 100|| num < 1) {
        msgEl.innerHTML += `<div>Number must be between 1 and 100</div>`;
        return;
    }
    //check number for match
    if (num === randomNum) {
        //let the user know they have won
        document.body.innerHTML = `
            <h2>Congrats! You have guessed the number!!!<br><br>
            It was ${num}</h2>
            <button class="play-again" id="play-again">Play Again</button>
        `;
    } else if (num > randomNum) {
        msgEl.innerHTML += `<div>Go Lower</div>`;
    } else {
        msgEl.innerHTML += `<div>Go Higher</div>`;
    }
}

//end speech redognition service
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', e => {
    if(e.target.id == 'play-again') {
        window.location.reload();
    }
})