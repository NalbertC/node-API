const express = require('express')
const cors = require('cors')

const app = express()

/*====== SERVER ======*/
app.listen(5501, () => console.log('Rodando na porta 5501'))

app.use(cors())

/*======== MIDLLEWARE ========*/
app.use(express.json())

/*====== USER LIST ======*/
let users = [{
  id: 1,
  name: "Nalberth Castro",
  avatar: "https://avatars.githubusercontent.com/u/104151247?v=4",
  city: "Cametá",
  email: "nalberthcastro1510@gmail.com",
  password: "11223344",
  login: "NalbertC"
},
{
  id: 2,
  name: "Vitória Peres",
  avatar: "https://avatars.githubusercontent.com/u/103939241?v=4",
  city: "Cametá",
  email: "vndp@gmail.com",
  password: "11223344",
  login: "vndp"
},
{
  id: 3,
  name: "Klebson Carmo",
  avatar: "https://avatars.githubusercontent.com/u/104224959?v=4",
  city: "Cametá",
  email: "kleb.silva11@gmail.com",
  password: "11223344",
  login: "klebsoncarmo"
},
{
  id: 4,
  name: "Lacyene Melo",
  avatar: "https://avatars.githubusercontent.com/u/89089202?v=4",
  city: "Cametá",
  email: "lacymelo@gmail.com",
  password: "11223344",
  login: "lacymelo"
},
{
  id: 5,
  name: "Leonardo Nunes",
  avatar: "https://avatars.githubusercontent.com/u/12619438?v=4",
  city: "Cametá",
  email: "gnleo@gmail.com",
  password: "11223344",
  login: "gnleo"
}]

/*======= GENERAL GET =======*/
app.route('/api').get((req, res) => res.json({
  users
}))

/*======== GET PARAMS ========*/
app.route('/api/:id').get((req, res) => {
  const userId = req.params.id

  const user = users.find(user => Number(user.id) === Number(userId))

  if (!user) {
    return res.json('User nor found!')
  }

  res.json(user)
})

/*========= ADD USERS =========*/
app.route('/api').post((req, res) => {
  const lastId = users[users.length - 1].id
  users.push({
    id: lastId + 1,
    name: req.body.name,
    avatar: req.body.avatar,
    city: req.body.city,
    email: req.body.email,
    password: req.body.password,
    login: req.body.login
  })
  res.json('Saved user')
})

/*============ UPDATE USER ===========*/
app.route('/api/:id').put((req, res) => {
  const userId = req.params.id

  const user = users.find(user => Number(user.id) === Number(userId))

  if (!user) {
    return res.json('User nor found!')
  }

  const updatedUser = {
    ...user,
    name: req.body.name,
    avatar: req.body.avatar,
    city: req.body.city,
    email: req.body.email,
    password: req.body.password,
    login: req.body.login
  }

  users = users.map(user => {
    if (Number(user.id) === Number(userId)) {
      user = updatedUser
    }
    return user
  })

  res.json("Updated user")
})

/*======= DELETE USER =======*/
app.route('/api/:id').delete((req, res) => {
  const userId = req.params.id

  users = users.filter(user => Number(user.id) !== Number(userId))

  res.json('Deleted User')
})