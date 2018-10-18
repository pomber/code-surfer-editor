import React from "react";
import Color from "color";
import CodeSurfer from "code-surfer";
import { LeftArrow, RightArrow } from "./icons";

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
          borderRadius: "3px",
          maxHeight: height,
          height: "100%",
          width: "100%",
          maxWidth: width,
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box"
        }}
      >
        <div
          style={{
            flex: 1,
            padding: "0px 7px",
            overflow: "hidden"
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
