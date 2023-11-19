import type { PlainNode } from "https://esm.sh/@progfay/scrapbox-parser@8.1.0";
import { text } from "npm:mdast-builder";

export function handlePlain(node: PlainNode) {
  return text(node.text);
}
