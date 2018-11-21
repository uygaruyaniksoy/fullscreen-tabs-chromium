var iFrame  = document.createElement("iframe");
iFrame.src  = chrome.extension.getURL ("content.html");
iFrame.style.width="100%";
iFrame.style.height="20px";
iFrame.style.backgroundColor="black";
iFrame.style.position="fixed";
chrome.storage.sync.get(function (data) { iFrame.style.height = data.show ? "20px" : "0px"; });
iFrame.style.zIndex="9999";
iFrame.style.borderWidth="0";
iFrame.style.padding="0";
iFrame.style.top="0";
iFrame.style.left="0";


document.addEventListener('keypress', (event) => {
  const keyName = event.key;
  if (event.key === "ı") {
    var show;
    chrome.storage.sync.get(function (data) {
      show = data.show || false;
      chrome.storage.sync.set({"show": !show }, () => chrome.runtime.sendMessage("toggle"));
    });
  } else {
    chrome.runtime.sendMessage(event.key);
  }
   //console.log(event);
});

document.body.insertBefore(iFrame, document.body.firstChild);

chrome.runtime.onMessage.addListener(function(msg) {
  if (msg === "toggle") {
    chrome.storage.sync.get(function (data) {
      iFrame.style.height = data.show ? "20px" : "0px";
    });
  }
})
