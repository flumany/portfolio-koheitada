import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Error boundary for better error handling
class ErrorBoundary extends Error {}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error('Root element not found');
}

try {
  createRoot(rootElement).render(<App />);
} catch (error) {
  console.error('Failed to render app:', error);
  // Fallback UI
  rootElement.innerHTML = `
    <div style="
      display: flex; 
      align-items: center; 
      justify-content: center; 
      height: 100vh; 
      font-family: system-ui, -apple-system, sans-serif;
      text-align: center;
      color: #374151;
    ">
      <div>
        <h1>読み込みエラー</h1>
        <p>ページの読み込み中にエラーが発生しました。<br/>ページを再読み込みしてください。</p>
        <button onclick="location.reload()" style="
          padding: 8px 16px; 
          background: #3b82f6; 
          color: white; 
          border: none; 
          border-radius: 4px; 
          cursor: pointer;
          margin-top: 16px;
        ">再読み込み</button>
      </div>
    </div>
  `;
}
