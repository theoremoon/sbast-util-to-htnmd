import type {
  CodeBlock,
  Decoration,
  Line,
  Node as SBNode,
  Table,
  Title,
} from "https://esm.sh/@progfay/scrapbox-parser@8.1.0";
import type { Node } from "npm:@types/mdast";

export type NodeHandler = (
  node: SBNode,
  transformer: Transformer,
) => Node | Node[];

export type DecorationHandler = (children: Node[]) => Node | Node[];

export type Transformer = {
  nodeHandlers: {
    [key: string]: NodeHandler;
  };
  decorationHandlers: {
    [key: string]: DecorationHandler;
  };
  blockHandlers: {
    title: (title: Title) => Node;
    codeBlock: (codeBlock: CodeBlock) => Node;
    table: (table: Table) => Node;
    line: (
      line: Line,
      handleNode: (node: SBNode) => Node | Node[],
      isInList: boolean,
    ) => Node | Node[];
  };
  handleNode: (node: SBNode) => Node | Node[];
  handleDecoration: (
    decoration: Decoration,
    children: Node[],
  ) => Node | Node[];
};
