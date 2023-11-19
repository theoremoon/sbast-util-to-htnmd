import type { Node } from "https://esm.sh/@progfay/scrapbox-parser@8.1.0";
import { listItem } from "npm:mdast-builder";
import { Transformer } from "../type.ts";

export function handleNumberList(
  node: Node,
  transformer: Transformer,
) {
  return listItem(
    // deno-lint-ignore no-explicit-any
    (node as any).nodes.map((n: Node) => transformer.handleNode(n)),
  );
}
