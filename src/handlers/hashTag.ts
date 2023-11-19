import type { HashTagNode } from "https://esm.sh/@progfay/scrapbox-parser@8.1.0";
import { link, text } from "npm:mdast-builder";

export function handleHashTag(node: HashTagNode) {
  return link(
    "/entry/" + node.href,
    "",
    text("#" + node.href),
  );
}
