
// import { workHistory, schoolHistory } from './data.js';



const workHistory = {
  jobs: [
    {
      company: 'SBM LLC',
      location: 'Proctor and Gamble Global HQ',
      title: 'Meeting Services Tech',
      dates: '2018-2020',
      description: `Developed applications and scripts for managing event scheduling and equipment inventory; 
      edited audio/visual control system programs and Christie Spyder video processor configurations for Smale Auditorium; 
      provided support for meeting room and video conferencing technical services; 
      provided video production services including control room audio, camera operation, live switching, routing, setup and teardown.`
    },
    {
      company: 'University of Cincinnati',
      location: "Cincinnati, OH, UC Main Campus",
      title: "Computer and Information Analyst",
      dates: "2005-2015",
      description: `Developed custom software for inventory, trouble ticketing, scheduling, equipment delivery, administrative processes. 
      Administered multiple domains, database, course streaming, and other servers; 
      developed innovative applications and created technical solutions where existing systems did not meet customer needs; 
      maintained and deployed system images. Created and maintained incident management, inventory, and other web and administrative software; 
      collaborated with staff and faculty to solve classroom hardware and software needs. 
      Performed general computer support and system imaging. `
    },
    {
      company: "University of Cincinnati",
      location: "Cincinnati, OH, UC Main Campus",
      title: "ResNet Manager",
      description: "Supervised the installation of network connectivity in University dormitories.",
      dates: "2000-2001",
      description: `Managed the ResNet program, directing a team of 15 student workers to set up computer networking for student housing and residence halls.`
    }
  ]
}
const schoolHistory = {
  schools: [
    {
      school: 'The George Washington University',
      years: '1991-1994',
      areaOfStudy: 'Liberal Arts/Music'
    },
    {
      school: 'University of Cincinnati College Conservatory of Music',
      years: '1996-1999',
      areaOfStudy: 'Music Theory and Composition'
    },
    {
      school: 'University of Cincinnati College of Applied Science',
      years: '2002-2005',
      areaOfStudy: 'Information Engineering Technology'
    }
  ]
}




let nowShowingJob = 0;
let nowShowingSchool = 0;
const cycleWorkHistory = () => {
  let result = workHistory.jobs[nowShowingJob].company;
  result += '<br>'
  result += workHistory.jobs[nowShowingJob].location;
  result += '<br>'
  result += workHistory.jobs[nowShowingJob].title;
  result += '<br>'
  nowShowingJob === workHistory.jobs.length - 1 ?
    nowShowingJob = 0
    : nowShowingJob++;

  console.log(result);

  return result;
}
const cycleSchoolHistory = () => {


  let result = schoolHistory.schools[nowShowingSchool].school;
  result += '<br>'
  result += schoolHistory.schools[nowShowingSchool].years;
  result += '<br>'
  result += schoolHistory.schools[nowShowingSchool].areaOfStudy;
  result += '<br>'
  nowShowingSchool === schoolHistory.schools.length - 1 ?
    nowShowingSchool = 0
    : nowShowingSchool++;

  console.log(result);
  return result;
}

const displayNextWorkHistoryItem = () => {
  const target = document.querySelector(".terminal-text");
  target.innerHTML = `<div class='terminal-head'>Now showing ${nowShowingJob + 1} / ${workHistory.jobs.length}</div>${cycleWorkHistory()}`;
}
const displayNextSchoolHistoryItem = () => {
  const target = document.querySelector(".terminal-text");
  target.innerHTML = `<div class='terminal-head'>Now showing ${nowShowingSchool + 1} / ${schoolHistory.schools.length}</div>${cycleSchoolHistory()}`;
}

const changeBackground = () => {

}





/*
  next part taken from
    https://codepen.io/wheelercode/pen/LYzaxgQ
*/

let drag_div, hit_div;
let win_rect; // window client area
let dragging;
let offset;
let colors = {
  up: "rgb(255, 254, 165)",
  down: "rgb(165, 255, 180)",
  bg: "rgb(255, 165, 165)"
}

// add hit-test functionality to DOMRect
DOMRect.prototype.hit = function (x, y) {
  return x >= this.left && x <= this.right &&
    y >= this.top && y <= this.bottom;
}

// yum
function px(n) {
  return `${n}px`;
}

function init() {
  // HTML elements
  drag_div = document.getElementById("terminal");
  hit_div = document.getElementById("terminal");

  // listeners
  window.addEventListener("pointerdown", pointerDown);
  window.addEventListener("pointermove", pointerMove);
  window.addEventListener("pointerup", pointerUp);
  window.addEventListener("resize", resize);

  // init data
  dragging = false;
  offset = { x: 0, y: 0 }
  win_rect = document.body.getBoundingClientRect();

  // position div to center
  let drag_rect = drag_div.getBoundingClientRect();
  let left = Math.round((win_rect.width / 2) - (drag_rect.width / 2));
  let top = Math.round((win_rect.height / 2) - (drag_rect.height / 2));
  drag_div.style.left = px(left);
  drag_div.style.top = px(top);
}

function resize(event) {
  // keep track of changed client area dimensions 
  win_rect = document.body.getBoundingClientRect();
}

function pointerDown(event) {
  let [x, y] = [event.clientX, event.clientY];
  let drag_rect = drag_div.getBoundingClientRect();
  hit_rect = hit_div.getBoundingClientRect();
  if (hit_rect.hit(x, y)) {
    dragging = true;
    offset.x = x - drag_rect.x;
    offset.y = y - drag_rect.y;
    // hit_div.style.backgroundColor = colors.down;
  }
}


function pointerMove(event) {
  let [x, y] = [event.clientX, event.clientY];
  let drag_rect = drag_div.getBoundingClientRect();
  if (dragging) {
    let left = x - offset.x;
    let right = left + drag_rect.width;
    let top = y - offset.y;
    let bottom = top + drag_rect.height;

    // prevent dragging off screen left/right
    if (left < 0) {
      left = 0;
    } else if (right > win_rect.right) {
      left = win_rect.right - drag_rect.width;
    }

    // prevent dragging off screen top/bottom 
    if (top < 0) {
      top = 0;
    } else if (bottom > win_rect.bottom) {
      top = win_rect.bottom - drag_rect.height;
    }

    drag_div.style.left = px(left);
    drag_div.style.top = px(top);
  }
}

function pointerUp(event) {
  dragging = false;
  // hit_div.style.backgroundColor = colors.up;
}

init();




