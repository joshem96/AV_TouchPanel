var pwCode = ["1","9","8","8"]; //password for techsettings
var pwCheck = new Array; //users input
var iteration = 0; //which bubble the user is upto
var pwBubbles = document.querySelectorAll(".pw-bbl"); //makes array of all input bubbles
var nmbrBtnCntnr = document.querySelector("#number-btn-container");

//reset the tech settings back to default
function pwReset(){
    debugger;
    pwBubbles.forEach( (bubble) => { 
        bubble.classList.add("bg-dark");
        bubble.classList.remove("bg-primary");
    });
    if(iteration < 4) { pwBubbles[iteration].classList.remove("bbl-shadow"); }//get rid off bbl shadow if user clicks return btn
    iteration = 0;
    pwCheck = new Array;
    pwBubbles[iteration].classList.add("bbl-shadow");
}

//backspace function
function bsFunct(){
    //does the obvious
    if(iteration >= 1){
        pwBubbles[iteration].classList.remove("bbl-shadow"); //remove shadow on current bubble
        pwBubbles[iteration-1].classList.remove("bg-primary"); //remove blue bg from last entered number
        ["bg-dark","bbl-shadow"].forEach( (item) => pwBubbles[iteration-1].classList.add(item) ); //make it so the background is dark for last entered number
        pwCheck.pop(); //delete last entered number from pwCheck
        iteration--;
    }
}

//main number button code
nmbrBtnCntnr.addEventListener("click", (e) =>{
    if(e.target.classList.contains("number-btn")){
         //if users input is not yet 4 characters
        if (pwCheck.length < pwCode.length){
            pwCheck.push(e.target.value);
            ["bg-dark","bbl-shadow"].forEach( (item) => pwBubbles[iteration].classList.remove(item) ); 
            pwBubbles[iteration].classList.add("bg-primary"); //add blue to indicate character has been entered
            if(pwBubbles[iteration+1] != undefined){
                pwBubbles[iteration+1].classList.add("bbl-shadow"); //add the light shadow to the next bubble to indicate next input
            } 
            iteration++;
        }
        //if users input is 4 characters
        if (pwCheck.length == pwCode.length){ 
            if(pwCheck.toString() == pwCode.toString()){ //if user input is the correct password, open tech settings
                window.location = "techsettings.html";
            }
            else if(pwCheck.toString() != pwCode.toString()){//if user input is incorrect
                pwReset();
            }
        }
    }
});






