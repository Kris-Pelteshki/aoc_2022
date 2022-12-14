const splitBy = (seperator: string) => (str: string) => str.split(seperator);

export const splitBySpace = splitBy(" ");
export const splitByLine = splitBy("\n");
export const splitByComma = splitBy(",");
export const splitByCharacter = splitBy("");
