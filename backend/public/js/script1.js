'use strict';



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * PRELOADER
 * 
 * preloader will be visible until document load
 */

const preloader = document.querySelector("[data-preloader]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * MOBILE NAVBAR
 * 
 * show the mobile navbar when click menu button
 * and hidden after click menu close button or overlay
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNav = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNav);



/**
 * HEADER & BACK TOP BTN
 * 
 * active header & back top btn when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElementOnScroll = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

window.addEventListener("scroll", activeElementOnScroll);



/**
 * SCROLL REVEAL
 */

const revealElements = document.querySelectorAll("[data-reveal]");

const revealElementOnScroll = function () {
  for (let i = 0, len = revealElements.length; i < len; i++) {
    if (revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.15) {
      revealElements[i].classList.add("revealed");
    } else {
      revealElements[i].classList.remove("revealed");
    }
  }
}

window.addEventListener("scroll", revealElementOnScroll);

window.addEventListener("load", revealElementOnScroll);

const data = [
  {state:"Andhra Pradesh", cases:323},
  {state:"Arunachal Pradesh", cases:3},
  {state:"Assam", cases:213},
  {state:"Bihar", cases:145},
  {state:"Chandigarh", cases:18},
  {state:"Chhattisgarh", cases:242},
  {state:"Delhi", cases:4137},
  {state:"Goa", cases:29},
  {state:"Gujarat", cases:3677},
  {state:"Haryana", cases:671},
  {state:"Himachal Pradesh", cases:9},
  {state:"Jammu & Kashmir", cases:168},
  {state:"Jharkhand", cases:81},
  {state:"Karnataka", cases:2985},
  {state:"Kerala", cases:8734},
  {state:"Ladakh", cases:5},
  {state:"Madhya Pradesh", cases:343},
  {state:"Maharashtra", cases:2718},
  {state:"Manipur", cases:366},
  {state:"Meghalaya", cases:1},
  {state:"Mizoram", cases:39},
  {state:"Nagaland", cases:3},
  {state:"Odisha", cases:176},
  {state:"Puducherry", cases:128},
  {state:"Punjab", cases:273},
  {state:"Rajasthan", cases:831},
  {state:"Sikkim", cases:287},
  {state:"Tamil Nadu", cases:1223},
  {state:"Telangana", cases:33},
  {state:"Tripura", cases:31},
  {state:"Uttarakhand", cases:125},
  {state:"Uttar Pradesh", cases:1173},
  {state:"West Bengal", cases:1175}
];

function getPrecaution(cases){
  if(cases > 4500) 
    return "⚠️ High risk! Stay alert, wear mask, maintain hygiene, avoid crowded places, sanitize hands regularly, monitor symptoms, and consult a doctor if unwell.";
  if(cases > 500) 
    return "⚠️ Moderate risk! Be cautious, wear mask in public areas, avoid crowded places, keep distance, practice good hand hygiene, stay informed about updates, and get tested if feeling sick.";
  return "✅ Low risk! Stay safe by maintaining regular hygiene, washing hands frequently, wearing mask in crowded areas, staying aware of local health advisories, and encouraging family and friends to follow precautions.";
}


let index = 0;
const marqueeText = document.getElementById('marquee-text');
const containerWidth = document.getElementById('marquee-container').offsetWidth;

function showNextState(){
  const {state, cases} = data[index];
  const precaution = getPrecaution(cases);
  const content = `🦠 State: ${state} | Total Cases (Aug–Sep): ${cases} | ${precaution}`;
  
  marqueeText.innerText = content;

  // Reset position to right outside container
  marqueeText.style.transition = 'none';
  marqueeText.style.left = containerWidth + 'px';

  // Wait a frame, then start sliding
  requestAnimationFrame(() => {
    const textWidth = marqueeText.offsetWidth;
    const distance = containerWidth + textWidth;
    const speed = 0.10; // pixels per ms, adjust for faster/slower
    const duration = distance / speed;

    marqueeText.style.transition = `left ${duration}ms linear`;
    marqueeText.style.left = -textWidth + 'px';

    // Move to next after current slide finishes
    setTimeout(()=>{
      index = (index + 1) % data.length;
      showNextState();
    }, duration);
  });
}

// Start marquee
showNextState();