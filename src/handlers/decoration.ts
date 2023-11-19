import type { DecorationNode } from "https://esm.sh/@progfay/scrapbox-parser@8.1.0";
import { Transformer } from "../type.ts";

export function handleDecoration(
  node: DecorationNode,
  transformer: Transformer,
) {
  return transformer.handleDecoration(
    node.decos[0],
    node.nodes.map((n) => transformer.handleNode(n)).flatMap((x) =>
      Array.isArray(x) ? x : [x]
    ),
  );
}
