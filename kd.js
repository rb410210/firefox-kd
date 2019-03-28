browser.contextMenus.create({
  id: "pushToKodiLink",
  title: "Push to Kodi",
  contexts: ["link"]
});


function onResponse(response) {
  console.log("Received " + response);
  browser.tabs.executeScript({
    file: "passive.js"
  });

}

function onError(error) {
  console.log(`Error: `, error);
  browser.tabs.executeScript({
    file: "passive.js"
  });
}

browser.contextMenus.onClicked.addListener(function(info, tab) {
  if (info && info.menuItemId === 'pushToKodiLink') {
    console.log("Push website to kodi", info.linkUrl);

    browser.tabs.executeScript({
      file: "active.js"
    });

    var sending = browser.runtime.sendNativeMessage("firefox_kd_native",
      info.linkUrl);
    sending.then(onResponse, onError);
  }
});
