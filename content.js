var div = document.createElement("div");
div.className = "qweqweqwe";
document.body.appendChild(div);

var self = {};
var highlight = 0;
chrome.tabs.getCurrent((i) => {
  self = i;
  highlight = self.index;
});

var lastTabs = [];
chrome.runtime.onMessage.addListener(function(tabs, sender) {
  if (tabs === "toggle") return;
  if (typeof(tabs) === "string") {
    if (sender.tab.id === self.id) {
      var key = tabs;
      if (key === "ğ") highlight--;
      if (key === "ü") highlight++;
      if (key === "Enter") {
        chrome.tabs.update(lastTabs[highlight].id, {selected: true});
        return
      }
    }
  } else {
    lastTabs = tabs;
    chrome.tabs.getCurrent((i) => {
      self = i;
      highlight = self.index;
    });
  }
  console.log(highlight);
  tabs = lastTabs;

  console.log(tabs);
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
  tabs.forEach((tab) => {
    var ne;
    if (tab.favIconUrl) {
      ne = document.createElement("img");
      ne.src = tab.favIconUrl;
      ne.style.width = "20px";
      ne.style.height = "20px";
    } else {
      ne = document.createElement("div");
      ne.style.width = "20px";
      ne.style.height = "20px";
      ne.style.textAlign = "center";
      ne.style.color = "white";
      ne.style.verticalAlign = "bottom";
      ne.style.display = "inline-block";
      ne.style.display = "inline-block";
      ne.innerText = "" + tab.title[0];
    }
    div.appendChild(ne);
    if (self.id === tab.id) {
      ne.style.backgroundColor = "#990000";
    } else if (highlight === tab.index) {
      ne.style.backgroundColor = "#000088";
    }
  });
  var te = document.createElement("div")
  te.className = "title"
  te.style.height = "20px";
  te.style.textAlign = "center";
  te.style.color = "white";
  te.style.verticalAlign = "bottom";
  te.style.display = "inline-block";
  te.style.display = "inline-block";
  te.innerText = "" + tabs[highlight].title;
  div.appendChild(te);
})
