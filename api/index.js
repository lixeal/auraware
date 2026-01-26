// api/index.js
export default async function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';
  
  // Определяем откуда запрос
  const isRoblox = userAgent.includes('Roblox') || 
                   userAgent.includes('RobloxStudio') ||
                   req.headers['roblox-id'] ||
                   req.headers['rbx-authentication'];
  
  if (isRoblox) {
    // Если запрос из Roblox - отдаем Lua скрипт
    const GITHUB_URL = 'https://raw.githubusercontent.com/lixeal/xllr/refs/heads/home/walk.lua';
    
    try {
      const response = await fetch(GITHUB_URL);
      if (!response.ok) throw new Error(`GitHub error: ${response.status}`);
      
      const luaScript = await response.text();
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      return res.status(200).send(luaScript);
    } catch (error) {
      console.error(error);
      return res.status(500).send('-- Error: Could not load script from GitHub');
    }
  } else {
    // Если из браузера - делаем редирект на сайт
    res.writeHead(302, {
      'Location': '/index.html'
    });
    res.end();
  }
}
