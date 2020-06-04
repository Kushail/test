const express = require('express')
const uuid = require('uuid')
const members = require('../../Members')
const router = express.Router()

// gets all members
router.get('/', (req, res) => res.json(members))

// gets single member with id in url parameter
router.get('/:id', (req, res) => {
  // res.send(req.params.id)
  const found = members.some(member => member.id === parseInt(req.params.id))

  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)))
  } else {
    res.status(400).json({ msg: `No member with the id: ${req.params.id}` })
  }
})

// create member
router.post('/', (req, res) => {
  // send back what has been received
  // res.send(req.body)
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  }
  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: 'Please include a name and email' })
  }
  members.push(newMember)
  res.json(members)
})

module.exports = router
