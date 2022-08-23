const config = {
  "auto-show": true,
};

chrome.runtime.onMessage.addListener(({ storage }, sender, sendResponse) => {
  if (storage) {
    if (storage.type == "get") {
      chrome.storage.local.get(storage.key, (store) => {
        sendResponse(
          store[storage.key] === undefined
            ? config[storage.key]
            : store[storage.key]
        );
      });
      return true;
    }
  }

  if (storage.type == "setAll") {
    const all = {};

    Object.keys(storage.value).map((key) => {
      all[key] = storage.value[key];
    });

    return chrome.storage.local.set(all, () => {});
  }
});
