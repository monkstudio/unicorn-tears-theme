
//these are enqueued from a cdn in functions, except for split text which is part of club greensock
// import { gsap } from "./vendor/gsap";
// import { ScrollTrigger } from "./vendor/gsap/ScrollTrigger";
import { SplitText } from "./vendor/gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);


const headings = document.querySelectorAll("h1, .skew");
const fadesTop = document.querySelectorAll(".fadein-top, .wp-block-column");
const fadesBottom = document.querySelectorAll(".fadein-bottom");
const fadesLeft = document.querySelectorAll(".fadein-left");
const fadesRight = document.querySelectorAll(".fadein-right");
const fadeIn = document.querySelectorAll(".fadein, h3, .wp-block-image");
const separators = document.querySelectorAll("hr");

function setupSplits() {

  headings.forEach(heading => {
    // Reset if needed
    if (heading.anim) {
      heading.anim.progress(1).kill();
      heading.split.revert();
    }

    const split = new SplitText(heading, {
      type: "lines,words,chars",
      linesClass: "split-line"
    });
    // Set up the anim
    gsap.from(split.lines, {
      scrollTrigger: {
        toggleActions: "restart pause resume reverse",
        trigger: heading,
        start: 'top 100%',
      },
      duration: 1,
      yPercent: 100,
      ease: 'power2.out',
      skewY: .1,
      skewX: 0,
      rotationX:180,
      stagger: 0.1,
      autoAlpha: 0,
      delay: .2
    })
    gsap.to(heading, {
      yPercent: 0,
      skewY: 0,
      skewX:0,
      rotationX:0,
      ease: 'circ.out',
      duration:1,
      transformOrigin: "0% 100%",
      autoAlpha: 1
    });

    //chars
    // gsap.from(split.chars, {
    //   scrollTrigger: {
    //     toggleActions: "restart pause resume reverse",
    //     trigger: heading,
    //     start: 'top 100%',
    //   },
    //   duration: .7,
    //   yPercent: 100,
    //   ease: "power1",
    //   skewY: 3,
    //   stagger: 0.03,
    //   autoAlpha: 0
    // })
    // gsap.to(heading, {
    //   y: 0,
    //   ease: "circ.out",
    //   duration: .7,
    //   autoAlpha: 1
    // });
  });



  // labels.forEach(label => {
  //   if (label.anim) {
  //     label.anim.progress(1).kill();
  //     label.split.revert();
  //   }
  //   const tl = gsap.timeline({
  //     // yes, we can add it to an entire timeline!
  //     scrollTrigger: {
  //       trigger: label,
  //       start: "top 100%", // when the top of the trigger hits the top of the viewport
  //       end: "+=5000", // end after scrolling 500px beyond the start
  //       ease: "power2.easeOut",
  //       toggleActions: "restart pause resume reverse",
  //     }
  //   });

  //   tl.from(label, {
  //       scrollTrigger: {
  //         trigger: label,
  //         start: "top 100%", // when the top of the trigger hits the top of the viewport
  //         end: "+=5000", // end after scrolling 500px beyond the start
  //         ease: "power2.easeOut",
  //         toggleActions: "restart pause resume reverse",
  //       },
  //       duration: 1,
  //       ease: "power2.easeOut",
  //       y: 100,
  //     })
  //     .to(label, {
  //       autoAlpha: 1,
  //       y: 0,
  //       duration: 1,
  //     })
  // });


  // emphasis.forEach(emphasis => {
  //   // Reset if needed
  //   if (emphasis.anim) {
  //     emphasis.anim.progress(1).kill();
  //     emphasis.split.revert();
  //   }

  //   const split = new SplitText(emphasis, {
  //     type: "lines,words,chars",
  //     linesClass: "split-line"
  //   });

  //   // Set up the anim
  //   gsap.from(split.chars, {
  //     scrollTrigger: {
  //       toggleActions: "restart pause resume reverse",
  //       trigger: emphasis,
  //       start: 'top 100%',
  //     },
  //     duration: 2,
  //     yPercent: 100,
  //     ease: 'power3.out',
  //     skewY: 3,
  //     skewX: 1,
  //     stagger: 0.05,
  //     autoAlpha: 0,
  //     delay: 1
  //   })
  //   gsap.to(emphasis, {
  //     y: 0,
  //     ease: "circ.out",
  //     duration: 2,
  //     autoAlpha: 1,
  //     delay: 1
  //   });
  // });


  fadesTop.forEach(fade => {
    if (fade.anim) {
      fade.anim.progress(1).kill();
      fade.split.revert();
    }
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: fade,
        start: "top 100%",
        toggleActions: "restart pause resume reverse",
      }
    });

    tl.fromTo(fade, {
      opacity: 0,
      y: -50,
      duration: 1
    }, {
      opacity: 1,
      duration: 1,
      autoAlpha: 1,
      y: 0,
      delay:.3
    });
  });

  fadesBottom.forEach(fade => {
    if (fade.anim) {
      fade.anim.progress(1).kill();
      fade.split.revert();
    }
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: fade,
        start: "top 100%",
        toggleActions: "restart pause resume reverse",
      }
    });

    tl.fromTo(fade, {
      opacity: 0,
      y: 100,
    }, {
      opacity: 1,
      duration: 1,
      autoAlpha: 1,
      y: 0,
      delay: 0.5
    });
  });

  fadesLeft.forEach(fade => {
    if (fade.anim) {
      fade.anim.progress(1).kill();
      fade.split.revert();
    }
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: fade,
        start: "top 100%",
        toggleActions: "restart pause resume reverse",
      }
    });

    tl.fromTo(fade, {
      opacity: 0,
      x: 100,
    }, {
      opacity: 1,
      duration: 1,
      autoAlpha: 1,
      x: 0,
      delay: 0.5
    });
  });


  fadesRight.forEach(fade => {
    if (fade.anim) {
      fade.anim.progress(1).kill();
      fade.split.revert();
    }
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: fade,
        start: "top 100%",
        toggleActions: "restart pause resume reverse",
      }
    });

    tl.fromTo(fade, {
      opacity: 0,
      x: -100,
    }, {
      opacity: 1,
      duration: 1,
      autoAlpha: 1,
      x: 0,
      delay: 0.5
    });
  });

  fadeIn.forEach(fadein => {
    if (fadein.anim) {
      fadein.anim.progress(1).kill();
      fadein.split.revert();
    }
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: fadein,
        start: "top 100%",
        toggleActions: "restart pause resume reverse",
      }
    });

    tl.fromTo(fadein, {
      opacity: 0,
    }, {
      opacity: 1,
      duration: 1,
      autoAlpha: 1,
      delay: 0.5
    });
  });

  separators.forEach(separator => {
    if (separator.anim) {
      separator.anim.progress(1).kill();
      separator.split.revert();
    }
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: separator,
        start: "top bottom",
        toggleActions: "restart pause resume reverse",
      }
    });

    tl.fromTo(separator, {
      width: 0,
      duration: 1
    }, {
      duration: 1,
      autoAlpha: 1,
      width: '100%'
    });
  });

  // gsap.to(".img-wrapper > img", {
  //   y: -100,
  //   duration: 1,
  //   ease: "none",
  //   scrollTrigger: {
  //     trigger: ".img-wrapper > img",
  //     // start: "top bottom", // the default values
  //     // end: "bottom top",
  //     scrub: true
  //   },
  // });
}

ScrollTrigger.addEventListener("scroll", setupSplits);
setupSplits();




//hovery images
// const pressImage = document.querySelectorAll(".press .img-wrapper");
// const pos = {
//   x: window.innerWidth / 2,
//   y: window.innerHeight / 2
// };
// const mouse = {
//   x: pos.x,
//   y: pos.y
// };
// const speed = 0.35;

// const xSet = gsap.quickSetter(pressImage, "x", "px");
// const ySet = gsap.quickSetter(pressImage, "y", "px");

// window.addEventListener("mousemove", e => {
//   mouse.x = e.x / 6;
//   mouse.y = e.y / 10;
// });

// gsap.ticker.add(() => {

//   // adjust speed for higher refresh monitors
//   const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());

//   pos.x += (mouse.x - pos.x) * dt;
//   pos.y += (mouse.y - pos.y) * dt;
//   xSet(pos.x);
//   ySet(pos.y);
// });
