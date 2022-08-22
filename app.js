import resume from './resume.js';
import backgroundImages from './backgroundImages.js';

const summary = resume.summary;
const workHistory = resume.workHistory;
const schoolHistory = resume.schoolHistory;


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


      // and then add the event listeners
      document.querySelector(".arrow.school").addEventListener("click", displayNextSchoolHistoryItem);
      document.querySelector(".arrow.work").addEventListener("click", displayNextWorkHistoryItem);
      document.querySelector(".change-color").addEventListener("click", cycleBackgroundImages);

    });

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


// Background Images index
let idxBg = 0;

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







