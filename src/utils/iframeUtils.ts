
/**
 * YouTubeのURLをembedURLに変換
 */
export function convertYouTubeUrl(url: string): string {
  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
  const match = url.match(regex);
  if (match) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return url;
}

/**
 * App StoreやPlay StoreのURLかどうかを判定
 */
export function isAppStoreUrl(url: string): boolean {
  return /^https?:\/\/(?:play\.google\.com\/store|apps\.apple\.com|itunes\.apple\.com)/.test(url);
}

/**
 * HTMLコンテンツを個別のiframe/embed要素に分割してページごとに配列にする
 */
export function parseIframeContent(htmlContent: string): string[] {
  if (!htmlContent) return [];
  
  // YouTube URLの自動変換
  let processedContent = htmlContent.replace(
    /(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#\s]+))/g,
    '<iframe width="800" height="450" src="https://www.youtube.com/embed/$2" frameborder="0" allowfullscreen></iframe>'
  );
  
  // App Store/Play StoreのURLを検出してリンクボタンに変換
  processedContent = processedContent.replace(
    /(https?:\/\/(?:play\.google\.com\/store|apps\.apple\.com|itunes\.apple\.com)[^\s<>"']+)/g,
    '<div class="app-store-link" data-url="$1">$1</div>'
  );
  
  // iframe、embed、object、divタグで囲まれた要素を抽出
  const elementRegex = /<(?:iframe|embed|object|div)[^>]*>[\s\S]*?<\/(?:iframe|embed|object|div)>/gi;
  const matches = processedContent.match(elementRegex);
  
  if (matches) {
    return matches.map(match => {
      // YouTube iframeの場合、適切な属性を確保
      if (match.includes('youtube.com/embed')) {
        return match.replace(
          /<iframe([^>]*?)>/i, 
          '<iframe$1 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>'
        );
      }
      return match;
    });
  }
  
  // マッチしない場合は、改行で分割して空でない行を返す
  return processedContent.split('\n').filter(line => line.trim());
}
