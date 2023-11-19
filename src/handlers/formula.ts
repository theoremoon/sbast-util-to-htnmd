import type { FormulaNode } from "https://esm.sh/@progfay/scrapbox-parser@8.1.0";
import { html } from "npm:mdast-builder";
import { escapeFormula } from "../utils.ts";

export function handleFormula(node: FormulaNode) {
  const formula = escapeFormula(node.formula);
  return html(`[tex: ${formula}]`);
}
