
/**
 * テキストの改行をそのまま保持する関数
 * 編集時に入力された改行をそのまま適用
 */
export function formatTextWithLineBreaks(text: string): string {
  if (!text) return '';
  
  // 単純にテキストをそのまま返す（改行は保持される）
  return text;
}
