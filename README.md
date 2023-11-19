# sbast-til-to-htnmd

Convert from Scrapbox AST by [@progfay/scrapbox-parser](https://github.com/progfay/scrapbox-parser) to [mdast](https://github.com/syntax-tree/mdast) but featured for the hatena blog.

## usage

```typescript
import stringify from "npm:remark-stringify";
import { unified } from "npm:unified";
import { parse } from "https://esm.sh/@progfay/scrapbox-parser@8.1.0";
import { toHatenaMarkdown } from "./src/index.ts";

if (Deno.args.length === 0) {
  console.log(`Usage: ${Deno.execPath()} <scrapbox>`);
  Deno.exit(1);
}

const sb = Deno.readTextFileSync(Deno.args[0]);
const sbast = parse(sb);
const { ast: mdast } = toHatenaMarkdown(sbast);

const processor = unified().use(stringify, {});

console.log(processor.stringify(mdast));
```
