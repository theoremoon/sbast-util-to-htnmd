import type { CodeNode } from "https://esm.sh/@progfay/scrapbox-parser@8.1.0";
import { inlineCode } from "npm:mdast-builder";

export function handleCode(node: CodeNode) {
  return inlineCode(node.text);
}
