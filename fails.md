  let terminalHeadBottom = document.querySelector(".terminal-head.bottom");

  // add the now showing head if it isn't already there
  // i.e. don't just keep appending the same element over and over
  if (document.querySelectorAll(".terminal-head.bottom").length > 0) {
    console.log('already a bottom terminal head');
    terminalHeadBottom.innerHTML =
      `Now showing work history ${++nowShowingJob} / ${workHistory.jobs.length}`;
  }
  else {
    terminalHeadBottom = document.createElement("div");
    terminalHeadBottom.classList.add("terminal-head", "bottom");
    terminalHeadBottom.innerHTML =
      `Now showing work history ${++nowShowingJob} / ${workHistory.jobs.length}`;

    target.append(terminalHeadBottom);
  }


  let terminalHeadTop = null;

  console.log(document.querySelectorAll(".terminal-head.top").length)
  // return
  if (document.querySelectorAll(".terminal-head.top").length > 0) {
    console.log('already a top terminal head');
  }
  else {
    terminalHeadTop = document.createElement("div");
    terminalHeadTop.classList.add("terminal-head", "top");
    terminalHeadTop.innerHTML =
      `Now showing work history ${++nowShowingJob} / ${workHistory.jobs.length}`;
    target.append(terminalHeadTop);
  }
