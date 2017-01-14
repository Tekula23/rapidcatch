(function () {

  var activeTabUrl = null;
  chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
    jQuery.post("https://rapidcatch.com/platform/offer/place/",{ "ItemID": activeTabUrl, "OfferPrice": request.price }, function (data) {
      // Once popup has been closed, the notiication will appear
      try {
        sendResponse(data);
      } catch(err) {
        console.log("popup");
        chrome.notifications.create({
          type: "basic",
          title: "Rapidcatch",
          message: chrome.i18n.getMessage("request_status_" + data.message),
          iconUrl: "icon.popup.png"
        });
      }
    });
  });

  // Method to enable and disable browser action icon
  var tabsUpdateCallback = function (tabId, changeInfo, tab) {
    chrome.tabs.getSelected(null, function (tab) {
      activeTabUrl = tab.url;
      if(/[^\w](ebay\.|aukro\.|allegro\.|delcampe\.net|meshok\.net|newauction\.|newmolot\.ru|ay\.by|ebid\.net|skylots\.org|auction\.violity\.com).+\d{5,15}/i.test(tab.url)) {
        chrome.browserAction.enable();
        chrome.browserAction.setIcon({path: "icon.active.16.png"});
      } else {
        chrome.browserAction.disable();
        chrome.browserAction.setIcon({path: "icon.inactive.16.png"});
      }
    });
  }

  chrome.tabs.onUpdated.addListener(tabsUpdateCallback);
  chrome.tabs.onActivated.addListener(tabsUpdateCallback);

})()
