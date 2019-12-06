import * as React from "react";
import { FlowContext, initialFlow } from "./FlowContext";
import { Flow, Callbacks } from "../../interfaces";
import { DefaultNode } from "../Node";
import { DefaultLink } from "../Link";
import { SvgWrapper, HtmlWrapper } from "../Canvas";
import { useState, useMemo } from "react";
import { useDispatch, SetFlowAction } from "../../hooks";
import { DispatchContext } from "./DispatchContext";

interface Props {
  defaultValue?: Flow;
  value?: Flow;
  onChange?: (flow: Flow) => void;
  callbacks?: Callbacks;
}

export const FlowWrapper: React.FC<Props> = props => {
  const { defaultValue, onChange, callbacks } = props;
  const [privateFlow, setPrivateFlow] = useState<Flow>(
    defaultValue || initialFlow
  );

  const flow = useMemo(() => props.value || privateFlow, [
    props.value,
    privateFlow
  ]);
  const setFlow = React.useCallback(
    (action: SetFlowAction) => {
      setPrivateFlow(pre => {
        const value = action(pre);
        onChange && onChange(value);
        return action(value);
      });
    },
    [onChange, setPrivateFlow]
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
