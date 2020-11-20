//VARIABLES
//......................
var tlWrap = document.querySelector("#tl-controls");
var tlIcons = document.querySelectorAll("control-icon-wrap");
var tlReturn = document.querySelector("#tl-return");
var tlReturnWrap = document.querySelector("#tl-return-wrap");
var volumeWrap = document.querySelector("#sound-button-wrap");
var masterVolumeRange = document.querySelector(".master-volume-range");
var soundButton = document.querySelector("#sound-button");
var brightnessWrap = document.querySelector("#brightness-button-wrap");
var brightnessRange = document.querySelector(".screen-brightness-range");
var brightnessButton = document.querySelector("#brightness-button");
var recordWrap = document.querySelector("#record-ctrls-wrap");
var recordButton = document.querySelector("#record-button");
var recordButtonWrap = document.querySelector("#record-button-wrap");
var recordElements = document.querySelectorAll(".record-element");
var recordTimer = document.querySelector("#record-timer")
var recordTimerWrap = document.querySelector("#record-timer-wrap");
var playButton = document.querySelector("#play-button");
var pauseButton = document.querySelector("#pause-button");
var stopButton = document.querySelector("#stop-button");
var recordState = recordWrap.dataset;
var selectedCtrl = "";
var unselectedCtrl = "";
var masterVolumeValue = ""; //NOTE: this only stores the value when the sound is muted
var brightnessValue = "";


//BRIGHTNESS RANGE "LIVE" EVENT LISTENER 
//....................
var activeBrightness = "";
    //-Mousedown”, start event listener that listens for changes to brightness every 1ms 
    ['mousedown','touchstart'].forEach(event => {
        brightnessRange.addEventListener(event, (e) => {
            var target = e.target;

            activeBrightness = setInterval(() => {
                brightnessValue = parseInt(target.value);// turn range value into number from string
                //set brightness of mainWrap according to the value of the brightness range
                if (brightnessValue < 100){ 
                    mainWrap.style = "filter: brightness(" + "." + brightnessValue + ")";
                }
                else if (brightnessValue == 100){
                    mainWrap.style = "filter: brightness(1)";
                } 
            }, 1);
        },false);
    });

    //"mouseup", clear the interval 
    ['mouseup','touchend'].forEach(event => {
        brightnessRange.addEventListener("event",() => {
            clearInterval(activeBrightness);
        });
    });

