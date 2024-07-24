export const addLineBreak = (text: string, style: string) => {
  const regex = /([.!?])\s+(?=[^.\s])/g;
  if (style === "생각 키우는 질문가") {
    return text.replace(regex, "$1\n");
  }

  return text;
};
