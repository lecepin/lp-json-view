"use strict";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getContent") {
    sendResponse(window.document.body.innerHTML);
  }

  return true;
});
