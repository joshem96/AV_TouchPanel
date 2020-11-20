var powerBtn = document.querySelector("#powerButton");
var offConfirmBox = document.querySelector(".off-confirm-box");
var yesBtn = document.querySelector("#yesBtn");
var noBtn = document.querySelector("#noBtn");
var tpBackshadow = document.querySelector("#po-backshadow");
var countdownNode = document.querySelector("#countdown");
var alertText = document.querySelector("#alert-text")

//TIMER FUNCTIONALITY
//............
var count = 30;
var timer = '';
var origBrightness = '';

//30 second countdown timer
function initPwrClick(){    

    switch(recordState.state){
        //if recording is off, proceed to shut down
        case 'standby':      
            count = 29;
            timer = setInterval( () => {
                console.log(count);
                countdownNode.innerHTML = count;
                if (count < 1){
                    powerOff(); // switch window and clearinterval(timer)
                }
                else if(count > 1 && count < 10 && !mainWrap.classList.contains("transition10")){ // at 10s start dimming the screen
                    mainWrap.classList.add("transition10");
                    origBrightness = mainWrap.style;
                    mainWrap.style = "filter: brightness(.2);"
                }
                else{
                    --count;
                }
            },1000);
            break;
        //if recording is on, notify user that recording needs to be turned off
        default:
            //yesBtn.classList.add("d-none");
            [countdownNode.parentElement ,yesBtn].forEach( (item) => item.classList.add("d-none") );
            noBtn.children[0].innerText = "ok";
            alertText.innerHTML = "Please stop recording before powering off";
            alertText.style = "font-size: 2rem;"

    }
}

//clear timer interval and switch window location (moreso for the no button href)
function powerOff(){  
    clearInterval(timer);
    mainWrap.classList.add("transition1");
    setTimeout(() =>  mainWrap.style = "filter: brightness(.2);", 100);
    setTimeout(() => window.location = "standby.html", 1050);
}

//"CLICK" POWER BUTTON -> SHOW ALERT BOX
//.................
powerBtn.addEventListener("click",secondChance);
function secondChance(event){
    if(event.target.classList.contains("control-icon")){
        initPwrClick();
        ['alert-top'].forEach(item => offConfirmBox.classList.remove(item));
        tpBackshadow.classList.remove("d-none");
        setTimeout(() => tpBackshadow.style = "opacity: 0.7;", 30);
    }
}

//"CLICK" NO BUTTON -> BACK TO OPERATIONAL TOUCH PANEL (unless user has forgot to turn off recording, then notify user to do this first)
//................
[noBtn,yesBtn].forEach( (element) => { 
    element.addEventListener("click", (event) =>{ (noBtn.children[0].innerText == "No") ? dontTurnOff() : alertToDefault() });

    function dontTurnOff(){ //hide alert box
    
        ['alert-top'].forEach( item => offConfirmBox.classList.add(item));
        event.stopPropagation();//stops the power button event listener removing d-none
        if(event.target.classList.contains("no-btn-element")){
            [offConfirmBox,tpBackshadow].forEach( (item) => item.style = "" );
            // bring back screen to normal lightness if user clicks out of box with < 10s remaining
            if(mainWrap.classList.contains("transition10")){
                mainWrap.classList.remove("transition10");
                mainWrap.classList.add("transition3");
                mainWrap.style = origBrightness;
                setTimeout(() => { mainWrap.style = origBrightness; mainWrap.classList.remove("transition3"); }, 3200);
            }
            clearInterval(timer); //stop timeout timer
            setTimeout(() => countdownNode.innerHTML = "30", 1000);
            setTimeout(() => tpBackshadow.classList.add("d-none"), 350);
        }
    } 

    function alertToDefault(){ //change alert box back to normal yes/no prompt once user confirms to stop recording     
        [countdownNode.parentElement ,yesBtn].forEach( (item) => item.classList.remove("d-none") );
        noBtn.children[0].innerText = "No";
        alertText.innerHTML = "Are you sure?";
        alertText.style = "";
    }
});

//NOTE:
//"CLICK" YESY BUTTON -> STANDBY SPLASH SCREEN
// is done via the href in index.html
