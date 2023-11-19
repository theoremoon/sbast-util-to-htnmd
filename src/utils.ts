export function escapeFormula(formula: string) {
  // エスケープする特殊文字
  const specialCharacters = [
    "*",
    "^",
    "_",
  ];

  // 正規表現で特殊文字をエスケープする
  const escapedInput = formula.replace(
    new RegExp(`[${specialCharacters.join("\\")}]`, "g"),
    (match) => `\\${match}`,
  );

  return escapedInput;
}

export function detectFiletype(filename: string) {
  const patterns = [
    {
      matcher: /\.py$/,
      filetype: "python",
    },
    {
      matcher: /\.sage$/,
      filetype: "python",
    },
  ];

  for (const pattern of patterns) {
    if (pattern.matcher.test(filename)) {
      return pattern.filetype;
    }
  }
  return "";
}
