let hour = 0;
let minute = 0;
let second = 0;
let isPaused = false;

function increaseHour() {
  if (hour === 24) hour = 0;
  else hour++;
  $(".hour").text(hour);
}

function decreaseHour() {
  if (hour === 0) hour = 24;
  else hour--;
  $(".hour").text(hour);
}

function increaseMinute() {
  if (minute === 59) minute = 0;
  else minute++;
  $(".minute").text(minute);
}

function decreaseMinute() {
  if (minute === 0) minute = 59;
  else minute--;
  $(".minute").text(minute);
}

function increaseSecond() {
  if (second === 59) second = 0;
  else second++;
  $(".second").text(second);
}

function decreaseSecond() {
  if (second === 0) second = 59;
  else second--;
  $(".second").text(second);
}

function startCountdown(setHour = 0, setMinute = 0, setSecond = 0, isSpecialCase = 0) {

  hour = setHour != 0 ? setHour  : parseInt($(".hour").text());
  minute = setMinute != 0 ? setMinute : parseInt($(".minute").text());
  second = setSecond != 0 ? setSecond : parseInt($(".second").text());
  isPaused = false;

  $(".increase-btn").attr("disabled", "disabled").addClass("disable-btn");
  $(".decrease-btn").attr("disabled", "disabled").addClass("disable-btn");
  $("#change-btn").attr("onclick", "pauseCountdown()").html("Pause");
  $("#stop-btn").removeAttr("disabled").removeClass("disable-btn");
  $("#theme-btn").attr("disabled", "disabled").addClass("disable-btn");

  let countdown = setInterval(function () {
    if (!isPaused) {
      if (second < 1) {
        if (minute <= 0) {
          if (hour <= 0) {
            clearInterval(countdown);
            stopCountdown();
            return;
          } else {
            hour--;
          }
          minute = 59;
        } else {
          minute--;
        }
        second = 59;
      } else {
        second--;
      }

      if (hour === 0 && minute === 0 && second < 10) {
        $("#tick")[0].play();
      }

      if (hour === 0 && minute === 1 && second === 0 && isSpecialCase === 1) {
        $("#beep")[0].play();
        $(".time-container").css({ "background-color": "#FF0000" });
      }

      $(".second").text(second);
      $(".minute").text(minute);
      $(".hour").text(hour);
    }
  }, 1000);
}

function pauseCountdown() {
  isPaused = true;
  $("#change-btn").attr("onclick", "resumeCountdown()").html("Resume");
}

function resumeCountdown() {
  isPaused = false;
  $("#change-btn").attr("onclick", "pauseCountdown()").html("Pause");
}

function stopCountdown() {
  hour = 0;
  minute = 0;
  second = 0;
  let loopBeep = 4;
  $("#beep")[0].play();

  let beep = setInterval(function () {
    if (loopBeep !== 0) {
      $("#beep")[0].play();
    } else {
      clearInterval(beep);
    }
    loopBeep--;
  }, 1000);

  $(".second").text(second);
  $(".minute").text(minute);
  $(".hour").text(hour);
  $(".time-container").css({ backgroundColor: "var(--color-1)" });

  $(".increase-btn").removeAttr("disabled").removeClass("disable-btn");
  $(".decrease-btn").removeAttr("disabled").removeClass("disable-btn");
  $("#change-btn").attr("onclick", "startCountdown()").html("Start");
  $("#stop-btn").attr("disabled", "disabled").addClass("disable-btn");
  $("#theme-btn").removeAttr("disabled").removeClass("disable-btn");
}

function changeTheme() {
  let attr = $("body").attr("data-theme");

  if (typeof attr !== "undefined" && attr !== false) {
    $("body").removeAttr("data-theme");
    $(".theme-btn").html(`<i class="fa-regular fa-sun"></i>`);
  } else {
    $("body").attr("data-theme", "dark");
    $(".theme-btn").html(`<i class="fa-regular fa-moon"></i>`);
  }
}

// function setPresentasi(){
//   clearTimeout(timeout);
//   document.getElementById('start').removeAttribute('disabled'); 
//   document.getElementById('showmnt').innerHTML = "05";
//   document.getElementById('showdtk').innerHTML = "00";
//   document.getElementById("mnt").value = "05";
//   document.getElementById("dtk").value = "00";
//   menit = 5;
//   detik = 0;
//   startval = 0;
// }

// function setTanyaJawab(){
//   clearTimeout(timeout);
//   document.getElementById('start').removeAttribute('disabled'); 
//   document.getElementById('showmnt').innerHTML = "03";
//   document.getElementById('showdtk').innerHTML = "00";
//   document.getElementById("minute").value = "03";
//   document.getElementById("second").value = "00";
//   menit = 10;
//   detik = 0;
//   startval = 0;
// }
