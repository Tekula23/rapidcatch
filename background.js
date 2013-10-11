chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
  chrome.pageAction.show(sender.tab.id);
  sendResponse({});
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if(changeInfo.status !== 'complete') return;
  if(tab.url.indexOf('www.ebay') === -1) return;
  chrome.tabs.executeScript(null, {file: 'jquery.js'});
  chrome.tabs.executeScript(null, {file: 'core.js'});
});

