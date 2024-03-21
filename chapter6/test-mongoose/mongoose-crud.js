const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Person = require('./person-model')
const {mongo} = require("mongoose")

mongoose.set('strictQuery', false)

const app = express()

app.use(bodyParser.json());
app.listen(3000, async () => {
  console.log('Server started!!')
  const mongodbUrl = 'mongodb://127.0.0.1:27017/?retryWrites=true&loadBalanced=false&connectTimeoutMS=10000'
  mongoose
    .connect(mongodbUrl)
    .then(() => console.log('Connected to MongoDB'))
})

// 모든 person 데이터 출력
app.get('/person', async (req, res) => {
  const person = await Person.find({})
  res.send(person);
})

// 특정 이메일로 person 찾기
app.get('/person/:email', async (req, res) => {
  const person = await Person.findOne({email: req.params.email})
  res.send(person)
})

// person 데이터 추가하기
app.post('/person', async (req, res) => {
  // const person = new Person(req.body)
  // await person.save()
  const result = await Person.create(req.body);
  res.send(result)
})

// person 데이터 수정하기
app.put('/person/:email', async (req, res) => {
  const person = await Person.findOneAndUpdate(
    {email: req.params.email},
    {$set: req.body},
    {new: true}
  )
  res.send(person)
})

// person 데이터 삭제하기
app.delete('/person/:email', async (req, res) => {
  await Person.deleteMany({email: req.params.email})
  res.send({success: true})
})