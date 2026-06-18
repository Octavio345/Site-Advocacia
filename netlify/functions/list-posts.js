import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function handler() {
  try {
    // Caminho absoluto baseado na localizacao da funcao no deploy da Netlify.
    const baseDir = path.resolve(__dirname, '../../');
    const postsDirectory = path.join(baseDir, 'src/content/posts');

    console.log('Tentando acessar:', postsDirectory);

    if (!fs.existsSync(postsDirectory)) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: 'Pasta nao encontrada',
          path: postsDirectory,
        }),
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
      body: JSON.stringify({ posts }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message,
        stack: error.stack,
      }),
    };
  }
}
