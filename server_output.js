const http = require('http');
const fs = require('fs');
const path = require('path');

const root = '/workspace/9d1671e2-d4ec-4403-b8da-a11e8557ac94/sessions/agent_d09c0bd7-0e0a-413b-b0bc-9e19c4aceddc/output';
const PORT = 18765;

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.css': 'text/css',
  '.js': 'application/javascript',
};

http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url).split('?')[0];
  if (urlPath === '/' || urlPath === '') urlPath = '/download.html';

  const safe = path.normalize(urlPath).replace(/^(\.\.(\/)?)+/, '');
  const filePath = path.join(root, safe);

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>404 - Not Found</h1><p>The requested file does not exist.</p>');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mime[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  });
}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Download page: http://localhost:${PORT}/download.html`);
  console.log(`PDF file: http://localhost:${PORT}/`);
  console.log('Press Ctrl+C to stop');
});
