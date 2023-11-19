import { toHatenaMarkdown } from "./src/index.ts";
import { assertEquals } from "https://deno.land/std/assert/mod.ts";
import { blockquote, paragraph, root, text } from "npm:mdast-builder";

Deno.test("quote", () => {
  const mdast = toHatenaMarkdown([
    {
      indent: 0,
      type: "line",
      nodes: [
        {
          type: "quote",
          raw: "> hello",
          nodes: [
            {
              type: "plain",
              text: "hello",
              raw: "hello",
            },
          ],
        },
      ],
    },
  ]);
  assertEquals(
    mdast,
    root([
      paragraph([
        blockquote([
          text("hello"),
        ]),
      ]),
    ]),
  );
});
