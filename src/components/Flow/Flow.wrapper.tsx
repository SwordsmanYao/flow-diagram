import * as React from "react";
import { FlowContext, initialFlow } from "./FlowContext";
import { Flow, Callbacks } from "../../interfaces";
import { NodeWrapper } from "../Node";
import { LinkWrapper } from "../Link";
import { SvgWrapper, HtmlWrapper } from "../Canvas";
import { useState, useMemo, useEffect } from "react";
import {
  useDispatch,
  SetFlowAction,
  useEventCallback,
  useDispatchContext
} from "../../hooks";
import {
  CustomComponents,
  ComponentsContext,
  initialComponents
} from "./ComponentsContext";

interface Props {
  defaultValue?: Flow;
  value?: Flow;
  setValue?: (action: SetFlowAction) => void;
  onChange?: (value: Flow) => void;
  callbacks?: Callbacks;
  components?: CustomComponents;
}

export const FlowWrapper: React.FC<Props> = props => {
  const { defaultValue, callbacks, onChange, components } = props;
  const [privateFlow, setPrivateFlow] = useState<Flow>(
    props.value || defaultValue || initialFlow
  );

  const { setDispatch } = useDispatchContext();

  const flow = useMemo(() => props.value || privateFlow, [
    props.value,
    privateFlow
  ]);

  const setValue =
    props.setValue ||
    useEventCallback(
      (action: SetFlowAction) => {
        onChange && onChange(action(flow));
      },
      [flow, onChange]
    );

  const setFlow = useEventCallback(
    (action: SetFlowAction) => {
      setPrivateFlow(action);
      setValue && setValue(action);
    },
    [setValue, setPrivateFlow]
  );

  const dispatch = useDispatch(setFlow, callbacks);

  useEffect(() => {
    setDispatch(dispatch);
  }, [dispatch]);

  return (
    <ComponentsContext.Provider value={components || initialComponents}>
      <FlowContext.Provider value={flow}>
        <FlowContext.Consumer>
          {flow => {
            const { nodes, links } = flow;
            return (
              <>
                <SvgWrapper>
                  {links &&
                    Object.keys(links).map(key => (
                      <LinkWrapper key={key} link={links[key]} />
                    ))}
                </SvgWrapper>
                <HtmlWrapper>
                  {nodes &&
                    Object.keys(nodes).map(key => (
                      <NodeWrapper key={key} node={nodes[key]} />
                    ))}
                </HtmlWrapper>
              </>
            );
          }}
        </FlowContext.Consumer>
      </FlowContext.Provider>
    </ComponentsContext.Provider>
  );
};
