import * as React from "react";
import { FlowContext } from "./FlowContext";
import { Flow } from "../../interfaces";
import { DefaultNode } from "../Node";
import { DefaultLink } from "../Link";
import { SvgWrapper, HtmlWrapper } from "../Canvas";

interface Props {
  flow: Flow;
}

export const FlowWrapper: React.FC<Props> = props => {
  const { flow } = props;
  return (
    <FlowContext.Provider value={flow}>
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
    </FlowContext.Provider>
  );
};
