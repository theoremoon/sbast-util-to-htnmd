import type {
  CodeBlock,
  Decoration,
  Line,
  Node as SBNode,
  Table,
  Title,
} from "https://esm.sh/@progfay/scrapbox-parser@8.1.0";
import type { Node } from "npm:@types/mdast";

export type Transformer = {
  nodeHandlers: {
    [key: string]: (node: SBNode, transformer: Transformer) => Node;
  };
  decorationHandlers: {
    [key: string]: (children: Node[]) => Node;
  };
  blockHandlers: {
    title: (title: Title) => Node;
    codeBlock: (codeBlock: CodeBlock) => Node;
    table: (table: Table) => Node;
    line: (
      line: Line,
      handleNode: (node: SBNode) => Node,
      isInList: boolean,
    ) => Node | Node[];
  };
  handleNode: (node: SBNode) => Node;
  handleDecoration: (
    decoration: Decoration,
    children: Node[],
  ) => Node;
};
