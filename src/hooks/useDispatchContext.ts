import { Dispatch } from "./useDispatch";
import { useState } from "react";
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
  return { ...state, setDispatch };
};

export const useDispatchContext = constate(useDispatch, value => [
  value.dispatch
]);
