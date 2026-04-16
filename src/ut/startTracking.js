export const startTracking = () => {

  
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

  
  let timer;

  document.addEventListener("input", (e) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      window.parent.postMessage({
        type: "input",
        details: {
          tag: e.target.tagName,
          value: e.target.value || ""
        },
        time: new Date().toLocaleTimeString()
      }, "*");
    }, 500);
  });

};