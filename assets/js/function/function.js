let tl = gsap.timeline();

tl.from(".u-status-number", {
  duration: 0.75,
  y: 50,
  autoAlpha: 0,
  ease: Power3.out,
  stagger: 0.2,
}).from(
  ".u-navbar-item",
  {
    duration: 0.75,
    x: 300,
    autoAlpha: 0,
    ease: "elastic.out(1, 1)",
    stagger: {
      each: 0.75,
      amount: 0.5,
    },
  },
  "+=0.25"
)

function animateFrom(elem, direction) {
  direction = direction || 1;
  var x = 0,
      y = direction * 100;
  if(elem.classList.contains("gs_reveal_fromLeft")) {
    x = -100;
    y = 0;
  } else if (elem.classList.contains("gs_reveal_fromRight")) {
    x = 100;
    y = 0;
  }
  elem.style.transform = "translate(" + x + "px, " + y + "px)";
  elem.style.opacity = "0";
  gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
    duration: 1.25, 
    x: 0,
    y: 0, 
    autoAlpha: 1, 
    ease: "expo", 
    overwrite: "auto"
  });
}

function hide(elem) {
  gsap.set(elem, {autoAlpha: 0});
}

document.addEventListener("DOMContentLoaded", function() {
  gsap.registerPlugin(ScrollTrigger);
  
  gsap.utils.toArray(".gs_reveal").forEach(function(elem) {
    hide(elem); // assure that the element is hidden when scrolled into view
    
    ScrollTrigger.create({
      trigger: elem,
      onEnter: function() { animateFrom(elem) }, 
      onEnterBack: function() { animateFrom(elem, -1) },
      onLeave: function() { hide(elem) } // assure that the element is hidden when scrolled into view
    });
  });
});

// animate main title
let dataText = ["Abdukarim Mirzayev"];
function typeWriter(text, i, fnCallback) {
  if (i < text.length) {
    document.querySelector(".main-title").innerHTML =
      text.substring(0, i + 1) +
      '<span id="main-text" aria-hidden="true"></span>';
    setTimeout(function () {
      typeWriter(text, i + 1, fnCallback);
    }, 100);
  } else if (typeof fnCallback == "function") {
    setTimeout(fnCallback, 700);
  }
}
function StartTextAnimation(i) {
  if (typeof dataText[i] == "undefined") {
    setTimeout(function () {
      StartTextAnimation(0);
    }, 20000);
  }
  if (i < dataText[i].length) {
    typeWriter(dataText[i], 0, function () {
      StartTextAnimation(i + 1);
    });
  }
}
StartTextAnimation(0);
