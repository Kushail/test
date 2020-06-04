const express = require('express')
const mainRouter = require('./mainRoutes')
const logger = require('./middleware/logger')
const exphbs = require('express-handlebars')
const expenses = require('./Expenses')

const app = express()
const port = process.env.PORT || 3000

// init middleware
app.use(logger)
// Body Parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// Handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Homepage route
app.get('/', (req, res) => res.render('index', {
  title: 'Expenses app from index.js',
  expenses
}))

app.use('/api/expenses', require('./routes/api/expenses'))
app.use(mainRouter)
app.listen(port)
console.log('Express server running on port', port)
