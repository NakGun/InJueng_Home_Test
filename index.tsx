
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

try {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error("React Rendering Error:", error);
  rootElement.innerHTML = `
    <div style="height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #000; color: #fff; padding: 20px; text-align: center;">
      <h1 style="color: #ef4444;">앱 로드 중 오류가 발생했습니다.</h1>
      <p style="color: #9ca3af; margin-top: 10px;">페이지를 새로고침하거나 브라우저 콘솔을 확인해주세요.</p>
    </div>
  `;
}
