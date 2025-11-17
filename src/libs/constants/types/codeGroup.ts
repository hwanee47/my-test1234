import { getEnumName } from "@/libs/client/enumUtils";

export enum CodeGroup {
  "사과" = 12323,
  "바나나" = 2,
}

export const CODE_GROUP = {
  value: CodeGroup,
  getName: (value: string) => getEnumName(CodeGroup, value),
};
