import React from "react";
import ReactDOM from "react-dom";
import ReactJson from "react-json-view";
import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      isErr: false,
    };
  }
  componentDidMount() {
    const url = new URL(window.location.href);
    const win =
      window.chrome.extension && window.chrome.extension.getBackgroundPage();
    const _this = this;

    this.setState({
      data: (win && win.data) || "",
    });

    if (!url.search.includes("view")) {
      window.chrome.tabs &&
        window.chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            if (!tabs) return;
            window.chrome.tabs.sendMessage(
              tabs[0].id,
              { action: "getContent" },
              function (response) {
                try {
                  if (response && JSON.parse(response)) {
                    win.data = response;
                    window.chrome.tabs.create({
                      url: "index.html?view",
                    });
                  }
                } catch (error) {
                  _this.setState({
                    isErr: true,
                  });
                }
              }
            );
          }
        );
    }

    url.search.includes("view") &&
      url.search.includes("parse") &&
      setTimeout(() => {
        this.setState({
          isErr: true,
        });
      }, 500);
  }

  render() {
    const { data, isErr } = this.state;
    const url = new URL(window.location.href);

    return (
      <div className="App">
        {url.search.includes("view") ? (
          <>
            <ReactJson
              src={JSON.parse(data || "{}")}
              iconStyle="square"
              indentWidth={2}
              displayDataTypes={false}
            />
            <img
              src="https://img.alicdn.com/tfs/TB1dawAWbr1gK0jSZFDXXb9yVXa-128-128.svg"
              className="view-parse"
              title="打开解析页面"
              onClick={() => {
                window.location.href = "index.html?parse";
              }}
            />
          </>
        ) : (
          ""
        )}
        {url.search.includes("parse") ? (
          <div className="parse-box">
            <div>
              <textarea
                className="parse-box-textarea"
                onChange={(e) => {
                  e.persist();

                  try {
                    let jsonData = JSON.parse(e.target.value);
                    this.setState({
                      data: jsonData,
                    });
                  } catch (error) {
                    this.setState({
                      data: 1,
                    });
                  }
                }}
              ></textarea>
            </div>
            <div>
              <ReactJson
                src={data || {}}
                iconStyle="square"
                indentWidth={2}
                displayDataTypes={false}
              />
            </div>
          </div>
        ) : (
          ""
        )}

        {isErr ? (
          <div className="App-err">
            <img src="https://img.alicdn.com/tfs/TB1Hfu9WbY1gK0jSZTEXXXDQVXa-128-128.svg" />
            <div>非 JSON 内容，无法使用</div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
