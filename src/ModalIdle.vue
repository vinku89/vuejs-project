<template>
  <div
    class="overlay"
  >
    <div class="modal">
      <div class="modal__title">
        <span>Session Expired</span>
      </div>
      <div class="p-3"> 
        <p>You have left this browser idle for 10 minutes.</p>
        <p>{{ time }} second left</p>
      </div>
    </div>
  </div>
</template>

<script>
//import $ from 'jquery';
export default {
	data() {
		return {
			time: 840000
		}
	},
	created() {
    var idleTime = 0;
//     localStorage.removeItem("idleTimeValue");
//  setInterval(timerIncrement, 1000);


// function timerIncrement()  
// {
//     if(localStorage.getItem("idleTimeValue")) {
//         idleTime            = parseInt(localStorage.getItem("idleTimeValue")) + 1; //increments idle time by one second
//     } else {
//         idleTime            = 1;
//     }

//     localStorage.setItem("idleTimeValue", idleTime);

//     var timeDiff            = 600; 
//     var totTimeRemaining    = timeDiff-idleTime;


//     if(totTimeRemaining > 0) {

//                 $('#timeoutWindow').modal('show');
//                 var minutes = Math.floor(totTimeRemaining / 60);
//                 var seconds = totTimeRemaining - minutes * 60;
//                 $('#timeoutRemainingTime').html(minutes+" minutes and "+seconds+" seconds");
//     } else {
//                 window.location.href = "/";
//     }

// }


// var currentTime         = new Date();

// if ( !(localStorage.getItem("currentTime")) || (localStorage.getItem("currentTime") == "") )
// {
//         idleTime        = 0;
//         setTimeout(function() { localStorage.setItem("currentTime", currentTime)},5000); // current time is set to localStorage after  seconds (it is for setting in multiple tabs)
// } 


// $(this).click(function () 
// {
//     $('#timeoutWindow').modal('hide');
//     localStorage.setItem("currentTime", "");
//     idleTime = 0;
// });



if(this.$store.getters.isLoggedIn){
localStorage.removeItem("idleTimeValue");
    let timerId = setInterval(() => {
      //console.log("tttttttttttttttttttttttttttisss");
      //console.log(this.time);
      this.time -= 1000;
      // if(localStorage.getItem("idleTimeValue")) {
      //     idleTime = parseInt(localStorage.getItem("idleTimeValue")) + this.time; //increments idle time by one second
      // } else {
          idleTime = this.time;
      //}
//var totTimeRemaining    = this.time-idleTime*1000;
    localStorage.setItem("idleTimeValue", idleTime);
      if (!this.$store.state.idleVue.isIdle) clearInterval(timerId);
      if (idleTime < 1 && this.$store.getters.isLoggedIn) {
        //console.log("tttttttttttttttttttttttttttimestamp");
        //console.log(this.time+" "+idleTime*1000);
        clearInterval(timerId);
        // Your logout function should be over here
        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
        this.$store.state.token = null
        this.$store.state.user_id = null
        localStorage.removeItem("idleTimeValue");
        this.$store.state.isLoggedIn = false
        window.location.href = "/";
      }
    }, 1000);
}
  }
};
</script>