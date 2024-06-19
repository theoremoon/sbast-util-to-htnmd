import { toHatenaMarkdown } from "./mod.ts";
import { assertEquals } from "https://deno.land/std@0.207.0/assert/mod.ts";
import { blockquote, heading, paragraph, root, text, link } from "npm:mdast-builder";

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
    {
      indent: 0,
      type: "line",
      nodes: [
        {
          type: "link",
          raw: "[リンク]",
          pathType: "relative",
          href: "リンク",
          content: "リンク",
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
      paragraph([
        link("/entry/%E3%83%AA%E3%83%B3%E3%82%AF", "", text("リンク")),
      ]),
    ]),
  );
});

Deno.test("decoration", () => {
  const mdast = toHatenaMarkdown([
    {
      indent: 0,
      type: "line",
      nodes: [
        {
          type: "decoration",
          rawDecos: "**",
          decos: ["*-2"],
          raw: "** he[* l]lo",
          nodes: [
            {
              type: "plain",
              text: "he",
              raw: "he",
            },
            {
              type: "decoration",
              rawDecos: "*",
              decos: ["*-1"],
              raw: "* l",
              nodes: [
                {
                  type: "plain",
                  text: "l",
                  raw: "l",
                },
              ],
            },
            {
              type: "plain",
              text: "lo",
              raw: "lo",
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
        heading(3, [
          text("he"),
          heading(4, [
            text("l"),
          ]),
          text("lo"),
        ]),
      ]),
    ]),
  );
});
