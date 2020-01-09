import { Dispatch } from "./useDispatch";
import { useState, useMemo } from "react";
import constate from "constate";

interface State {
  dispatch: Dispatch;
}

export const initial: State = {
  dispatch: () => {
    console.warn(
      "dispatch has not been initialized, please not use dispatch before mounted!"
    );
  }
};

const useDispatch = () => {
  const [state, setState] = useState<State>(initial);
  const setDispatch = (dispatch: Dispatch) => {
    setState(pre => ({
      ...pre,
      dispatch
    }));
  };
  return useMemo(() => ({ ...state, setDispatch }), [state.dispatch]);
};

export const useDispatchContext = constate(useDispatch);
