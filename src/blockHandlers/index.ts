import { code, heading, paragraph, text } from "npm:mdast-builder";
import type {
  CodeBlock,
  Line,
  Node as SBNode,
  Title,
} from "https://esm.sh/@progfay/scrapbox-parser@8.1.0";
import { detectFiletype } from "../utils.ts";
import type { Node } from "npm:@types/mdast";

function handleTitle(title: Title) {
  return heading(1, text(title.text));
}

function handleCodeBlock(codeBlock: CodeBlock) {
  return code(detectFiletype(codeBlock.fileName), codeBlock.content);
}

function handleTable() {
  return text("[table]");
}

function handleLine(
  line: Line,
  handleNode: (node: SBNode) => Node | Node[],
  isInList: boolean,
) {
  const children: Node[] = [];
  for (const node of line.nodes) {
    const res = handleNode(node);
    if (Array.isArray(res)) {
      children.push(...res);
    } else {
      children.push(res);
    }
  }

  if (isInList) {
    return children;
  } else {
    return paragraph(children);
  }
}

export const blockHandlers = {
  title: handleTitle,
  codeBlock: handleCodeBlock,
  table: handleTable,
  line: handleLine,
};
