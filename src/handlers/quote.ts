import type {
  Node as SBNode,
  QuoteNode,
} from "https://esm.sh/@progfay/scrapbox-parser@8.1.0";
import { blockquote } from "npm:mdast-builder";
import { Transformer } from "../type.ts";
import { Node } from "npm:@types/mdast";

export function handleQuote(node: QuoteNode, transformer: Transformer) {
  const children: Node[] = node.nodes.map((n: SBNode) =>
    transformer.handleNode(n)
  ).flatMap((x) => Array.isArray(x) ? x : [x]);
  return blockquote(children);
}
