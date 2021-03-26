const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

const eventHandler = (type, data) => {
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
};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  eventHandler(type, data);

  res.send({});
});

app.listen(4002, async () => {
  console.log('Listening on port 4002');

  const res = await axios.get('http://localhost:4005/events');

  for (let event of res.data) {
    console.log('Processing event', event.type);
    eventHandler(event.type, event.data);
  }
});
