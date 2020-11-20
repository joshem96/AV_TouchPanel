var sw = {
    /* [INIT] */
    etime: null, // holds tl-control time display
    stopped: null, // holds tl-control stop button (reset)
    ego: null, // holds tl-control record/start/stop button
    record: null,
    paused: null,
    play: null,
    timer: null, // timer object
    now: 0, // current timer
    init: function () {
      // Get HTML elements
      sw.etime = recordTimer;
      sw.stopped = stopButton;
      sw.record = recordButton;
      sw.paused = pauseButton;
      sw.play = playButton;
  
      // Attach listeners
      sw.stopped.addEventListener("click", sw.reset);
    //   sw.stopped.disabled = false;
      sw.record.addEventListener("click", () => { if(recordButton.classList.contains("small-icon")){ sw.start(); } });
      sw.paused.addEventListener("click", sw.pause);
    //   sw.play.addEventListener("click", sw.start);
    //   sw.ego.disabled = false;
    },
  
    /* [ACTIONS] */
    tick : function () {
    // tick() : update display if stopwatch running
  
      // Calculate hours, mins, seconds
      sw.now++;
      var remain = sw.now;
      var hours = Math.floor(remain / 3600);
      remain -= hours * 3600;
      var mins = Math.floor(remain / 60);
      remain -= mins * 60;
      var secs = remain;
  
      // Update the display timer
      if (hours<10) { hours = "0" + hours; }
      if (mins<10) { mins = "0" + mins; }
      if (secs<10) { secs = "0" + secs; }
      sw.etime.innerHTML = hours + ":" + mins + ":" + secs;
    },
  
    //start recording timer 
    start : function () {
        if (recordState.state == "standby"){ // STANDBY => RECORDING
          console.log("record triggered");
            sw.timer = setInterval(sw.tick, 1000);
            //sw.ego = playButton; //play button becomes 

            //add start record event back to record and remove it from play
            sw.record.removeEventListener("click", sw.start); 
            sw.play.addEventListener("click",sw.start);
        }
        if (recordState.state == "paused"){ //PAUSED => PLAYING
            sw.timer = setInterval(sw.tick, 1000);
        }
    //   sw.ego.value = "Stop";
    //   sw.ego.addEventListener("click", sw.stop);
    },
  
     //pause recording timer 
    pause  : function () {
        if (recordState.state == "recording"){ // RECORDING => PAUSED
            clearInterval(sw.timer);
            sw.timer = null;
            //   sw.ego.value = "Start";
            // sw.ego.removeEventListener("click", sw.pause);
            // sw.ego.addEventListener("click", sw.start);
        }
    },
  
    reset : function () { //RECORDING => STANDBY
        if (recordState.state == "recording"){
            // Stop if running
            if (sw.timer != null) { sw.pause(); }
            // Reset time
            sw.now = -1;
            sw.tick();
            //add start record event back to record and remove it from play
            sw.play.removeEventListener("click", sw.start); 
            sw.record.addEventListener("click",sw.start);
        }
    }
  };
  
  window.addEventListener("load", sw.init);

//PSUEDO CODE
//.........
    //   TIMER RUN
    // - Record button sets off start function
    // - Pause sets off stop function
    //     - Which changes the event listener on the start function to be play button
    // - Play sets off start function
    //     - Then changes event listener back to record button
    // - Stop sets off reset function
    // 	NOTE:
    // 	- use record state in if statements on each function for funky prevention
    // 	- start in original timer is recordBtn, pause and play
