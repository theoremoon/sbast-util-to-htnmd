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
