import React from "react";
import ReactDOM from "react-dom";
import ReactJson from "lp-rjv";
import parseJson from "jsonic";
import dragSvg from "./drag.svg";
import githubSvg from "./github.svg";
import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    if (
      window.location.href.indexOf("chrome-extension://") == 0 &&
      window.location.href.indexOf("?jump") > 0
    ) {
      window.chrome.tabs.create({ url: "index.html?parse" });
    }

    this.state = {
      data: "",
      showView: false,
      isJson: false,
      viewRaw: true,
      rjvKey: Date.now(),
      collapsed: false,
    };
    this.refEdit = null;
    this.isDragStart = false;
    this.dragStartX = 0;
    this.dragStartWidth = 0;
  }

  componentDidMount() {
    let content = "";
    this.el = null;

    // 取源码 JSON 字符
    if (
      window.document.getElementsByTagName("pre") &&
      window.document.getElementsByTagName("pre")[0]
    ) {
      content = window.document.getElementsByTagName("pre")[0].innerHTML;
      this.el = window.document.getElementsByTagName("pre")[0];
    } else if (document.body.childNodes && document.body.childNodes[0]) {
      content = document.body.childNodes[0].data;
      this.el = document.body.childNodes[0];
    }

    try {
      if (content.trimStart().indexOf("{") == 0 && JSON.parse(content)) {
        this.setState({
          data: content,
          isJson: true,
        });

        let _ = window?.chrome?.runtime?.sendMessage?.(
          {
            storage: {
              type: "get",
              key: "auto-show",
            },
          },
          (value) => {
            value && this.handleViewRawClick(!value);
          }
        );
      }
    } catch (error) {
      this.setState({
        isJson: false,
      });
    }
  }

  // 源码下 切视图
  handleViewRawClick(value) {
    if (this.state.viewRaw == value) {
      return;
    }
    if (value) {
      this.el = document.createElement("pre");
      this.el.style.cssText = "word-wrap: break-word; white-space: pre-wrap;";
      this.el.innerHTML = this.state.data;
      this.setState({
        showView: false,
      });
      document.body.insertBefore(
        this.el,
        document.getElementById("___lp-json-view-root")
      );
      document.body.appendChild(this.el);
    } else {
      try {
        this.el.remove();
      } catch (error) {}

      this.setState({
        showView: true,
      });
    }
    this.setState({
      viewRaw: value,
    });
  }

  handleTextAreaChange(e) {
    e.persist();

    try {
      let _value = e.target.value?.trim() || "";

      if (_value[0] != "{" || _value[_value.length - 1] != "}") {
        throw 0;
      }

      this.setState({
        data: parseJson(e.target.value),
        rjvKey: Date.now(),
      });
    } catch (error) {
      this.setState({
        data: {},
      });
    }
  }

  // 视图配置
  handleStatusChange(e) {
    e.persist();
    let value = false;

    if (e.target.value == "true") {
      value = true;
    } else if (e.target.value == "false") {
    } else {
      value = +e.target.value;
    }

    this.setState({ collapsed: value, rjvKey: Date.now() });
  }

  handleMouseMove(e) {
    if (!this.isDragStart) {
      return;
    }
    let _width = this.dragStartWidth + (e.clientX - this.dragStartX);

    if (_width > (document.body.offsetWidth / 3) * 2) {
      return;
    }
    _width = _width < 50 ? 0 : _width;

    this.refEdit.style.width = _width + "px";
  }

  handleMouseDown(e) {
    this.dragStartX = e.clientX;
    this.dragStartWidth = this.refEdit.clientWidth;
    this.isDragStart = true;
  }

  handleMouseUp(e) {
    this.isDragStart = false;
  }

  render() {
    const { data, showView, viewRaw, isJson, rjvKey, collapsed } = this.state;
    const url = new URL(window.location.href);

    return (
      <div
        className="___lp-json-view-App"
        onMouseMove={(e) => this.handleMouseMove(e)}
        onMouseUp={(e) => this.handleMouseUp(e)}
      >
        {/* 源码模式，点击 JSON 数据 按钮查看 */}
        {showView ? (
          <div className="___lp-json-view-App-view">
            <div className="___lp-json-view-App-status">
              展开状态：
              <select onChange={(e) => this.handleStatusChange(e)}>
                <option value="false">全部展开</option>
                <option value="true">全部折叠</option>
                <option value="1">展开1层</option>
                <option value="2">展开2层</option>
                <option value="3">展开3层</option>
              </select>
            </div>

            <div className="___lp-json-view-App-github">
              <img
                src="https://img.alicdn.com/imgextra/i2/O1CN01qhNDGF1un98WGeyIt_!!6000000006081-55-tps-128-128.svg"
                onClick={() => window.open("https://github.com/lecepin")}
              />
            </div>

            <ReactJson
              collapsed={collapsed}
              name={null}
              src={JSON.parse(data)}
              iconStyle="square"
              indentWidth={2}
              displayDataTypes={false}
            />
          </div>
        ) : null}

        {/* parse 下，非 插件模式 OR 插件页面下 显示 */}
        {url.search.includes("parse") &&
        (!window.chrome?.runtime?.id ||
          window.location.href.indexOf("chrome-extension://") == 0) ? (
          <div className="___lp-json-view-App-view">
            <div className="___lp-json-view-App-parse-box">
              <div
                className="___lp-json-view-App-parse-box-edit"
                ref={(_) => (this.refEdit = _)}
              >
                <textarea
                  className="___lp-json-view-App-parse-box-textarea"
                  onChange={(e) => this.handleTextAreaChange(e)}
                ></textarea>
              </div>
              <div
                className="___lp-json-view-App-parse-box-drag"
                onMouseDown={(e) => this.handleMouseDown(e)}
              >
                <img src={dragSvg} />
              </div>
              <div className="___lp-json-view-App-parse-box-view">
                <div className="___lp-json-view-App-status">
                  展开状态：
                  <select onChange={(e) => this.handleStatusChange(e)}>
                    <option value="false">全部展开</option>
                    <option value="true">全部折叠</option>
                    <option value="1">展开1层</option>
                    <option value="2">展开2层</option>
                    <option value="3">展开3层</option>
                  </select>
                </div>

                <div className="___lp-json-view-App-github">
                  <img
                    src={githubSvg}
                    onClick={() => window.open("https://github.com/lecepin")}
                  />
                </div>

                <ReactJson
                  key={rjvKey}
                  name={null}
                  src={data || {}}
                  iconStyle="square"
                  indentWidth={2}
                  displayDataTypes={false}
                  collapsed={collapsed}
                />
              </div>
            </div>
          </div>
        ) : null}

        {/* 源码 且 符合JSON 字符，显示按钮组 */}
        {(isJson && (
          <div className="___lp-json-view-App-switch">
            <div
              className={viewRaw ? "___lp-json-view-App-switch-active" : ""}
              onClick={() => this.handleViewRawClick(true)}
            >
              原始数据
            </div>
            <div
              className={!viewRaw ? "___lp-json-view-App-switch-active" : ""}
              onClick={() => this.handleViewRawClick(false)}
            >
              JSON数据
            </div>
          </div>
        )) ||
          null}
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  !window.chrome?.runtime?.id
    ? document.getElementById("___lp-json-view-root2")
    : document.getElementById("___lp-json-view-root")
);
