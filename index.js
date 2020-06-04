const express = require('express')
const mainRouter = require('./mainRoutes')
const logger = require('./middleware/logger')

const app = express()
const port = process.env.PORT || 3000

// init middleware
app.use(logger)
// Body Parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/members', require('./routes/api/members'))
app.use(mainRouter)
app.listen(port)
console.log('Express server running on port', port)
