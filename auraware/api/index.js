export default async function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';
  
  // Если не Roblox - показываем страницу
  if (!userAgent.includes('Roblox')) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.send(`
      <!DOCTYPE html>
      <html>
      <head>
          <title>AuraWare Script Loader</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background: #0f0f0f;
                  color: white;
                  text-align: center;
                  padding: 50px;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background: #1a1a1a;
                  padding: 30px;
                  border-radius: 10px;
                  border: 1px solid #333;
              }
              h1 { color: #00ff88; }
              code {
                  background: #2a2a2a;
                  padding: 10px 15px;
                  border-radius: 5px;
                  color: #00ff88;
                  font-size: 16px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>🔒 AuraWare Script Loader</h1>
              <p>This endpoint is protected and only accessible from Roblox.</p>
              
              <p>To use the script, execute this in Roblox:</p>
              <code>loadstring(game:HttpGet("https://auraware.vercel.app"))()</code>
              
              <p style="margin-top: 30px; color: #888; font-size: 14px;">
                  Direct browser access is not permitted. User-Agent verification required.
              </p>
          </div>
      </body>
      </html>
    `);
  }
  
  // Если это Roblox - отдаем реальный скрипт
  try {
    const response = await fetch('https://raw.githubusercontent.com/lixeal/xllr/refs/heads/home/walk.lua');
    
    if (!response.ok) {
      throw new Error('Failed to fetch script');
    }
    
    const luaScript = await response.text();
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.send(luaScript);
    
  } catch (error) {
    console.error('Error:', error);
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.status(500).send('-- Error loading script from GitHub');
  }
}
