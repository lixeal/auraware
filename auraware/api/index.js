// api/index.js
export default async function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';
  
  // Проверяем Roblox в User-Agent
  if (!userAgent.includes('Roblox') && !userAgent.includes('RobloxStudio')) {
    // Если не Roblox - показываем фейковую страницу
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.send(`
      <!DOCTYPE html>
      <html>
      <head>
          <title>AuraWare - Access Denied</title>
          <style>
              body { font-family: Arial; text-align: center; padding: 50px; }
              h1 { color: #ff4444; }
          </style>
      </head>
      <body>
          <h1>403 - Access Denied</h1>
          <p>This endpoint is only accessible from Roblox Studio or Roblox games.</p>
          <p>To use the script, execute in Roblox:</p>
          <code>loadstring(game:HttpGet("https://auraware.vercel.app"))()</code>
          <p style="margin-top: 30px; color: #666;">
              © AuraWare - Private script loader
          </p>
      </body>
      </html>
    `);
  }
  
  // Если это Roblox - отдаем скрипт
  const GITHUB_URL = 'https://raw.githubusercontent.com/lixeal/xllr/refs/heads/home/walk.lua';
  
  try {
    const response = await fetch(GITHUB_URL);
    const luaScript = await response.text();
    
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.send(luaScript);
    
  } catch (error) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.status(500).send('-- Error loading script');
  }
}
