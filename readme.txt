** PROGRAMMER NOTES **

view the github link at https://joshem96.github.io/AV_TouchPanel/

//controlable values
- FADERS
    - find the source fader (eg <input type="range">) and add it to the dom and get its values  
        - eg document.querySelector("input.secondary-range.master-volume-range").value 
- TOPLEFT CONTROLS
    - RECORDING
        - recordState.state
            - Will give you the current state of recording
            - it also includes transient states such as stopped and play, which are 500ms each
        - sw.now
            - will give you plain numbers (eg 5 for 5seconds)
        - recordTimer.innerHTML
            - will give you the current string of the timer in hour, minutes and seconds (eg 12:34:03)
    - brightnessRange.value 
        - will give you the current value of the brightness range
    - masterVolumeRange.value 
        - will give you the current value of the master-volume range
-PASSCODE
    -pwCheck, is the variable of users' input
    -pwCode, is the variable of the passcode 