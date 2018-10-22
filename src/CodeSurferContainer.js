import React from "react";
import Color from "color";
import CodeSurfer from "code-surfer";
import { LeftArrow, RightArrow } from "./icons";

class CodeSurferContainer extends React.Component {
  state = {
    index: 0
  };

  prevStep = () =>
    this.setState(({ index }) => ({ index: Math.max(index - 1, 0) }));
  nextStep = () => this.setState(({ index }) => ({ index: index + 1 }));

  render() {
    const { code, showNumbers, lang, theme, steps, width, height } = this.props;
    const stepList = steps.split("\n");
    const index = Math.min(this.state.index, stepList.length - 1);
    const isFirstStep = index === 0;
    const isLastStep = index === stepList.length - 1;
    const [step, notes] = stepList[index].split(">");
    return (
      <div
        style={{
          background: theme.plain.backgroundColor,
          border: `1px solid ${Color(theme.plain.color).fade(0.5)}`,
          borderRadius: "3px",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          height: "100%"
        }}
        tabIndex="0"
        onKeyDown={e => {
          if (e.keyCode === 37) {
            this.prevStep();
            e.preventDefault();
          }
          if (e.keyCode === 39) {
            this.nextStep();
            e.preventDefault();
          }
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
            onClick={this.prevStep}
            style={{
              cursor: "pointer",
              height: "16px",
              flex: 1,
              textAlign: "left"
            }}
          >
            {isFirstStep || <LeftArrow />}
          </span>
          <span>{notes}</span>
          <span
            onClick={this.nextStep}
            style={{
              cursor: "pointer",
              height: "16px",
              flex: 1,
              textAlign: "right"
            }}
          >
            {isLastStep || <RightArrow />}
          </span>
        </div>
      </div>
    );
  }
}

export default CodeSurferContainer;
