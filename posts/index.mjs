import express from "express"
import {randomBytes} from "crypto"
import cors from "cors"
import axios from "axios"
const app = express()
app.use(express.json())
app.use(cors())
const posts = {}

app.get("/posts", (request,response) =>{
  response.send(posts)
})

app.post("/posts/create", async (request,response) =>{
  try {

    const id = randomBytes(4).toString('hex')
    const {title} = request.body;
  
    posts[id] = {
      id, title
    }
    const event = {
      type: 'PostCreated',
      data: {
        id, 
        title
      }
    }
    await axios.post('http://event-bus-srv:3005/events', event)
  
    response.status(201).send(posts[id])
  } catch(err) {
    response.status(500).send(err.message)
  }
})


app.post('/events', (request,response) => {
  console.log('Received event', request.body)
  response.send({status: 'ok'})
})

app.listen(3000, () => {
  console.log("v1000")

  console.log('Listening on 3000')
})