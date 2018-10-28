import React, { memo, useMemo } from "react";
import Color from "color";
import CodeSurfer from "code-surfer";
import { LeftArrow, RightArrow } from "./icons";
import { useBoundedCounter } from "../utils/hooks";

function CodeSurferContainer(props) {
  const { code, showNumbers, lang, theme, steps, width, height } = props;
  const stepList = useMemo(() => steps.split("\n"), [steps]);

  const [stepIndex, prevStep, nextStep] = useBoundedCounter({
    defaultValue: 0,
    minValue: 0,
    maxValue: stepList.length - 1
  });
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === stepList.length - 1;
  const [step, notes] = stepList[stepIndex].split(">");

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
          prevStep();
          e.preventDefault();
        }
        if (e.keyCode === 39) {
          nextStep();
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
          onClick={prevStep}
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
          onClick={nextStep}
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

export default memo(CodeSurferContainer);
