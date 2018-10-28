import React, { useReducer, useContext, useCallback } from "react";

const EditorDispatch = React.createContext(null);

export const EditorDispatchProvider = EditorDispatch.Provider;

export const INIT = "INIT";
export const PATCH = "PATCH";

function reducer(state, action) {
  switch (action.type) {
    case INIT: {
      const config = action.payload;
      return {
        config,
        editorCode: config.code,
        editorSteps: config.steps
      };
    }
    case PATCH: {
      const newConfig = { ...state.config, ...action.payload };
      if (newConfig.autoHeight) {
        const loc = newConfig.code.split("\n").length;
        const lineHeight = 15.5;
        const extraHeight = 35.5;
        newConfig.height = Math.ceil(loc * lineHeight + extraHeight);
      }
      return { ...state, config: newConfig };
    }
  }
}

export function useEditorState(initialConfig) {
  const initialAction = {
    type: INIT,
    payload: initialConfig
  };
  const [state, dispatch] = useReducer(reducer, {}, initialAction);
  //TODO remove
  const change = useCallback(
    payload => {
      dispatch({ type: PATCH, payload });
    },
    [dispatch]
  );

  return [state.config, change];
}

export function useEditorDispatch(actionType) {
  const dispatch = useContext(EditorDispatch);
  const dispatchAction = useCallback(
    payload => {
      dispatch({ type: actionType, payload });
    },
    [actionType, dispatch]
  );
  return dispatchAction;
}
