import type { LinkNode } from "https://esm.sh/@progfay/scrapbox-parser@8.1.0";
import { link, text } from "npm:mdast-builder";

export function handleLink(node: LinkNode) {
  switch (node.pathType) {
    case "absolute":
      if (node.content === "") {
        return link(node.href, "", text(node.href));
      } else {
        return link(node.href, "", text(node.content));
      }
    case "relative":
      return link("/entry/" + node.href, "", text(node.href));
    case "root":
      return text("root" + node.raw);
  }
}
