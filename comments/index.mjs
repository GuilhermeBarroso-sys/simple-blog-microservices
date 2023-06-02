import express from "express"
import {randomBytes} from "crypto"
import cors from "cors"
import axios from "axios"
const app = express()
app.use(express.json())
app.use(cors())
const commentsByPostId = {}

app.get("/posts/:id/comments", (request,response) =>{
  const {id} = request.params
  response.send(commentsByPostId[id] || [])
})

app.post("/posts/:id/comments", async (request,response) =>{
  const {id : postId} = request.params;
  const id = randomBytes(4).toString('hex')
  const {content} = request.body;  
  commentsByPostId[postId] = !commentsByPostId[postId] ? [{id,content, status: 'pending'}] : [...commentsByPostId[postId], {id,content, status: 'pending'}];
  const event = {
    type: "CommentCreated" ,
    data: {
      id,
      content,
      postId,
      status: 'pending'
    }
  }
  await axios.post("http://event-bus-srv:3005/events", event)
  response.status(201).send(commentsByPostId[id])
})

app.post('/events', async (request,response) => {
  const {postId, id, status, content }  = request.body.data;
  const {type} = request.body;
  if(type == "CommentModerated") {
    const comments = commentsByPostId[postId]
    const comment = comments.find(comment => comment.id === id)
    comment.status = status;
    await axios.post('http://event-bus-srv:3005/events', {
      type: 'CommentUpdated',
      data: {
        id,
        postId,
        status,
        content
      }
    })
  }
  response.send({status: 'ok'})
})

app.listen(3001, () => {
  console.log('Listening on 3001')
})