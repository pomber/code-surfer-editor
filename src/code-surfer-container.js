import React from "react";
import Color from "color";
import CodeSurfer from "code-surfer";

const LeftArrow = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 1792 1792"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z" />
  </svg>
);
const RightArrow = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 1792 1792"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z" />
  </svg>
);

class CodeSurferContainer extends React.Component {
  state = {
    index: 0
  };
  render() {
    const { code, showNumbers, lang, theme, steps, width, height } = this.props;
    const { index } = this.state;
    const stepList = steps.split("\n");
    const isFirstStep = index === 0;
    const isLastStep = index === stepList.length - 1;
    const [step, notes] = stepList[index].split(">");
    return (
      <div
        style={{
          background: theme.plain.backgroundColor,
          border: `1px solid ${Color(theme.plain.color).fade(0.5)}`,
          borderRadius: "3px"
        }}
      >
        <div
          style={{
            height: height,
            width: width,
            padding: "2px 7px"
          }}
        >
          <CodeSurfer
            code={code}
            showNumbers={showNumbers}
            lang={lang}
            theme={theme}
            key={theme.name + width + height}
            step={step}
          />
        </div>
        <div
          style={{
            padding: "7px 7px",
            color: Color(theme.plain.color).fade(0.1),
            borderTop: `1px solid ${Color(theme.plain.color).fade(0.9)}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <span
            onClick={() => this.setState({ index: this.state.index - 1 })}
            style={{ cursor: "pointer", height: "16px" }}
          >
            {isFirstStep || <LeftArrow />}
          </span>
          <span>{notes}</span>
          <span
            onClick={() => this.setState({ index: this.state.index + 1 })}
            style={{ cursor: "pointer", height: "16px" }}
          >
            {isLastStep || <RightArrow />}
          </span>
        </div>
      </div>
    );
  }
}

export default CodeSurferContainer;
