// api/auth.js
export default async function handler(req, res) {
  // Configurar CORS para permitir requisições
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Responder a requisições OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { code, error } = req.query;

  // Se houver erro do GitHub
  if (error) {
    console.error('Erro do GitHub:', error);
    // Retorna HTML com script para redirecionar
    res.setHeader('Content-Type', 'text/html');
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Erro de autenticação</title>
      </head>
      <body>
        <script>
          window.location.href = '/admin/#error=${error}';
        </script>
      </body>
      </html>
    `);
    return;
  }

  // Se recebeu o código de autorização
  if (code) {
    try {
      console.log('Código recebido:', code);
      
      // Trocar o código por um token de acesso
      const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code: code,
          redirect_uri: 'https://site-advocacia-one.vercel.app/api/auth'
        })
      });

      const tokenData = await tokenResponse.json();
      console.log('Resposta do token:', tokenData);
      
      if (tokenData.error) {
        console.error('Erro ao obter token:', tokenData.error);
        res.setHeader('Content-Type', 'text/html');
        res.send(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Erro de autenticação</title>
          </head>
          <body>
            <script>
              window.location.href = '/admin/#error=${tokenData.error}';
            </script>
          </body>
          </html>
        `);
        return;
      }

      // SUCESSO! Redireciona para o admin com o token
      console.log('Token obtido com sucesso');
      res.setHeader('Content-Type', 'text/html');
      res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Autenticado com sucesso!</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background: linear-gradient(135deg, #0a2472 0%, #1e3a8a 100%);
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              margin: 0;
              color: white;
              text-align: center;
            }
            .message {
              background: white;
              color: #0a2472;
              padding: 40px;
              border-radius: 16px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.2);
              max-width: 400px;
            }
            .loader {
              border: 4px solid #f3f3f3;
              border-top: 4px solid #ffd700;
              border-radius: 50%;
              width: 40px;
              height: 40px;
              animation: spin 1s linear infinite;
              margin: 20px auto;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          </style>
        </head>
        <body>
          <div class="message">
            <h2>✅ Autenticação realizada com sucesso!</h2>
            <p>Redirecionando para o painel administrativo...</p>
            <div class="loader"></div>
          </div>
          <script>
            // Salvar token no localStorage
            localStorage.setItem('github_token', '${tokenData.access_token}');
            
            // Redirecionar para o admin
            setTimeout(function() {
              window.location.href = '/admin/';
            }, 2000);
          </script>
        </body>
        </html>
      `);
      return;
    } catch (error) {
      console.error('Erro na troca de token:', error);
      res.setHeader('Content-Type', 'text/html');
      res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Erro de autenticação</title>
        </head>
        <body>
          <script>
            window.location.href = '/admin/#error=token_exchange_failed';
          </script>
        </body>
        </html>
      `);
      return;
    }
  }

  // Se não tem código, redireciona para o início (não deveria acontecer)
  res.redirect('/admin/');
}