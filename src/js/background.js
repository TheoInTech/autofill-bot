chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.id);
});

chrome.runtime.onInstalled.addListener(details => {
  // only run the following section on install and on update
  if (details.reason.match(/install|update/)) {
    chrome.storage.sync.set(
      { is_auto: false, sent: 0, votes: 450 },
      function() {}
    );
  }
});
