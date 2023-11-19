import { emphasis, heading, strike } from "npm:mdast-builder";
import type { Node } from "npm:@types/mdast";

export const decorationHandlers = {
  "*-3": (children: Node[]) => heading(2, children),
  "*-2": (children: Node[]) => heading(3, children),
  "*-1": (children: Node[]) => heading(4, children),
  "-": (children: Node[]) => strike(children),
  "/": (children: Node[]) => emphasis(children),
};
