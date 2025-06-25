
/**
 * 日本語は句読点のあと、英語はカンマ・セミコロン・コロンや主要前置詞/接続詞の前で改行。
 * 不自然な単語途中での改行を防ぐためCSSも適切に設定。
 */
export function formatTextWithLineBreaks(text: string): string {
  if (!text) return '';
  let formatted = text;

  // 日本語句読点の後で改行
  formatted = formatted.replace(/([。｡、，,！!？?])\s*/g, '$1\n');

  // 英語: カンマ, セミコロン, コロン, ピリオド, エクスクラメーション, クエスチョンの後で改行
  formatted = formatted.replace(/([,.!?;:])\s+/g, '$1\n');

  // 英語: よくある接続詞や前置詞の前で改行（単語区切りのみ/文頭文末じゃない場合）
  // ["for","and","nor","but","or","yet","so","in","at","to","with","from","on","by","of","as","if","that","because"]
  formatted = formatted.replace(
    /(\s)(for|and|nor|but|or|yet|so|in|at|to|with|from|on|by|of|as|if|that|because)\s/gi,
    '\n$2 '
  );

  // 連続しすぎる改行は2つまでにまとめる
  formatted = formatted.replace(/\n{3,}/g, '\n\n');

  // 末尾の余計な改行除去
  formatted = formatted.replace(/\n+$/, '');

  return formatted;
}
