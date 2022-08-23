const domConfigForm = document.getElementById("config-form");
const domSaveBtn = document.getElementById("save-btn");

init();

domSaveBtn.addEventListener("click", () => {
  const result = {};
  Array.from(domConfigForm.getElementsByTagName("input")).map((item) => {
    if (item.type == "checkbox") {
      return (result[item.name] = item.checked);
    }
    result[item.name] = item.value;
  });

  alert("保存成功");

  chrome.runtime.sendMessage({
    storage: {
      type: "setAll",
      value: result,
    },
  });
});

function init() {
  chrome.runtime.sendMessage(
    {
      storage: {
        type: "get",
        key: "auto-show",
      },
    },
    (value) => {
      document.querySelector('[name="auto-show"]').checked = value;
    }
  );
}
