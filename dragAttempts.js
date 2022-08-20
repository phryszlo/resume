
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
    offset = {x: 0, y: 0}
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

function pointerDown (event) {
    let [x, y] = [event.clientX, event.clientY];
    let drag_rect = drag_div.getBoundingClientRect();
    hit_rect = hit_div.getBoundingClientRect();
    if (hit_rect.hit(x, y)) {
        dragging = true;
        offset.x = x - drag_rect.x;
        offset.y = y - drag_rect.y;
        hit_div.style.backgroundColor = colors.down;
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
    hit_div.style.backgroundColor = colors.up;
}

init();







/*
  MDN version for drag_and_drop API
*/

// function dragstart_handler(ev) {
//   // Add the target element's id to the data transfer object
//   ev.dataTransfer.setData("text/plain", ev.target.id);
// }

window.addEventListener('DOMContentLoaded', () => {
  // Get the element by id
  const element = document.getElementById("terminal");
  // Add the ondragstart event listener
  element.addEventListener("dragstart", dragstart_handler);
});

function dragstart_handler(ev) {
  // Add different types of drag data
  ev.dataTransfer.setData("text/plain", ev.target.innerText);
  ev.dataTransfer.setData("text/html", ev.target.outerHTML);
  ev.dataTransfer.setData("text/uri-list", ev.target.ownerDocument.location.href);
}



/*
    EVERYTHING BELOW seems to be an oldskool attempt at dragging
    and though it logs the changing mouse positions
    it DOESN'T WORK
*/

let term = null;
var deltaX = 0, deltaY = 0, posInitX = 0, posInitY = 0;
var mouseIsDown = false;

// window.addEventListener('DOMContentLoaded', () => {
//   term = document.querySelector(".terminal");
//   term.addEventListener('mousedown', dragMouseDown);
//   document.onmouseup = closeDragElement;
//   term.onmousemove = elementDrag;
//   term.onmousedown = dragMouseDown;

// })

function dragMouseDown(e) {
  mouseIsDown = true;
  e = e || window.event;
  e.preventDefault();
  // get the mouse cursor position at startup:
  posInitX = e.clientX;
  posInitY = e.clientY;

  console.log(`click point: ${posInitX}, ${posInitY}`)
  // document.onmouseup = closeDragElement;
  // call a function whenever the cursor moves:
  // document.onmousemove = elementDrag;
}

function elementDrag(e) {
  if (!mouseIsDown) return;

  e = e || window.event;
  e.preventDefault();
  // calculate the new cursor position:
  deltaX = posInitX - e.clientX;
  deltaY = posInitY - e.clientY;
  posInitX = e.clientX;
  posInitY = e.clientY;
  // set the element's new position:

  // console.log(term);
  // return;
  term.style.top = posInitY + "px";
  term.style.left = posInitX + "px";

  console.log(`${term.style.top}, ${term.style.left}`);
}

function closeDragElement() {
  /* stop moving when mouse button is released:*/
  mouseIsDown = false;
  // document.onmouseup = null;
  // document.onmousemove = null;
}
