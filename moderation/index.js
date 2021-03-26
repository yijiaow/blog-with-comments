const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const taboo = 'orange';
    const status = data.content.includes(taboo) ? 'rejected' : 'approved';

    await axios.post('http://localhost:4005/events', {
      type: 'CommentModerated',
      data: { ...data, status },
    });
  }
  res.send({});
});

app.listen(4003, () => {
  console.log('Listening on port 4003');
});
