import gsap from 'gsap';

// #-------------------------------- Config ---------------------------------------------
const DURATION = 0.7;
const EASING = 'circ.easeInOut';

// #-----------------------------------------------------------------------------
// Text Animation Selectors
const slidesTitles = gsap.utils.toArray('.item_header');

// #-------------------------------- Slide Animation ---------------------------------------------

const nextBtn = document.querySelector('.next_button');
const prevBtn = document.querySelector('.previous_button');

// get the slides
const slides = gsap.utils.toArray('.slider_item');
const nextSlides = gsap.utils.toArray('.next_item');
const slidesLength = slides.length;

// variables declaration
let count = 0; // used to calculate the current index
let nextCount = 1; // used to calculate the next index

// The main slider variables
let currentIndex = count % slidesLength;
let previousIndex = slidesLength - 1;

// the side (next) slider variables
let nextCurrentIndex = nextCount % slidesLength;
let nextPreviousIndex = 0;

// timeline defaults

// 1) MAIN slider timeline
const tl = gsap.timeline({
  defaults: {
    duration: DURATION,
    // stagger: 0.2,
    // scrub: true,
    ease: EASING,
    overwrite: false,
  },
});

// 2) NEXT slider timeline
const tl2 = gsap.timeline({
  defaults: {
    duration: DURATION,
    // stagger: 0.2,
    // scrub: true,
    ease: EASING,
    overwrite: false,
  },
});

// 2) TEXT animation timeline
const tl3 = gsap.timeline({
  defaults: {
    duration: 0.4,
    // stagger: 0.2,
    // scrub: true,
    ease: EASING,
    overwrite: false,
  },
});

// SLIDE in/out functions --- Will be called inside the NEXT button handler
const slideIn = function (targetImg, nextImg) {
  gsap.set([targetImg, nextImg], {
    transformOrigin: '100% 100%',
  });

  tl.to(
    targetImg,
    {
      scaleX: 1,
      scaleY: 1,
    },
    '<.05'
  );

  tl2.to(
    nextImg,
    {
      scaleX: 1,
      scaleY: 1,
    },
    '<.05'
  );

  tl3.fromTo(
    slidesTitles[currentIndex],
    {
      y: '200%',
      opacity: 0,
    },
    {
      y: '0%',
      opacity: 1,
    }
  ),
    '<.05';
};

const slideOut = function (targetImg, nextImg) {
  gsap.set([targetImg, nextImg], {
    transformOrigin: '0% 0%',
  });

  tl.to(targetImg, {
    scaleX: 0,
    scaleY: 0,
  });

  tl2.to(nextImg, {
    scaleX: 0,
    scaleY: 0,
  });

  tl3.fromTo(
    slidesTitles[previousIndex],
    {
      y: '0%',
      opacity: 1,
    },
    {
      y: '-200%',
      opacity: 0,
    }
  );
};

// PREV in/out functions --- Will be called inside the PREVIOUS button handler

const prevIn = function (targetImg, nextImg) {
  gsap.set([targetImg, nextImg], {
    transformOrigin: '0% 0%',
  });

  tl.to(
    targetImg,
    {
      scaleX: 1,
      scaleY: 1,
    },
    '<.05'
  );

  tl2.to(
    nextImg,
    {
      scaleX: 1,
      scaleY: 1,
    },
    '<.05'
  );

  tl3.fromTo(
    slidesTitles[currentIndex],
    {
      y: '-200%',
      opacity: 0,
    },
    {
      y: '0%',
      opacity: 1,
    }
  ),
    '<.05';
};

const prevOut = function (targetImg, nextImg) {
  gsap.set([targetImg, nextImg], {
    transformOrigin: '100% 100%',
  });

  tl.to(targetImg, {
    scaleX: 0,
    scaleY: 0,
  });

  tl2.to(nextImg, {
    scaleX: 0,
    scaleY: 0,
  });

  tl3.fromTo(
    slidesTitles[currentIndex],
    {
      y: '0%',
      opacity: 1,
    },
    {
      y: '200%',
      opacity: 0,
    }
  );
};

// #-------------------------------- Hover Animation ---------------------------------------------

const nextHoverOverlay = document.querySelector('.slide-hover-overly');
const prevHoverOverlay = document.querySelector('.prev-hover-overlay');

const hoverInHandler = function (hoverOverlay) {
  gsap.set(hoverOverlay, {
    transformOrigin: '0% 0%',
  });

  gsap.to(hoverOverlay, {
    scaleX: 1,
    scaleY: 1,
    duration: 0.5,
    ease: 'circ.easeInOut',
  });
};

const hoverOutHandler = function (hoverOverlay) {
  gsap.set(hoverOverlay, {
    transformOrigin: '100% 100%',
  });

  gsap.to(hoverOverlay, {
    scaleX: 0,
    scaleY: 0,
    duration: 0.5,
    ease: 'circ.easeInOut',
  });
};

nextBtn.addEventListener('mouseover', () => {
  hoverInHandler(nextHoverOverlay);
});
nextBtn.addEventListener('mouseleave', () => {
  hoverOutHandler(nextHoverOverlay);
});

prevBtn.addEventListener('mouseover', () => {
  hoverInHandler(prevHoverOverlay);
});
prevBtn.addEventListener('mouseleave', () => {
  hoverOutHandler(prevHoverOverlay);
});

// #-----------------------------------------Handlers Logic---------------------------------------------------#

const nextBtnHandler = function (current) {
  // update current Index
  count = currentIndex + 1;
  nextCount = nextCurrentIndex + 1;
  currentIndex = Math.abs(count) % slidesLength;
  nextCurrentIndex = Math.abs(nextCount) % slidesLength;

  if (currentIndex === 0) {
    previousIndex = slidesLength - 1;
  } else {
    previousIndex = currentIndex - 1;
  }

  if (nextCurrentIndex === 0) {
    nextPreviousIndex = slidesLength - 1;
  } else {
    nextPreviousIndex = nextCurrentIndex - 1;
  }

  // slide out the current Image
  slideOut(slides[previousIndex], nextSlides[nextPreviousIndex]);
  slideIn(slides[currentIndex], nextSlides[nextCurrentIndex]);
};

// previous btn click handler
const prevBtnHandler = function (current) {
  prevOut(slides[currentIndex], nextSlides[nextCurrentIndex]);
  // update current Index
  count -= 1;
  nextCount -= 1;
  currentIndex = ((count % slidesLength) + slidesLength) % slidesLength;
  nextCurrentIndex = ((nextCount % slidesLength) + slidesLength) % slidesLength;

  // previousIndex = currentIndex - 1;

  if (currentIndex === 0) {
    previousIndex = slidesLength - 1;
  } else {
    previousIndex = currentIndex - 1;
  }

  if (nextCurrentIndex === 0) {
    nextPreviousIndex = slidesLength - 1;
  } else {
    nextPreviousIndex = nextCurrentIndex - 1;
  }

  prevIn(slides[currentIndex], nextSlides[nextCurrentIndex]);
};

// #-----------------------------------------Events Listening---------------------------------------------------#

nextBtn.addEventListener('click', () => {
  if (!tl.isActive()) {
    nextBtnHandler(currentIndex);
  }
});

prevBtn.addEventListener('click', () => {
  if (!tl.isActive()) {
    prevBtnHandler(previousIndex);
  }
});

slideIn(slides[0], nextSlides[1]);

// console.log('current:', currentIndex);
// console.log('prev', previousIndex);
// console.log('count', count);
// console.log('Next Count', nextCount);
// console.log('Next current:', nextCurrentIndex);
// console.log('Next prev', nextPreviousIndex);
