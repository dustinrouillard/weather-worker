export function emojiToCodepoint(emoji: string) {
  if (emoji.length < 4) return emoji.codePointAt(0)?.toString(16);

  return emoji.codePointAt(0)?.toString(16) + '-' + emoji.codePointAt(2)?.toString(16);
};
