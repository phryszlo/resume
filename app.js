
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



/*
  WORK AND SCHOOL HISTORY COUNTERS
*/
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

const displayNextSchoolHistoryItem = () => {
  const target = document.querySelector(".terminal-inner.top");
  target.innerHTML = `<div class='terminal-head'>Now showing ${nowShowingSchool + 1} / ${schoolHistory.schools.length}</div>${cycleSchoolHistory()}`;
}
const displayNextWorkHistoryItem = () => {
  const target = document.querySelector(".terminal-inner.bottom");
  target.innerHTML = `<div class='terminal-head'>Now showing ${nowShowingJob + 1} / ${workHistory.jobs.length}</div>${cycleWorkHistory()}`;
}



/* BACKGROUND IMAGE ARRAY */
let idxBg = 0;
const backgroundImages = [
  "black.png",
  "silhouetted.png",
  "bmmod1.png",
  // "sunset1.jpg",
  "phoenix.jpg",
  // "bmmod2.png",
  "sunset2.jpg"

];

/* DOMCONTENTLOADED 
after all elements have been rendered 
    check which image has been set as the background
    and find the index of its match in the bg array */
window.addEventListener('DOMContentLoaded', () => {
  const target = document.querySelector(".background");
  const nowShowing = target.src.substring(target.src.indexOf('/') + 1);
  console.log(nowShowing.substring(nowShowing.lastIndexOf('/') + 1));
  const idxNowShowing = backgroundImages.findIndex((path) =>
    path === nowShowing.substring(nowShowing.lastIndexOf('/') + 1)
  );
  idxBg = idxNowShowing;
});

const cycleBackgroundImages = () => {
  if (idxBg === (backgroundImages.length - 1)) {
    console.log('idxBg max')
    idxBg = 0;
  }
  else {
    idxBg++;
  }
  console.log(`${idxBg}/${backgroundImages.length - 1}`)

  const target = document.querySelector(".background");

  target.src = `images/backgrounds/${backgroundImages[idxBg]}`;


}







