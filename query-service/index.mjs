import express from "express"
import cors from "cors"
import axios from "axios"
const app = express();
app.use(cors())
app.use(express.json())

const posts = {}
const handleEvent = ({type, data}) => {
  if(type === "PostCreated") {
    const {id, title} = data;


    posts[id] = {
      id,title, comments: []
    }
  }

  if (type === "CommentCreated") {
    const {id,content,postId, status} = data;

    const post = posts[postId];
    post.comments.push({id, content, status})
  }

  if (type == "CommentUpdated") {
    const { id, content, postId, status } = data;

    const post = posts[postId]
    const comment = post.comments.find(comment => comment.id === id)
    comment.status = status;
    comment.content = content;
  }
}

app.get('/posts' , (request, response) => {
  response.send(posts)
})


app.post('/events', (request, response) => {
  const {type, data } = request.body
  handleEvent({type,data})
  

  response.send({})
})
app.listen(3002, async () => {
  console.log(`Server running at 3002`)


  const response = await axios.get('http://event-bus-srv:3005/events')
  for (let {type, data} of response.data) {
    console.log('Processing event: ', type)
    handleEvent({type, data})
  }

})