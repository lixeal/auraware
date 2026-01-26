export default async function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';
  const GITHUB_URL = 'https://raw.githubusercontent.com/lixeal/xllr/refs/heads/home/walk.lua';

  if (userAgent.includes('Roblox')) {
    try {
      // Запрашиваем скрипт напрямую с GitHub
      const response = await fetch(GITHUB_URL);

      if (!response.ok) {
        throw new Error(`GitHub error: ${response.status}`);
      }

      const luaScript = await response.text();

      // Отдаем скачанный Lua-код
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      return res.status(200).send(luaScript);

    } catch (error) {
      // Если Гитхаб упал или ссылка битая
      console.error(error);
      return res.status(500).send('-- Error: Could not load script from GitHub');
    }
  } else {
    // Если зашли через браузер, а не из игры
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(403).send('<h1>403 | Access Denied</h1>');
  }
}
