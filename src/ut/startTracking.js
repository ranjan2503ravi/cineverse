export const startTracking = () => {
  let step = 0;

  
  const sendMessage = (type, details) => {
    step++;
    window.parent.postMessage({
      step,
      type,
      details,
      time: new Date().toLocaleTimeString()
    }, "*");
  };

  
  document.addEventListener("click", (e) => {
    sendMessage("click", {
      tag: e.target.tagName,
      text: e.target.innerText?.slice(0, 30).trim() || ""
    });
  });

  
  let inputTimer; 

  document.addEventListener("input", (e) => {
    clearTimeout(inputTimer); 

    inputTimer = setTimeout(() => {
      sendMessage("input", {
        tag: e.target.tagName,
        value: e.target.value || ""
      });
    }, 500); 
  });

  
  let scrollTimer;

  document.addEventListener("scroll", () => {
    clearTimeout(scrollTimer);

    scrollTimer = setTimeout(() => {
      sendMessage("scroll", {
        y: window.scrollY
      });
    }, 300);
  });
};