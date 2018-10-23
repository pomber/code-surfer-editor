import React from "react";
import toIframe from "./to-iframe";

const getShareableUrl = () => {
  return window.location.origin + "/i" + window.location.pathname;
};

const copyToClipboard = text => {
  navigator.clipboard.writeText(text);
};

class SharePanel extends React.Component {
  render() {
    const oembedUrl = getShareableUrl();
    const { height, width } = this.props.config;
    const iframe = toIframe({ url: oembedUrl, height, width });
    return (
      <div
        style={{
          position: "absolute",
          width: "300px",
          top: "6px",
          right: "0px",
          background: "#fafafa",
          zIndex: 20,
          padding: "15px",
          color: "#222"
        }}
      >
        <p>oEmbed Link (Medium):</p>
        <div
          style={{
            display: "flex"
          }}
        >
          <input value={oembedUrl} readOnly style={{ flex: 1 }} />
          <button onClick={() => copyToClipboard(oembedUrl)}>Copy</button>
        </div>
        <p>Iframe:</p>
        <textarea
          readOnly
          value={iframe}
          style={{ width: "100%", height: "100px" }}
        />
        <button onClick={() => copyToClipboard(iframe)}>Copy</button>
      </div>
    );
  }
}

class ShareButton extends React.Component {
  state = {
    active: false
  };
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button onClick={e => this.setState({ active: !this.state.active })}>
          Share <span aria-hidden>▾</span>
        </button>
        <div style={{ position: "relative", height: 0 }}>
          {this.state.active && <SharePanel {...this.props} />}
        </div>
      </div>
    );
  }
}

export default ShareButton;
