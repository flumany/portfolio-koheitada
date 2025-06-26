
// Figma URLをiframe形式に変換する関数
export const convertFigmaUrlToIframe = (url: string): string => {
  // Figma プロトタイプURLのパターンをチェック
  const figmaProtoRegex = /https:\/\/www\.figma\.com\/proto\/([^/?]+)\/([^/?]+)\?(.+)/;
  const match = url.match(figmaProtoRegex);
  
  if (match) {
    const fileId = match[1];
    const fileName = match[2];
    const params = match[3];
    
    // embed用のURLを構築
    const embedUrl = `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;
    
    return `<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="${embedUrl}" allowfullscreen></iframe>`;
  }
  
  // 既にiframe形式の場合はそのまま返す
  if (url.includes('<iframe') && url.includes('</iframe>')) {
    return url;
  }
  
  // その他のURLの場合はそのまま返す
  return url;
};
