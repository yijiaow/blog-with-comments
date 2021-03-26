const express = require('express');
const { randomBytes } = require('crypto');

const app = express();
app.use(express.json());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts/new', (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  posts[id] = { id, title };
  res.send(posts);
});

app.listen(4000, () => {
  console.log('Listening on port 4000');
});
