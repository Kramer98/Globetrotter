const express = require('express')
var cors=require('cors')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const path=require('path')
const app = express()
// const dbName='globetrotter'
// const url='mongodb+srv://globetrotter_admin:ashish1234@globetrotter-intjw.mongodb.net/globetrotter?retryWrites=true&w=majority'
const url='mongodb://127.0.0.1:27017/'
app.use(bodyParser.json({limit:'50mb'}))
app.use(cors())
mongoose.connect(url, { useNewUrlParser: true,useUnifiedTopology:true }) .then(result => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connecting to MongoDB:', error.message)
})

const newUserSchema= new mongoose.Schema({
  firstName:String,
  lastName:String,
  phNo:Number,
  dob:String,
  uName:String,
  pass:String,
  email:String,
  followers:[String]
})
const userModel=new mongoose.model('User',newUserSchema)

const newPostSchema=new mongoose.Schema({
  uName:String,
  location:String,
  tags:[String],
  likes:Number,
  img:String
})
const newPostModel=new mongoose.model('Posts',newPostSchema)

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/users', (req, res) => {
  console.log(req.params)
  userModel.find({},(err,documents)=>{
    if(err)
      res.json(err)
    else
    res.json(documents)
  })
})

app.get('/posts',(req,res)=>{
  newPostModel.find({},(err,result)=>{
    if(err) res.json(err)
    else
    res.json(result)
  })
})

app.post('/signup', (req, res) => {
  console.log(req.body)
  userModel.findOne({uName:req.body.uName},(err,person)=>{
    console.log(person)
    console.log(err)
    if(person==null){
      console.log('adding new user')
      const newUser=new userModel({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        phNo:req.body.phNo,
        dob:req.body.dob,
        uName:req.body.uName,
        pass:req.body.pass,
        email:req.body.email,
      })
      newUser.save().then(result=>{
        res.json({mssg:'user added!'})
        mongoose.connection.close()
      })
    }
    else
      res.json({mssg:"User already exists"})
  }) .catch(error => {
    console.log(error);
    response.status(404).end()
  })
})

app.post('/addpost',(req,res)=>{
  const newPost=new newPostModel({
    img:req.body.img,
    tags:req.body.tags,
    location:req.body.location,
  })
  newPost.save().then(result=>{
    console.log('post added!')
    mongoose.connection.close()
    res.json({mssg:'added'})
  })
})

app.post('/checkuser',(req,res)=>{
  console.log(req.body)
  userModel.findOne({uName:req.body.uname},(err,person)=>{
    console.log(person)
    if(person!=null)
      res.json({mssg:'user exists'})
    else
      res.json({mssg:'user doesn\'t exists'})
  }).then() .catch(error => {
    console.log(error);
    response.status(404).end()
  })
})

// app.post('/users/')/
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})