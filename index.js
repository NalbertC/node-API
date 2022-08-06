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