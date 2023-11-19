import { handleCode } from "./code.ts";
import { handleDecoration } from "./decoration.ts";
import { handleFormula } from "./formula.ts";
import { handleHashTag } from "./hashTag.ts";
import { handleLink } from "./link.ts";
import { handleNumberList } from "./numberList.ts";
import { handlePlain } from "./plain.ts";

export const nodeHandlers = {
  code: handleCode,
  decoration: handleDecoration,
  formula: handleFormula,
  hashTag: handleHashTag,
  link: handleLink,
  plain: handlePlain,
  numberList: handleNumberList,
};
