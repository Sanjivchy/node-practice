const express = require('express');
const path = require('path')

const app = express();
const port = process.argv[3] || 3000;

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');

app.get('^/$|/index|/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/api/user', (req, res) => {
  res.json(
    {
      name: 'John',
      age: 30
    }
  );
});
app.get('/new-page(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page(.html)?', (req, res) => {
  res.redirect('/new-page.html');
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})