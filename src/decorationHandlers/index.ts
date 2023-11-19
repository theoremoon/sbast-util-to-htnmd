import { heading, paragraph, text } from "npm:mdast-builder";
import type { Node } from "npm:@types/mdast";

function generateHandler(deco: string) {
  switch (deco) {
    case "*-3":
      return (children: Node[]) => heading(2, children);
    case "*-2":
      return (children: Node[]) => heading(3, children);
    case "*-1":
      return (children: Node[]) => heading(4, children);
    default:
      return (children: Node[]) =>
        paragraph([text(`deco:[${deco}]`), ...children]);
  }
}

export const decorationHandlers = {
  "*-3": generateHandler("*-3"),
  "*-2": generateHandler("*-2"),
  "*-1": generateHandler("*-1"),
};
