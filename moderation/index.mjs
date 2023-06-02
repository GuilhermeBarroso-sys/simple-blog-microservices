import express from 'express';
import axios from 'axios';
const app = express();
app.use(express.json())

app.post('/events', async (request, response) => {
    const {type, data} = request.body;

    if(type == 'CommentCreated') {
      const status = data.content.includes("orange") ? 'rejected' : 'approved';
      await axios.post('http://event-bus-srv:3005/events', {
        type: 'CommentModerated',
        data: {
          ...data, status
        }
      })
    }


    response.send({})
})


app.listen(3003, () => {
  console.log("server running at 3003")
})
