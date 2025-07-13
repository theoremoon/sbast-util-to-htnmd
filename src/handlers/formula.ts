import type { FormulaNode } from "https://esm.sh/@progfay/scrapbox-parser@8.1.0";
import { html } from "npm:mdast-builder";
import { escape } from "@std/regexp/escape";

function escapeFormula(formula: string) {
  const hasNewLine = formula.indexOf("\\\\") !== -1;

  // エスケープする特殊文字
  const specialCharacters = hasNewLine ? [] : ["*", "^", "_"];

  // 置換対象の記号
  const specialSymbols: [string, string][] = [
    ["<", "\\lt"],
    [">", "\\gt"],
  ];

  const replacements = new Map<string, string>([
    ...specialSymbols,
    ...specialCharacters.map((c): [string, string] => [c, `\\${c}`]),
  ]);
  const pat =
    "(" +
    Array.from(replacements.keys())
      .map((k) => escape(k))
      .join("|") +
    ")";

  // 正規表現で特殊文字をエスケープする
  const escapedInput = formula.replace(
    new RegExp(pat, "g"),
    (s: string) => replacements.get(s) || s,
  );
  return {
    result: escapedInput,
    hasNewLine,
  };
}

export function handleFormula(node: FormulaNode) {
  const { result, hasNewLine } = escapeFormula(node.formula);
  return hasNewLine
    ? html(`<div>[tex: ${result}]</div>`)
    : html(`[tex: ${result}]`);
}
