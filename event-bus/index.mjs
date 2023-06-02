import express from 'express';
import axios from 'axios';
const app = express();
app.use(express.json())
const events = []
app.post('/events', async (request, response) => {
    const event = request.body;
    events.push(event)
    await Promise.all([
      axios.post('http://posts-srv:3000/events', event).catch((err) => {console.error("Err at port 3000 ")}),
      axios.post('http://comments-srv:3001/events', event).catch((err) => {console.error("Err at port 3001 ")}),
      axios.post('http://query-service-srv:3002/events', event).catch((err) => {console.error("Err at port 3002 ")}),
      axios.post('http://moderation-srv:3003/events', event).catch((err) => {console.error("Err at port 3003 ")})
    ])
    response.send({status: 'ok'})
    
})

app.get('/events', (request, response) => {
  response.send(events)
})

app.listen(3005, () => {
  console.log("server running at 3005")
})
