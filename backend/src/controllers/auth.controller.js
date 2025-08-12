const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

async function register(req, res) {
  const { username, password } = req.body
  if (!username || !password) return res.status(400).json({ error: 'username and password required' })
  const exists = await User.findOne({ username })
  if (exists) return res.status(409).json({ error: 'username taken' })
  const hash = await bcrypt.hash(password, 10)
  const user = await User.create({ username, password: hash })
  return res.status(201).json({ id: user._id, username: user.username })
}

async function login(req, res) {
  const { username, password } = req.body
  if (!username || !password) return res.status(400).json({ error: 'username and password required' })
  const user = await User.findOne({ username })
  if (!user) return res.status(401).json({ error: 'invalid credentials' })
  const ok = await bcrypt.compare(password, user.password)
  if (!ok) return res.status(401).json({ error: 'invalid credentials' })
  const token = jwt.sign({ sub: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' })
  return res.json({ token })
}

module.exports = { register, login }


