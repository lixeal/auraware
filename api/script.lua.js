// api/script.lua.js
export default async function handler(req, res) {
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
}
