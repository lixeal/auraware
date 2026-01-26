// api/index.js
export default async function handler(req, res) {
  try {
    // Просто возвращаем Lua скрипт
    const luaScript = 'print("Hello from Lua!")';
    
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.status(200).send(luaScript);
    
  } catch (error) {
    console.error('Error:', error);
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.status(500).send('-- Script Error');
  }
}
