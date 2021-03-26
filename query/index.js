const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  if (type === 'CommentCreated') {
    const { id, postId, content, status } = data;
    posts[postId].comments.push({ id, postId, content, status });
  }
  if (type === 'CommentUpdated') {
    const { id, postId, content, status } = data;
    const comment = posts[postId].comments.find((comment) => comment.id === id);
    comment.content = content;
    comment.status = status;
  }

  res.send({});
});

app.listen(4002, () => {
  console.log('Listening on port 4002');
});
