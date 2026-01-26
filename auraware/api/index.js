export default async function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';
  
  if (!userAgent.includes('Roblox')) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.send(`
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>auraware</title>
          <style>
              @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
              
              body {
                  font-family: 'Poppins', sans-serif;
                  background-color: #02040a;
                  margin: 0;
                  height: 100vh;
                  color: white;
                  display: flex;
                  justify-content: center;
                  align-items: center;
              }
              
              .container {
                  text-align: center;
                  max-width: 800px;
                  padding: 40px;
                  background: rgba(10, 11, 15, 0.75);
                  backdrop-filter: blur(40px);
                  border: 1px solid rgba(255, 255, 255, 0.05);
                  border-radius: 26px;
              }
              
              .logo {
                  font-size: 42px;
                  font-weight: 600;
                  background: linear-gradient(45deg, #6366f1, #8b5cf6);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  margin-bottom: 20px;
                  letter-spacing: 0.05em;
              }
              
              .warning {
                  color: #fbbf24;
                  font-size: 20px;
                  margin: 25px 0;
                  padding: 20px;
                  background: rgba(251, 191, 36, 0.1);
                  border-radius: 12px;
                  border-left: 4px solid #fbbf24;
                  line-height: 1.5;
              }
              
              .highlight {
                  color: #ef4444;
                  font-weight: 600;
              }
              
              .code-box {
                  background: #1a1a1a;
                  padding: 25px;
                  border-radius: 12px;
                  margin: 30px 0;
                  border: 1px solid #333;
                  text-align: left;
              }
              
              code {
                  color: #4ade80;
                  font-family: 'Courier New', monospace;
                  font-size: 18px;
                  display: block;
                  padding: 15px;
                  background: #0a0a0a;
                  border-radius: 8px;
                  margin-bottom: 20px;
              }
              
              .copy-btn {
                  background: #4ade80;
                  color: black;
                  border: none;
                  padding: 14px 28px;
                  border-radius: 8px;
                  font-family: 'Poppins', sans-serif;
                  font-weight: 600;
                  font-size: 16px;
                  cursor: pointer;
                  margin-top: 10px;
                  transition: all 0.2s;
                  display: inline-flex;
                  align-items: center;
                  gap: 10px;
              }
              
              .copy-btn:hover {
                  background: #22c55e;
                  transform: translateY(-2px);
                  box-shadow: 0 5px 15px rgba(34, 197, 94, 0.3);
              }
              
              .info {
                  color: #9ca3af;
                  font-size: 16px;
                  line-height: 1.6;
                  margin: 20px 0;
              }
              
              .footer {
                  margin-top: 40px;
                  color: #6b7280;
                  font-size: 14px;
                  border-top: 1px solid rgba(255, 255, 255, 0.05);
                  padding-top: 20px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="logo">auraware</div>
              
              <div class="warning">
                  ⚠️ <span class="highlight">You've been caught copyriting, kiddie!</span><br>
                  Use this to use the script:
              </div>
              
              <div class="code-box">
                  <code id="script-code">
                      loadstring(game:HttpGet("https://auraware.vercel.app"))()
                  </code>
                  
                  <button class="copy-btn" onclick="copyScript()">
                      📋 Copy Script
                  </button>
              </div>
              
              <div class="info">
                  This endpoint is protected and only accessible from Roblox.<br>
                  Direct browser access displays this message.
              </div>
              
              <div class="footer">
                  © auraware - the best<br>
                  <small style="color: #4b5563;">Protected by User-Agent verification</small>
              </div>
          </div>
          
          <script>
              function copyScript() {
                  const code = document.getElementById('script-code').innerText;
                  navigator.clipboard.writeText(code);
                  
                  const btn = document.querySelector('.copy-btn');
                  const originalText = btn.innerHTML;
                  btn.innerHTML = '✅ Copied!';
                  btn.style.background = '#10b981';
                  
                  setTimeout(() => {
                      btn.innerHTML = originalText;
                      btn.style.background = '#4ade80';
                  }, 2000);
              }
              
              // Auto-copy on click for mobile
              document.addEventListener('click', function(e) {
                  if (e.target.closest('.code-box')) {
                      copyScript();
                  }
              });
          </script>
      </body>
      </html>
    `);
  }
  
  // For Roblox - return the actual script
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
