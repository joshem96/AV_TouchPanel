//GLOBAL VARIABLES
//...................................................
var topBar = document.querySelector("#top-bar");
var mainControls = document.querySelector("#main-controls");
var mainWrap = document.querySelector(".main-wrap");

//DEVELOPER TOOLS
//..................................................
//GRID TOGGLE (if user presses g key)
var toggle = 1;
window.addEventListener("keypress", (e) => {
    if (e.keyCode === 103){
        if(toggle === 1){
            topBar.classList.add("border");
            mainControls.classList.add("border");
            bottomBar.classList.add("border");   
            toggle = 2;
        }
        else {
            topBar.classList.remove("border");
            mainControls.classList.remove("border");
            bottomBar.classList.remove("border");
            toggle = 1;  
        }
    }
});

//MAIN WINDOW SWITCHING
//..................................................
var bottomBar = document.querySelector("#bottom-bar");
var micLevels = document.querySelector("#mic-control");
var lightingLevels = document.querySelector("#lighting-control");
var displayLevels = document.querySelector("#display-control");
var micWindow = document.querySelector("#mic-control-wrap");
var lightingWindow = document.querySelector("#lighting-control-wrap");
var displayWindow = document.querySelector("#display-switching-wrap");

//bottom bar functionality (adding background shadow etc)
bottomBar.addEventListener("click", (e) => {
    //debugger;
    var target = ( () => {
        if (e.target.classList.contains("control-icon")) {
            return e.target.parentElement.parentElement;
        }
        else if (e.target.classList.contains("control-icon-wrap") || e.target.classList.contains("text-center")) {
            return e.target.parentElement;
        }
    })();

    if (target != undefined){
        //when btn pressed add backshadow to said btn & remove frm backshadow frm other controls
        if(target.id == "mic-control"){
            //turn on backshadow for selected
            target.children[2].classList.add("on");
            target.children[2].classList.remove("d-none");

            //turn off backshadow for non-clicked
            lightingLevels.children[2].classList.remove("on");
            lightingLevels.children[2].classList.add("d-none");
            displayLevels.children[2].classList.remove("on");
            displayLevels.children[2].classList.add("d-none");

            //remove d-none from target window & add to windows not selected
            micWindow.classList.remove("d-none");
            micWindow.classList.add("d-flex");
            lightingWindow.classList.add("d-none");
            lightingWindow.classList.remove("d-flex");
            displayWindow.classList.add("d-none");
            displayWindow.classList.remove("d-flex");
        }

        //when power btn pressed
        if (target.id == "powerButton"){
        //add backshadow to power button then remove after .1s to mimic active state 
        //uncomment for it to work
            // target.children[2].classList.add("on-secondary");
            // setTimeout(() => {
            //     target.children[2].classList.remove("on-secondary");
            // }, 160);
        }

        //when btn pressed add backshadow to said btn & remove frm backshadow frm other controls
        if(target.id == "lighting-control"){

            //turn on backshadow for selected
            target.children[2].classList.add("on");
            target.children[2].classList.remove("d-none");

            //turn off backshadow for non-clicked
            micLevels.children[2].classList.remove("on");
            micLevels.children[2].classList.add("d-none");
            displayLevels.children[2].classList.remove("on");
            displayLevels.children[2].classList.add("d-none");

            //remove d-none from target window & add to windows not selected
            lightingWindow.classList.remove("d-none");
            lightingWindow.classList.add("d-flex");
            micWindow.classList.add("d-none");
            micWindow.classList.remove("d-flex");
            displayWindow.classList.add("d-none");
            displayWindow.classList.remove("d-flex");
        }

        //when btn pressed add backshadow to said btn & remove frm backshadow frm other controls
        if(target.id == "display-control"){
            //turn on backshadow for selected
            target.children[2].classList.add("on");
            target.children[2].classList.remove("d-none");

            //turn off backshadow for non-clicked
            lightingLevels.children[2].classList.remove("on");
            lightingLevels.children[2].classList.add("d-none");
            micLevels.children[2].classList.remove("on");
            micLevels.children[2].classList.add("d-none");

            //remove d-none from target window & add to windows not selected
            displayWindow.classList.remove("d-none");
            displayWindow.classList.add("d-flex");
            micWindow.classList.add("d-none");
            micWindow.classList.remove("d-flex");
            lightingWindow.classList.add("d-none");
            lightingWindow.classList.remove("d-flex");
        }
    }
});

//CONNECTIVITY SWITCHING
//.............................
var computerIcon = document.getElementById("computer");
var hdmiIcon = document.getElementById("hdmi");
var wirelessIcon = document.getElementById("wireless");
var displayWindow = document.getElementById("display-switching-wrap");

displayWindow.addEventListener("click", (e) => {

    var target = ( () => {
        if (e.target.classList.contains("control-icon")) {
            return e.target.parentElement.parentElement;
        }
        else if (e.target.classList.contains("control-icon-wrap") || e.target.classList.contains("text-center")){
            return e.target.parentElement;
        }
    })();

    if (target != undefined){
        //when btn pressed add backshadow to said btn & remove frm backshadow frm other controls
        if(target.id == "computer"){
            //turn on backshadow for selected
            target.children[2].classList.add("on");

            //turn off backshadow for non-clicked
            hdmiIcon.children[2].classList.remove("on");
            wirelessIcon.children[2].classList.remove("on");
        }
        if(target.id == "hdmi"){
            //turn on backshadow for selected
            target.children[2].classList.add("on");

            //turn off backshadow for non-clicked
            computerIcon.children[2].classList.remove("on");
            wirelessIcon.children[2].classList.remove("on");
        }
        if(target.id == "wireless"){
            //turn on backshadow for selected
            target.children[2].classList.add("on");

            //turn off backshadow for non-clicked
            hdmiIcon.children[2].classList.remove("on");
            computerIcon.children[2].classList.remove("on");
        }
    }
});