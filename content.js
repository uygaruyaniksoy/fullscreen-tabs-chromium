var div = document.createElement("div");
div.className = "qweqweqwe";

document.body.appendChild(div);

chrome.runtime.onMessage.addListener(function(tabs) {
  if (tabs === "toggle") return;
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
      div.appendChild(ne);
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
      div.appendChild(ne);
    }
    chrome.tabs.getCurrent(function(t) {
      if (t.id === tab.id) {
        ne.style.backgroundColor = "#990000";
      }
    })
  });
})
