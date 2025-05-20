import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * テキストを日本語・英語で自然な箇所で改行。
 * 日本語: 句読点(、。等)後で改行
 * 英語: カンマ、ピリオド、コロン等の後/主要接続詞前で改行
 */
export function formatTextWithLineBreaks(text: string): string {
  if (!text) return '';
  let formatted = text;

  // 日本語句読点の後で改行
  formatted = formatted.replace(/([。｡、，,！!？?])\s*/g, '$1\n');

  // 英語: カンマ, セミコロン, コロン, ピリオド, エクスクラメーション, クエスチョンの後で改行
  formatted = formatted.replace(/([,.!?;:])\s+/g, '$1\n');

  // 英語: よくある接続詞や前置詞の前で改行（単語区切りのみ/文頭文末じゃない場合）
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
