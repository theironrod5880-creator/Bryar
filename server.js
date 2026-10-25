const http = require('http');

const PORT = Number(process.env.PORT || 3000);

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      app: 'Bryar 1.0',
      status: 'starter-server-running',
      note: 'This is only a health check. Chat, AI, accounts, ads, and calling are not connected.'
    }));
    return;
  }
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Bryar 1.0 starter server. Try /health');
});

server.listen(PORT, () => {
  console.log(`Bryar 1.0 starter server listening on port ${PORT}`);
});
