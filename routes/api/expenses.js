const express = require('express')
const uuid = require('uuid')
const expenses = require('../../Expenses')
const router = express.Router()

// gets all expenses
router.get('/', (req, res) => res.json(expenses))

// gets single expense with id in url parameter
router.get('/:id', (req, res) => {
  // res.send(req.params.id)
  const found = expenses.some(expense => expense.id === parseInt(req.params.id))

  if (found) {
    res.json(expenses.filter(expense => expense.id === parseInt(req.params.id)))
  } else {
    res.status(400).json({ msg: `No expense with the id: ${req.params.id}` })
  }
})

// update expense
router.put('/:id', (req, res) => {
  // res.send(req.params.id)
  const found = expenses.some(expense => expense.id === parseInt(req.params.id))

  if (found) {
    const updExpense = req.body
    expenses.forEach(expense => {
      expense.name = updExpense.name ? updExpense.name : expense.name
      expense.cost = updExpense.cost ? updExpense.cost : expense.cost

      res.json({ msg: 'Membber updated', expense })
    })
    res.json(expenses.filter(expense => expense.id === parseInt(req.params.id)))
  } else {
    res.status(400).json({ msg: `No expense with the id: ${req.params.id}` })
  }
})

// create expense
router.post('/', (req, res) => {
  // send back what has been received
  // res.send(req.body)
  const newExpense = {
    id: uuid.v4(),
    name: req.body.name,
    cost: req.body.cost
  }

  if (!newExpense.name || !newExpense.cost) {
    return res.status(400).json({ msg: 'Please include a name and a cost' })
  }
  expenses.push(newExpense)

  // res.redirect('./')
  res.json(expenses)
})

// delete expense
router.delete('/:id', (req, res) => {
  // res.send(req.params.id)
  const found = expenses.some(expense => expense.id === parseInt(req.params.id))

  if (found) {
    res.json({
      msg: 'Expense updated',
      expenses: expenses.filter(expense => expense.id !== parseInt(req.params.id))
    })
  } else {
    res.status(400).json({ msg: `No expense with the id: ${req.params.id}` })
  }
})

module.exports = router
