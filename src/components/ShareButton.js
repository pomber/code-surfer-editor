import React from "react";
import toIframe from "../utils/to-iframe";
import { useToggle } from "../utils/hooks";

const getShareableUrl = () => {
  return window.location.origin + "/i" + window.location.pathname;
};

const copyToClipboard = text => {
  navigator.clipboard.writeText(text);
};

function SharePanel(props) {
  const oembedUrl = getShareableUrl();
  const { height, width } = props.config;
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

function ShareButton(props) {
  const [active, toggle] = useToggle(false);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <button onClick={toggle}>
        Share <span aria-hidden>▾</span>
      </button>
      <div style={{ position: "relative", height: 0 }}>
        {active && <SharePanel {...props} />}
      </div>
    </div>
  );
}

export default ShareButton;
