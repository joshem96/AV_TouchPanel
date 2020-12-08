var powerBtn = document.querySelector("#powerButton");
var offConfirmBox = document.querySelector(".off-confirm-box");
var yesBtn = document.querySelector("#yesBtn");
var noBtn = document.querySelector("#noBtn");
var tpBackshadow = document.querySelector("#po-backshadow");
var countdownNode = document.querySelector("#countdown");
var alertText = document.querySelector("#alert-text");
var thumb = document.querySelector("#thumb");//for thumbs up image
var techSettingsIcon = document.querySelector("#ts-icon");
var powerModeWrap = document.querySelector("#power-mode");
var techSettingsWrap = document.querySelector("#ts-wrap");
var tsReturn = document.querySelector("#ts-return");
var alertBoxState = 'default';

//TIMER FUNCTIONALITY
//............
var count = 30;
var timer = '';
var origBrightness = '';

//pop up box
function initAlert(){    
    //debugger;
//create variable to determine what to show on pop-up-alert   
//var switchCase = (event.target.id == "ts-icon") ? 'techSettings' : 'standby';
//debugger;
var switchCase = ( () => { 
    if (event.target.id == "ts-icon"){ return 'techSettings' }
    else if(recordState.state == 'standby'){ return 'standby' }
    else if(recordState.state == 'recording'){ return 'recording'}
})();

    switch(switchCase){

        //if recording is off, proceed to shut down
        case 'standby':  
            alertBoxState = 'default';
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

        //if techSettings button was pressed
        case 'techSettings':
            alertBoxState = 'techSettings';
            powerModeWrap.classList.add("d-none");
            techSettingsWrap.classList.remove("d-none");
            console.log("ee");
            //debugger;
            break;

        //if recording is on, notify user that recording needs to be turned off
        case 'recording': //originally default:
            alertBoxState = 'recording';
            //debugger;
            //yesBtn.classList.add("d-none");
            [countdownNode.parentElement ,yesBtn].forEach( (item) => item.classList.add("d-none") );
            //debugger;
            noBtn.children[0].innerText = "";
            thumb.classList.remove("d-none");
            alertText.innerHTML = "Please stop recording before powering off";
            alertText.style = "font-size: 2rem;";
    }
}

//clear timer interval and switch window location (moreso for the no button href)
function powerOff(){  
    clearInterval(timer);
    mainWrap.classList.add("transition1");
    setTimeout(() =>  mainWrap.style = "filter: brightness(.2);", 100);
    setTimeout(() => window.location = "standby.html", 1050);
}

//"CLICK" POWER BTN/TS BTN -> SHOW ALERT BOX
//.................
[powerBtn,techSettingsIcon].forEach( (btn) => btn.addEventListener("click",removeAlert));
function removeAlert(event){
    if(event.target.classList.contains("control-icon")){
    //if(event.target.classList.contains("control-icon")){
        //debugger;
        initAlert();
        ['alert-top'].forEach(item => offConfirmBox.classList.remove(item));
        tpBackshadow.classList.remove("d-none");
        setTimeout(() => tpBackshadow.style = "opacity: 0.7;", 30);
    }
    //}
}

//"CLICK" NO BUTTON -> BACK TO OPERATIONAL TOUCH PANEL (unless user has forgot to turn off recording, then notify user to do this first)
//................
[noBtn,tsReturn].forEach( (element) => { 

    element.addEventListener("click", (event) =>{ (/*noBtn.children[0].innerText == "No"*/ alertBoxState == 'default' ) ? dontTurnOff() : alertToDefault() });
    function dontTurnOff(){ //hide alert box
        //debugger;
        ['alert-top'].forEach( item => offConfirmBox.classList.add(item)); //make alert dissapear off display
        [offConfirmBox,tpBackshadow].forEach( (item) => item.style = "" ); //remove dark from display 
        event.stopPropagation();//stops the power button event listener removing d-none
        if(event.target.classList.contains("no-btn-element")){ 
            // bring back screen to normal lightness if user clicks out of box with < 10s remaining
            if(mainWrap.classList.contains("transition10")){
                mainWrap.classList.remove("transition10");
                mainWrap.classList.add("transition3");
                mainWrap.style = origBrightness;
                setTimeout(() => { mainWrap.style = origBrightness; mainWrap.classList.remove("transition3"); }, 3200);
            }
            // clearInterval(timer); //stop timeout timer
            // setTimeout(() => countdownNode.innerHTML = "30", 1000);
            // setTimeout(() => tpBackshadow.classList.add("d-none"), 350);
        }
        clearInterval(timer); //stop timeout timer
        setTimeout(() => countdownNode.innerHTML = "30", 1000);
        setTimeout(() => tpBackshadow.classList.add("d-none"), 350);
    } 

    function alertToDefault(){ //change alert box back to normal yes/no prompt once user confirms to stop recording
        dontTurnOff();
        setTimeout(() => {
            [countdownNode.parentElement ,yesBtn].forEach( (item) => item.classList.remove("d-none") );
            noBtn.children[0].innerText = "No";
            thumb.classList.add("d-none");
            alertText.innerHTML = "Are you sure?";
            alertText.style = "";
            //if in tech settings, hide tech settings and revert back to normal
            if (alertBoxState == 'techSettings') {
                techSettingsWrap.classList.add("d-none");
                powerModeWrap.classList.remove("d-none");     
            }
        }, 500);     
    }
});

//NOTE:
//"CLICK" YESY BUTTON -> STANDBY SPLASH SCREEN
// is done via the href in index.html
