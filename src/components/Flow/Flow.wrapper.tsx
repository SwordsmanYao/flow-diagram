import * as React from "react";
import { FlowContext, initialFlow } from "./FlowContext";
import { Flow, Callbacks } from "../../interfaces";
import { DefaultNode } from "../Node";
import { DefaultLink } from "../Link";
import { SvgWrapper, HtmlWrapper } from "../Canvas";
import { useState, useMemo } from "react";
import { useDispatch, SetFlowAction, useEventCallback } from "../../hooks";
import { DispatchContext } from "./DispatchContext";

interface Props {
  defaultValue?: Flow;
  value?: Flow;
  setValue?: (action: SetFlowAction) => void;
  onChange?: (value: Flow) => void;
  callbacks?: Callbacks;
}

export const FlowWrapper: React.FC<Props> = props => {
  const { defaultValue, callbacks, onChange } = props;
  const [privateFlow, setPrivateFlow] = useState<Flow>(
    props.value || defaultValue || initialFlow
  );

  const flow = useMemo(() => props.value || privateFlow, [
    props.value,
    privateFlow
  ]);

  const setValue = props.setValue || useEventCallback((action: SetFlowAction) => {
    onChange && onChange(action(flow));
  }, [flow, onChange]);

  const setFlow = React.useCallback(
    (action: SetFlowAction) => {
      setPrivateFlow(action);
      setValue && setValue(action);
    },
    [setValue, setPrivateFlow]
  );

  const dispatch = useDispatch(setFlow, callbacks);

  return (
    <FlowContext.Provider value={flow}>
      <DispatchContext.Provider value={dispatch}>
        <FlowContext.Consumer>
          {flow => {
            const { nodes, links } = flow;
            return (
              <>
                <SvgWrapper>
                  {links &&
                    Object.keys(links).map(key => (
                      <DefaultLink key={key} link={links[key]} />
                    ))}
                </SvgWrapper>
                <HtmlWrapper>
                  {nodes &&
                    Object.keys(nodes).map(key => (
                      <DefaultNode key={key} node={nodes[key]} />
                    ))}
                </HtmlWrapper>
              </>
            );
          }}
        </FlowContext.Consumer>
      </DispatchContext.Provider>
    </FlowContext.Provider>
  );
};
