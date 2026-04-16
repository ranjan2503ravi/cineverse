export const startTracking = () => {

  // CLICK TRACKING
  document.addEventListener("click", (e) => {
    window.parent.postMessage({
      type: "click",
      details: {
        tag: e.target.tagName,
        text: e.target.innerText?.slice(0, 30) || ""
      },
      time: new Date().toLocaleTimeString()
    }, "*");
  });

  // INPUT TRACKING
  document.addEventListener("input", (e) => {
    window.parent.postMessage({
      type: "input",
      details: {
        tag: e.target.tagName,
        value: e.target.value?.slice(0, 30) || ""
      },
      time: new Date().toLocaleTimeString()
    }, "*");
  });

};