// api/index.js
export default async function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';
  
  // Проверяем User-Agent
  const isRoblox = userAgent.includes('Roblox') || 
                   userAgent.includes('RobloxStudio') ||
                   req.headers['roblox-id'] ||
                   req.headers['rbx-authentication'];
  
  if (isRoblox) {
    // 🔥 ДЛЯ ROBLOX: отдаем Lua скрипт
    const GITHUB_URL = 'https://raw.githubusercontent.com/lixeal/xllr/refs/heads/home/walk.lua';
    
    try {
      const response = await fetch(GITHUB_URL);
      if (!response.ok) throw new Error(`GitHub error: ${response.status}`);
      
      const luaScript = await response.text();
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache');
      return res.status(200).send(luaScript);
      
    } catch (error) {
      console.error(error);
      return res.status(500).send('-- Error: Could not load script from GitHub');
    }
  } else {
    // 🌐 ДЛЯ БРАУЗЕРА: отдаем HTML сайт
    try {
      // Импортируем модули для чтения файла
      const fs = await import('fs');
      const path = await import('path');
      const { fileURLToPath } = await import('url');
      
      // Получаем путь к файлу
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const htmlPath = path.join(__dirname, '..', 'site', 'index.html');
      
      // Читаем HTML файл
      const html = fs.readFileSync(htmlPath, 'utf8');
      
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(html);
      
    } catch (error) {
      console.error(error);
      return res.status(404).send('<h1>Site not found</h1>');
    }
  }
}
