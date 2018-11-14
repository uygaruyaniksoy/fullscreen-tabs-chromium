let sendTabsToClient = () => {
  chrome.tabs.getAllInWindow(function(res) {
    chrome.tabs.query({}, function(tabs) {
      for (var i=0; i<tabs.length; ++i) {
        chrome.tabs.sendMessage(tabs[i].id, res);
      }
    });
  });
};

chrome.tabs.onUpdated.addListener(sendTabsToClient);
chrome.tabs.onRemoved.addListener(sendTabsToClient);
chrome.tabs.onCreated.addListener(sendTabsToClient);
chrome.tabs.onMoved.addListener(sendTabsToClient);
chrome.tabs.onDetached.addListener(sendTabsToClient);

chrome.runtime.onMessage.addListener(function(msg) {
  if (msg === "toggle") {
    chrome.tabs.query({}, function(tabs) {
      for (var i=0; i<tabs.length; ++i) {
        chrome.tabs.sendMessage(tabs[i].id, "toggle");
      }
    });
  }
})
