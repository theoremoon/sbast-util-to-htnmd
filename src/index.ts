import type { Page } from "https://esm.sh/@progfay/scrapbox-parser@8.1.0";
import { list, listItem, paragraph, root, text } from "npm:mdast-builder";
import type { Node, Root } from "npm:@types/mdast";
import { nodeHandlers } from "./handlers/index.ts";
import { decorationHandlers } from "./decorationHandlers/index.ts";
import { Transformer } from "./type.ts";
import { blockHandlers } from "./blockHandlers/index.ts";

export const defaultHandlers: {
  nodeHandlers: Transformer["nodeHandlers"];
  decorationHandlers: Transformer["decorationHandlers"];
  blockHandlers: Transformer["blockHandlers"];
} = {
  // deno-lint-ignore no-explicit-any
  nodeHandlers: nodeHandlers as any,
  decorationHandlers,
  // deno-lint-ignore no-explicit-any
  blockHandlers: blockHandlers as any,
};

const unspreadListItem: typeof listItem = (items) => {
  return { ...listItem(items), spread: false };
};

export function toHatenaMarkdown(
  page: Page,
  handlers = defaultHandlers,
) {
  const transformer: Transformer = {
    nodeHandlers: handlers.nodeHandlers,
    decorationHandlers: handlers.decorationHandlers,
    blockHandlers: handlers.blockHandlers,
    handleNode(node) {
      const handler = transformer.nodeHandlers[node.type];
      if (!handler) {
        console.log(`handler for node [${node.type}] is missing`);
        return text("[" + node.type + "]");
      }
      return handler(node, transformer);
    },
    handleDecoration(decoration, children) {
      const handler = transformer.decorationHandlers[decoration];
      if (!handler) {
        console.log(`decoration handler for [${decoration}] is missing`);
        return paragraph([text(`deco:[${decoration}]`), ...children]);
      }
      return handler(children);
    },
  };

  const handleBlocks = (
    index: number,
    indent: number,
  ) => {
    const contents: Node[] = [];
    let i = index;
    while (i < page.length) {
      const block = page[i];
      if (block.type === "title") {
        contents.push(transformer.blockHandlers["title"](block));
        i++;
        continue;
      }

      if (block.indent > indent) {
        const { node: res, newIndex } = handleBlocks(i, block.indent);
        contents.push(res);
        i = newIndex;
      } else if (block.indent < indent) {
        const isInList = block.indent > 0;
        return {
          node: isInList
            ? unspreadListItem(list("unordered", contents))
            : list("unordered", contents),
          newIndex: i,
        };
      } else {
        const isInList = indent > 0;
        const handler = transformer.blockHandlers[block.type];
        // deno-lint-ignore no-explicit-any
        const res = handler(block as any, transformer.handleNode, isInList);

        if (isInList) {
          contents.push(unspreadListItem(res));
        } else {
          contents.push(res as Node);
        }
        i++;
      }
    }
    return {
      node: root(contents),
      newIndex: Infinity,
    };
  };

  const { node: rootNode } = handleBlocks(0, 0);
  return rootNode as Root;
}
