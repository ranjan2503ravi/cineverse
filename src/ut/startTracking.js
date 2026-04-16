export const startTracking = () => {

  let step = 0;

  // CLICK TRACKING
  document.addEventListener("click", (e) => {
    step++;

    window.parent.postMessage({
      step,
      type: "click",
      details: {
        tag: e.target.tagName,
        text: e.target.innerText?.slice(0, 30) || ""
      },
      time: new Date().toLocaleTimeString()
    }, "*");
  });

  // INPUT TRACKING (DEBOUNCE)
  let timer;

  document.addEventListener("input", (e) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      step++;

      window.parent.postMessage({
        step,
        type: "input",
        details: {
          tag: e.target.tagName,
          value: e.target.value || ""
        },
        time: new Date().toLocaleTimeString()
      }, "*");
    }, 500);
  });

  // SCROLL TRACKING (throttle style)
  let scrollTimer;

  document.addEventListener("scroll", () => {
    clearTimeout(scrollTimer);

    scrollTimer = setTimeout(() => {
      step++;

      window.parent.postMessage({
        step,
        type: "scroll",
        details: {
          y: window.scrollY
        },
        time: new Date().toLocaleTimeString()
      }, "*");
    }, 300);
  });

};