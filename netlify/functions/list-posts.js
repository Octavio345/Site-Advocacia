const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
  try {
    // Caminho absoluto baseado na localização da função
    // A função está em: /opt/build/repo/netlify/functions/list-posts.js
    // Os posts estão em: /opt/build/repo/src/content/posts
    
    const baseDir = path.resolve(__dirname, '../../');
    const postsDirectory = path.join(baseDir, 'src/content/posts');
    
    console.log('Tentando acessar:', postsDirectory);
    
    if (!fs.existsSync(postsDirectory)) {
      return {
        statusCode: 404,
        body: JSON.stringify({ 
          error: 'Pasta não encontrada',
          path: postsDirectory 
        })
      };
    }
    
    const files = fs.readdirSync(postsDirectory);
    
    const posts = files
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace('.md', ''));
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ posts })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: error.message,
        stack: error.stack 
      })
    };
  }
};
