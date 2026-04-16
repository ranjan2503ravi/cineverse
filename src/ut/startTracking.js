
let step = 0;

export const startTracking = () => {
  const sendMessage = (type, details) => {
    step++;
    window.parent.postMessage({
      step,
      type,
      details,
      time: new Date().toLocaleTimeString()
    }, "*");
  };

  
  const handleClick = (e) => {
    sendMessage("click", {
      tag: e.target.tagName,
      text: e.target.innerText?.slice(0, 30).trim() || ""
    });
  };

  let inputTimer;
  const handleInput = (e) => {
    clearTimeout(inputTimer);
    inputTimer = setTimeout(() => {
      sendMessage("input", {
        tag: e.target.tagName,
        value: e.target.value || ""
      });
    }, 500);
  };

  let scrollTimer;
  const handleScroll = () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      sendMessage("scroll", { y: window.scrollY });
    }, 300);
  };

  
  document.addEventListener("click", handleClick);
  document.addEventListener("input", handleInput);
  document.addEventListener("scroll", handleScroll);

  
  return () => {
    document.removeEventListener("click", handleClick);
    document.removeEventListener("input", handleInput);
    document.removeEventListener("scroll", handleScroll);
  };
};