//TOPLEFT CONTROLS WRAP TARGET EVENTS 
//............................
    //Click the button, display none the rest, add flex-grow-1 to clicked
    //Remove d-none from absolutely positioned X image (to act as exit button)
    tlWrap.addEventListener("click", (e) => { 
        var target = e.target; 

        // takes note of what type of element is selected (eg record) and adds tl-ctrl-on to its parent element
        // add/remove classlist which tells which control is selected
        if (target.classList.contains("tl-control-icon")){

            if (target.parentElement.id == "record-button-wrap"){
                ['mx-1','tl-ctrl-on'].forEach( item => recordWrap.classList.add(item));
                recordButtonWrap.classList.add("small-icon-wrap");
                recordButton.parentElement.classList.remove("tl-ctrl-off");            
            }
            else{
                target.parentElement.classList.add("tl-ctrl-on"); 
                target.parentElement.classList.remove("tl-ctrl-off");
            }
            selectedCtrl = document.querySelector(".tl-ctrl-on");
            unselectedCtrl = document.querySelectorAll(".tl-ctrl-off");
        }

        var thisRange = ""; //will be a querySelector for necesary rsnge (eg master volume range)
        if (selectedCtrl.classList.contains("range-element")){
            thisRange = (selectedCtrl.id == "sound-button-wrap") ? masterVolumeRange : brightnessRange;
        }
        

        //"CLICK" ICON, SHOW ICONS INNER CONTROLS FUNCTION (eg click sound icon to show master volume range and mute)
        //.......................
        function displayTlControl (cElementOne,cElementTwo,flexGrow){
            //first set of arguments, select what groups (record etc) to display none
            //use 0 and 1 for sound button, 2 and 0 for brightness, 1 and 2 for record (BEFORE SOUND AND BRIGHTNESS WERE SWITCHED)
            //use 2 and 0 for sound button, 0 and 1 for brightness, 1 and 2 for record (AFTER SOUND AND BRIGHTNESS WERE SWITCHED)
            //second set, select parent element to add flex-grow to
            //use 0(record)1(brightness),2(sound)

            if(target.children.length >= 1){ target = target.children[0]; } //force target to be img if imgwrap is selected (eg sound img wrap -> sound img)
            
            //hide non-clicked buttons
            tlWrap.children[cElementOne].classList.remove("d-flex");
            tlWrap.children[cElementTwo].classList.remove("d-flex");
            tlWrap.children[cElementOne].classList.add("d-none");
            tlWrap.children[cElementTwo].classList.add("d-none");
   
            //change styles to show clicked controls
            //target.parentElement.firstElementChild.classList.add("small-icon") //= "width: 35px; height: 35px;"; 
            if (target.id == "record-button") { //if record button pressed

                recordElements.forEach(element => {
                    element.classList.remove("d-none"); 
                    element.classList.add("center");
                    //element.classList.add("small-icon");
                    //recordWrap.classList.add("small-icon");
                });

                //HACK: stop the recording button from 'clicking active' when first clicked
                target.parentElement.firstElementChild.classList.remove("record-element"); 
                setTimeout(() => {
                    target.parentElement.firstElementChild.classList.add("record-element"); 
                }, 300);
            }
            else { // if sound or brightness pressed, show range with fade in opacity effect
                debugger;
                target.parentElement.lastElementChild.classList.remove("d-none"); // remove d-none from range-wrap
                //thisRange = (selectedCtrl.id == "sound-button-wrap") ? masterVolumeRange : brightnessRange;
                thisRange.classList.remove("d-none");
                setTimeout(() => thisRange.style = "opacity: 1", 100); 
            }

            tlWrap.children[flexGrow].style = "flex-grow: 1;";
            [tlReturnWrap,tlReturn].forEach( element => element.classList.remove("d-none") );
            setTimeout(() => tlReturn.style = "opacity: 1", 100); 

            debugger;
            target.parentElement.firstElementChild.classList.add("small-icon") //= "width: 35px; height: 35px;"; 
            //debugger;
        }

        //INNER RECORDING CONTROLS (PLAY, PAUSE ETC))
        //..........................................
        // - standby (default)
		// - can press record only
	    // -recording
		// -can press pause and stop only
	    // -paused
		// -can press play only
	    // -stopped
        // -temporary, reverts back to default
        //refer to recordTimer.js for timer controls
        
        //if any of the inner record elements are clicked
        if (['record-element','small-icon'].every( item => target.classList.contains(item)) && recordWrap.classList.contains("tl-ctrl-on")){

            //if in standby mode and record button pressed, turn record mode on
            if (target.id == "record-button" && recordState.state == "standby"/*recordButton.dataset.state == "off"*/){
                recordButton.src = "Assets/record-on.png";
                recordState.state = "recording";
                //check if tech config allows for showing the timer
                (recordTimerWrap.dataset.displayed=="true") ? recordTimerWrap.classList.remove("d-none") : console.log("timer is off");//awesome is a placeholder
            }
            //if paused and play button pressed, resume recording
            if (target.id == "play-button" && recordState.state == "paused"){
                ['on','pause-shadow'].forEach(item => pauseButton.parentElement.children[1].classList.remove(item));
                recordState.state = "play"; //set to play for 500ms then change back to recording, to indicate play was pressed
                setTimeout(() => { recordState.state = "recording"; }, 500);
            }
            //if in recording mode and pause button pressed, turn pause mode on
            if (target.id == "pause-button" && recordState.state == "recording"){
                //add backshadow to pasue button
                ['on','pause-shadow'].forEach(item => target.parentElement.children[1].classList.add(item));
                recordState.state = "paused";
            }
            //if recording and stop is pressed, stop recording and put backinto standby mode
            if (target.id == "stop-button" && recordState.state == "recording"){
                recordButton.src = "Assets/record-off.png";
                recordState.state = "stop"; //set to stop for 500ms then change back to recording, to indicate play was pressed
                setTimeout(() => { recordState.state = "standby"; }, 500);
                // recordTimerWrap.classList.add("d-none");
                (recordTimerWrap.dataset.displayed=="true") ? recordTimerWrap.classList.add("d-none") : console.log("timer is off");//awesome is a placeholder
            }
            // console.log(recordState);
        }

        //RANGE FADERS "CLICKED" & SLIDED
        //.......................................
        if (target.type == "range"){
            //VOLUME RANGE 
            if (target == masterVolumeRange){
                //UNMUTED -> MUTED
                if (masterVolumeRange.value == 0){ //- If value becomes 0, set it as if it was muted
                    soundButton.src = "Assets/sound-off_edited.png";
                    soundButton.dataset.state = "muted";
                    masterVolumeValue = masterVolumeRange.value; //store the value before muted (in this case 0)
                }
                //MUTED -> UNMUTED
                else if (soundButton.dataset.state == "muted"){ //- If muted and vol is changed, change dataset and delete stored value
                    soundButton.src = "Assets/sound-on_edited.png";
                    soundButton.dataset.state = "unmuted";
                    masterVolumeValue = "";
                }
            }
        }

        //ICON BUTTONS "CLICKED" & SELECTED FUNCTION TRIGGERS
        //......................................

        //SOUND ICON SELECTED
        if (target.id == "sound-button") { 
            if (!target.classList.contains("small-icon")){// default menu => volume menu
                //displayTlControl(0,1,2); // ORIG
                displayTlControl(2,0,1); 
            }
            else if (target.classList.contains("small-icon")) { // turning mute on/off

                if (target.dataset.state == "unmuted"){ // UNMUTED -> MUTED
                    // if its on, mute and set value to 0 and store original value unless edited
                    target.src = "Assets/sound-off_edited.png";
                    target.dataset.state = "muted";
                    masterVolumeValue = masterVolumeRange.value; //store the value before muted
                    masterVolumeRange.value = 0; //set range value to 0
                    // soundButton.style = "width: 31px; height: 31px;";
                }
                else { //MUTED -> UNMUTED
                    target.src = "Assets/sound-on_edited.png";
                    target.dataset.state = "unmuted";
                    masterVolumeRange.value = masterVolumeValue;
                }
            }
        }
        //BRIGHTNESS ICON SELECTED
        else if (target.id == "brightness-button" && !target.classList.contains("small-icon")) { /*displayTlControl(2,0,1)ORIG*/ displayTlControl(0,1,2);  } 
        //RECORD ICON SELECTED
        else if (target.id == "record-button" && !target.classList.contains("small-icon")) { displayTlControl(1,2,0); }
        //RETURN ICON SELECTED
        if(target.id == "tl-return"){ //return from selected control back to default view

            // if(recordWrap.classList.contains("tl-ctrl-on")){
            //     recordButtonWrap.classList.remove("small-icon-wrap");
            // }
debugger;
            // - add/remove d-none to relevant controls and return other styles back to default 
            for(var i = 0; i < selectedCtrl.children.length; i++){
                //d-none all items except the first child (which is the icon in default view)
                if (!i == 0){
                    selectedCtrl.children.item(i).classList.add("d-none");
                }
                if (selectedCtrl.children.item(i).classList.contains("small-icon")){
                    selectedCtrl.children.item(i).classList.remove("small-icon");
                }
            }

            //re-organise styles back to unselected button states (so all btns are tl-ctrl-off)
            for(var i = 0; i < unselectedCtrl.length; i++){
                unselectedCtrl[i].classList.remove("d-none"); 
                unselectedCtrl[i].classList.add("d-flex");
            }
            [tlReturn, selectedCtrl, selectedCtrl.firstElementChild].forEach(item => item.style = "" );
            selectedCtrl.classList.add("d-none");
            [tlReturnWrap,tlReturn].forEach( element => element.classList.add("d-none") );
debugger;
            //add tl-control off and remove tl-control-on to deselected button
            if (recordWrap.classList.contains("tl-ctrl-on")){ // if record button was clicked
                recordWrap.classList.add("tl-ctrl-off");
                recordButtonWrap.classList.remove("small-icon-wrap");
                ['mx-1','tl-ctrl-on'].forEach( item => recordWrap.classList.remove(item)); 
                // recordWrap.classList.remove("tl-ctrl-on");
                // recordButtonWrap.classList.remove("small-icon");
                // recordButton.classList.remove("small-icon");
                recordButton.classList.remove("small-icon");
                recordElements.forEach( element => {
                    if (!element.id.includes("record")){ element.classList.add("d-none"); element.classList.remove("center"); }
                });
            }
            else{ //if sound/brightness was clicked
                selectedCtrl.classList.add("tl-ctrl-off"); 
                selectedCtrl.classList.remove("tl-ctrl-on");
                thisRange.style = "";
            }
        }
    });