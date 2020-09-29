"use strict";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getContent") {
    let content = "";
    if (
      window.document.getElementsByTagName("pre") &&
      window.document.getElementsByTagName("pre")[0]
    ) {
      content = window.document.getElementsByTagName("pre")[0].innerHTML;
    } else {
      content = window.document.body.innerHTML;
    }
    sendResponse(content);
  }

  return true;
});
